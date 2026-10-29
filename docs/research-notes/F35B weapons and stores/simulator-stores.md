# F-35B external stores (fuel tanks) — simulator map for weapons extension

This note documents how **0SFS** models **F-35B (`f-35b`) detachable external fuel tanks** today: JSBSim properties, TypeScript boundaries, visuals, persistence, settings, and tests. It is intended as an implementation spec pattern for **weapons**, not weapon behavior itself.

---

## 1. Coordinate frames and station geometry

### JSBSim structural frame (authoritative for physics)

In the F-35B XML and `@0sfs/fuel` definitions, tank/store locations use **structural inches**: **+X aft**, **+Y right**, **+Z up**, relative to the aircraft structural origin.

Documented in `fuel/src/externalTankDefinitions.ts` (`ExternalTankDefinition.locationIn`) and mirrored in:

- `F-35B/public/jsbsim-data/aircraft/F-35B-jsbsim/F-35B-jsbsim.xml` (`mass_balance` CG, `pointmass`, `propulsion/tank`, `external_reactions` force locations)
- Duplicate runtime copy under `fly/public/jsbsim-data/...` (same content)

**CG reference** (matches XML `<location name="CG">`):

| Axis | Inches |
|------|--------|
| x | 368.52 |
| y | 0 |
| z | -15.36 |

Exported as `F35B_STRUCTURAL_REFERENCE_IN` in `fuel/src/externalTankDefinitions.ts`.

**External tank stations** (tank + pylon treated as one assembly):

| Side | JSBSim fuel `tank` index | `propulsion/tank[n]/external-store-index` | `stores/external-tank[k]/attached` | `inertia/pointmass-weight-lbs[i]` | Structural location (in) x, y, z |
|------|--------------------------|-------------------------------------------|-------------------------------------|-----------------------------------|----------------------------------|
| Right | 2 | 0 | `[0]` | `[0]` | 368.52, 127.952756, -15.36 |
| Left | 3 | 1 | `[1]` | `[1]` | 368.52, -127.952756, -15.36 |

Initial XML wiring (`F-35B-jsbsim.xml` `<flight_control>`):

- `stores/external-tank[0]/attached` = 1, `propulsion/tank[2]/external-store-index` = 0
- `stores/external-tank[1]/attached` = 1, `propulsion/tank[3]/external-store-index` = 1

Each external tank: **capacity 2991 lb**, **contents 0** at IC, **priority 1**. Each pointmass: **300 lb** dry (tank + pylon, provisional).

### Visual body frame (Babylon, on `aircraft.modelRoot`)

`fuel/src/createExternalTankVisuals.ts` parents installed meshes under `modelRoot` and documents the frame:

> **+X left, +Y up, +Z forward**

Conversion from structural inches to metres on the installation `TransformNode` (`createExternalTankVisuals`, lines 79–82):

```text
body.x = -locationIn.y * 0.0254
body.y = (locationIn.z - cg.z) * 0.0254
body.z = (cg.x - locationIn.x) * 0.0254
```

where `cg` is `F35B_STRUCTURAL_REFERENCE_IN`.

**Regression check:** `fly/src/flight/aircraft/createExternalTankVisuals.test.ts` expects attached world X ≈ **±3.25 m** for right/left stations after readiness.

### Fuel UI layout frame

`fuel/src/fuelTankLayouts.ts` and `FuelPanel.tsx` draw the top view using the same structural inches (**x** along fuselage, **y** across), with SVG mapping `polygon points="${y},${x}"`.

`fly/src/flight/aircraft/fuelTankLayouts.test.ts` asserts XML tank coordinates match layout shapes and `getExternalTankDefinitions()` labels.

### 3D asset

- GLB: `public/aircraft/f-35b/ExternalTank_FlightGear.glb` (loaded via `ASSET = "aircraft/f-35b/ExternalTank_FlightGear.glb"`)
- Build/notice: `F-35B/scripts/build-external-tank-model.mjs`, `fuelTankLayouts` equipment credit → `aircraft/f-35b/ExternalTank_FlightGear.NOTICE.md`
- F-35B airframe catalog entry does **not** include the tank mesh; tanks are a **separate** visual layer from `createExternalTankVisuals`.

---

## 2. Property names and path: UI → JSBSim → mass, fuel, drag

### Discovery and read path

| Layer | Function / component | Role |
|-------|----------------------|------|
| Tank catalog | `discoverFuelTanks()` in `fuel/src/fuelTanks.ts` | Finds tanks via `queryPropertyCatalog("propulsion/tank")`; links detachable tanks through `propulsion/tank[n]/external-store-index` → `stores/external-tank[k]/attached` |
| Fuel panel state | `readFuelTanks(jsbsim.sdk)` in `createFlightSimApp.ts` → `createPanelSnapshot()` | Populates `FuelPanel` with `attached` on external tanks |
| Store metadata | `getExternalTankDefinitions(aircraftId)` in `fuel/src/externalTankDefinitions.ts` | Only `f-35b`; returns indices 2/3, capacities, dry weight, `attachmentProperty`, `locationIn` |
| Attached flag | `readExternalFuelTanks()` in `fuel/src/externalFuelTanks.ts` | `attached: sdk.getPropertyValue(tank.attachmentProperty) > 0.5` |

### UI actions (Fuel tab)

**Tab:** `fuel` — `FlightControlPanel.tsx` renders `FuelPanel` with `onAttachmentChange={props.onFuelAttachmentChange}`.

**Buttons:** `FuelPanel.tsx` — per external tank:

- Label: `Jettison` / `Respawn empty`
- `aria-label`: `` `${attached ? "Jettison" : "Respawn"} ${shape.label.toLowerCase()} tank` ``  
  (e.g. `"Jettison left external tank"`)

**Host handler:** `createFlightSimApp.ts` `onFuelAttachmentChange(index, attached)`:

1. `setExternalFuelTankAttached(jsbsim.sdk, aircraftId, index, attached)` (`fuel/src/externalFuelTanks.ts`)
2. If detaching: `externalTankVisuals.jettison(index, worldVelocity)` with scene velocity from `physicsLoop.getLatestState()`:
   - `eastVelocityFps * 0.3048`, `verticalSpeedFps * 0.3048`, `-northVelocityFps * 0.3048` (east/up/south)
3. `externalTankVisuals.sync(readExternalFuelTanks(...))`
4. `saveFlight()` + panel refresh

### `setExternalFuelTankAttached` — host writes to JSBSim

For JSBSim tank index `index` (2 or 3) and matching definition:

| Step | Property | Value |
|------|----------|--------|
| Clear fuel | `propulsion/tank[index]/contents-lbs` | `0` |
| Attach/detach | `stores/external-tank[storeIndex]/attached` | `1` or `0` |
| Feed priority | `propulsion/tank[index]/priority` | `1` or `0` |
| Dry mass | `inertia/pointmass-weight-lbs[storeIndex]` | `dryWeightLbs` (300) or `0` |

`storeIndex` = `definitions.findIndex(t => t.index === index)` (0 = right, 1 = left), **not** the fuel tank index.

Returns `false` if already in requested state or unknown index.

### Native XML channel (parallel logic)

`F-35B-jsbsim.xml` channel **"External fuel tank attachment"** switches when `stores/external-tank[k]/attached < 0.5`:

| Switch output | Effect when detached |
|---------------|----------------------|
| `stores/external-tank[k]/fuel-held` → `propulsion/tank[…]/contents-lbs` | Forces tank contents to **0** |
| `stores/external-tank[k]/feed-priority` → `propulsion/tank[…]/priority` | Priority **0** |
| `stores/external-tank[k]/dry-weight-lbs` → `inertia/pointmass-weight-lbs[i]` | Pointmass **0** |

Host API sets the same end state explicitly; integration tests exercise both host and native rejection of fuel into detached tanks (`fuelTanks.integration.test.ts`).

### Mass and fuel

- **Fuel mass:** normal JSBSim fuel tanks at tank indices 2/3; engine feeds include tanks 0–3 (`F-35B-jsbsim.xml` `<feed>`).
- **Dry mass:** 300 lb per side via pointmass; host zeros `inertia/pointmass-weight-lbs[i]` on jettison.
- **Total weight:** integration test expects ~1800 lb drop when jettisoning right tank with 1500 lb fuel + 300 lb dry.

### Drag

`external_reactions` in XML (provisional **1 ft²** equivalent per attached store):

- `stores/external-tank[0]/drag-lbs` = `aero/qbar-psf * 1 * stores/external-tank[0]/attached`
- `stores/external-tank[1]/drag-lbs` = same pattern
- Force names: `external-tank-0-drag`, `external-tank-1-drag`; locations at store stations; WIND frame, direction **-X** body drag.

**Debug HUD:** `fly/src/flight/jsbsim/fdmProfiles.ts` `F35B_STORE_AND_PUSHBACK_FORCES` registers magnitudes for **Debug → Forces** (`forceExternalForces` on `f-35b` profile).

---

## 3. Released tanks: motion, lifetime, frame loop

### Behavior (`createExternalTankVisuals`)

- **Visual only:** comment states no collision, no aerodynamics.
- On `jettison(index, worldVelocity)`:
  - Requires `ready`, `lifetime > 0`, `maximum > 0`, valid `getWorldFromEcef()`, finite velocity.
  - Captures release pose in **ECEF** (`Float64Array` position, velocity, 3×3 axis basis).
  - Enables `detached` transform; hides installation mesh.
- `update(dtSeconds)`:
  - **No advance when `dt === 0`** (pause): only reprojects to scene (floating-origin rebase).
  - With `dt > 0`: age += dt; **radial Earth-fixed gravity** 9.80665 m/s² on ECEF position; semi-implicit Euler.
  - Lifetime exceeded → hide debris (`enforceBudget()` also caps count by serial).
- Meshes: `isPickable = false`, `metadata.aircraftVisualOnly = true`, `externalTankIndex`.
- **Budget:** `maxDetachedTanks` (default 2), `lifetimeSeconds` (default 15); one reusable slot per station (no mesh leak on respawn).

### Where it runs

| Phase | Location | What |
|-------|----------|------|
| Physics fixed step | `createFlightSimApp.ts` `physicsLoop` callback | `externalTankStepSeconds += stepSeconds` (accumulates per accepted physics step) |
| Per-frame render | Same file, main frame handler (~3112–3114) | `sync(readExternalFuelTanks(...))`, `update(externalTankStepSeconds)`, then zero accumulator |
| Settings | `parameters.watch` on `osfs.externalTanks.*` | `setLifetimeSeconds` / `setMaxDetachedTanks` |

**Creation:** after `createPlaceholderAircraft`, if `getExternalTankDefinitions(aircraftId).length > 0` and not `engineTest`:

- `createExternalTankVisuals(scene, aircraft.modelRoot, definitions, { requestRender, getWorldFromEcef: floatingOrigin.getWorldFromEcef, lifetime, maxDetached })`

**Clear debris (not physics state):**

- `resetDetached()` on **location teleport** (`worldLoading` path), **failed terrain prep**, **`startNewFlight()`** (reload)
- **Not** called on `restoreSimulation` / contact recovery — debris can outlive physics recovery until teleport or reload.

---

## 4. Persistence: recovery, relocation, saved sessions

### Captured in simulation snapshots

`ground-contact/src/safeFlightState.ts` `controlsForModel()`:

- Always includes every `propulsion/tank[n]/contents-lbs` from `fuelTankIndices()`
- Adds every `stores/external-tank[n]/attached` from catalog query `stores/external-tank`

`captureSimulation()` / `restoreSimulation()` used for **contact recovery** and tests.

### Relocation

`fly/src/flight/jsbsim/resetFlightLocation.ts`:

- Before `resetToInitialConditions`, saves `storeAttachments` from snapshot controls
- `restoreStoreAttachments()` reapplied multiple times through IC/runway flow so **runway presets replace flight controls but not store carriage**
- Runway departure also restores **fuel tank contents** from snapshot

### Saved browser session

`fly/src/flight/jsbsim/savedFlight.ts` — `captureSavedFlight()` embeds full `captureSimulation()` controls (including `stores/*` and tank contents).

`onFuelAttachmentChange` calls `saveFlight()` immediately after jettison/respawn.

**Legacy saves:** `fuelTanks.integration.test.ts` — if `stores/*` keys missing, `restoreSavedFlight` defaults both externals **attached**; tank contents clamped to capacity.

### What does *not* persist

- **Debris visuals** (ECEF ballistic nodes): cleared on teleport / new flight, not saved.
- **Respawn** is a **fuel-panel** affordance (attach empty store), not a persisted world entity.

---

## 5. Tests to keep green or extend

| Test file | Relevance |
|-----------|-----------|
| `fly/src/flight/jsbsim/fuelTanks.integration.test.ts` | **Primary** JSBSim contract: discovery, jettison mass/drag/moments, fuel feed, persistence, runway reset, saved flight |
| `fuel/tests/FuelPanel.test.tsx` | Jettison/respawn UI wiring |
| `fly/src/flight/createFlightSimApp.test.ts` | `onFuelAttachmentChange` → `jettison` velocity, `sync`, `update` dt, settings watchers, `resetDetached` before origin on location change |
| `fly/src/flight/aircraft/createExternalTankVisuals.test.ts` | Coordinates, ECEF fall/rebase, budgets, GLB load |
| `fly/src/flight/aircraft/fuelTankLayouts.test.ts` | Structural consistency with XML + `getExternalTankDefinitions` |
| `fly/src/flight/jsbsim/fdmProfiles.test.ts` | External drag force names on F-35B profiles |
| `ground-contact/tests/safeFlightState.test.ts` | Snapshot includes `stores/external-tank` paths when catalog present |
| `fuel/tests/fuelTanks.test.ts` | Generic tank discovery/write (no externals unless mocked catalog) |

F-35B tests that **detach stores** for other reasons (not store feature):

- `f35b.powered-lift.integration.test.ts` — sets `stores/external-tank[0/1]/attached` to 0
- `f35b.integration.test.ts`, `f35bYaw.integration.test.ts` — import `setExternalFuelTankAttached`

---

## 6. Recommended package placement for weapons

### Principle

**Do not extend `@0sfs/fuel` for weapons.** That package is scoped to fuel quantity UI, tank discovery, and external **fuel** tanks (`fuel/package.json` description). Weapons share **visual release** and **attachment** patterns but not fuel feed, `FuelPanel`, or `writeFuelTanks` guards.

### Suggested layout

| Concern | Package | Concrete files |
|---------|---------|----------------|
| JSBSim stations, pointmass, drag, properties | **`F-35B`** (and `fly/public/jsbsim-data` mirror) | `F-35B/public/jsbsim-data/aircraft/F-35B-jsbsim/F-35B-jsbsim.xml` (+ empirical variant if needed) |
| Station table (indices, labels, structural in, property names, dry mass, drag terms) | **New `@0sfs/stores`** (or `armament`) | `stores/src/storeDefinitions.ts` — mirror `externalTankDefinitions.ts` |
| Attach/release API (JSBSim R/W, no fuel side effects) | **`@0sfs/stores`** | `stores/src/storeAttachment.ts` — mirror `externalFuelTanks.ts` without `fuelTankContentsPath` zeroing unless store-specific |
| Detached store visuals + simple projectile | **`@0sfs/stores`** | `stores/src/createDetachedStoreVisuals.ts` — generalize `createExternalTankVisuals.ts`; `stores/src/createBallisticProjectiles.ts` for non-store munitions |
| 3D assets | **`F-35B/public/aircraft/f-35b/`** | e.g. `Weapon_*.glb` + NOTICE, same as `ExternalTank_FlightGear.glb` |
| Orchestration (create, sync, jettison, update, resetDetached, save hooks) | **`fly`** | `fly/src/flight/createFlightSimApp.ts` (same hooks as external tanks); optional `fly/src/flight/stores/` if logic grows |
| Debug force labels | **`fly`** | `fly/src/flight/jsbsim/fdmProfiles.ts` — add `ExternalForceTerms` beside `F35B_STORE_AND_PUSHBACK_FORCES` |
| Snapshot persistence | **`ground-contact`** | `safeFlightState.ts` — extend `controlsForModel()` catalog query pattern (e.g. `stores/weapon` or weapon-specific `attached` paths) |
| Relocation | **`fly`** | `resetFlightLocation.ts` — extend `storeAttachments` regex if property namespace differs |
| Armament UI | **`@0sfs/stores`** | `stores/src/ArmamentPanel.tsx` |
| Panel tab wiring | **`fly`** | `fly/src/flight/hud/FlightControlPanel.tsx` — new tab id (e.g. `armament`) |
| Settings (debris lifetime, limits) | **`fly`** | `fly/src/flight/settings/flightParameters.ts` — new section; or shared `osfs.stores.*` if unified with tanks |
| Aircraft catalog / mesh animation | **`@0sfs/aircraft`** | **No store tables today** — only `f-35b` entry in `fly/src/flight/aircraft/fleet.ts`; keep weapons out of `aircraftAnimation` unless bay doors are animated later |

### Public exports a weapons module would consume

- `@0sfs/aircraft/aircraftIds` — `AircraftId`
- `@0sfs/ground-contact/safeFlightState` — `captureSimulation` / `restoreSimulation` patterns
- `@0sfs/ground-contact/ecefBridge` / `flightState` — release velocity in `createFlightSimApp`
- `foss-earth/runtime` — `whenMeshesReady`
- `@babylonjs/core` — scene graph (same as fuel visuals)

### Public exports to avoid coupling

- Do **not** import `FuelPanel`, `writeFuelTanks`, or `distributeFuel` for weapons.
- Do **not** put weapon definitions only in `fly` — keep aircraft-specific tables in **`stores` + XML**, like fuel's split.

### Optional refactor (not required for v1)

Extract shared ECEF debris math from `createExternalTankVisuals` into `stores/src/ecefDebrisMotion.ts` used by both fuel tanks and weapons; keep **fuel** owning fuel-specific definitions and GLB.

---

## 7. Input and settings patterns for a new Armament control

### Existing flight panel tabs

From `FlightControlPanel.tsx` `TAB_DEFINITIONS`:

`weather`, `aircraft`, `fuel`, `autopilot`, `controls`, `remote`, `sound`, `exhaust`, `engine`, `gforces`, `logging`, `debug`

External tanks use the **Fuel** tab (`id: "fuel"`), not Controls.

### Settings overlay (foss-earth parameters)

External tank **debris** settings live under the **Renderer** overlay tab, not Fuel:

| Key | Label | Tab | Section | Section title |
|-----|-------|-----|---------|----------------|
| `osfs.externalTanks.debrisLifetimeSeconds` | Released tank lifetime | `renderer` | `external-tanks` | **Released fuel tanks** |
| `osfs.externalTanks.maxDetachedTanks` | Released tank limit | `renderer` | `external-tanks` | **Released fuel tanks** |

Defined in `fly/src/flight/settings/flightParameters.ts` (`EXTERNAL_TANKS`, `FLIGHT_SECTION_TITLES`).

### Controls-tab pattern (F-35B-specific aircraft commands)

For **pilot commands** (compare STOVL), use `@0sfs/controls/settings.ts`:

| Key | Label | Tab | Section | Section title |
|-----|-------|-----|---------|----------------|
| `osfs.aircraft.stovlConversion` | STOVL conversion | `controls` | `stovl` | **F-35B STOVL** |
| `osfs.input.keepSliderBrakes` | Keep slider brakes applied | `controls` | `braking` | **F-35B braking** |
| `osfs.aircraft.controlLaw` | Aircraft control law | `controls` | (flight-controls / assists) | **Flight controls** / **Assists** |

STOVL is applied via `applyFlightControls()` → `fcs/stovl-cmd-norm` (`controls/src/applyFlightControls.ts`); profile exposes `stovl.commandProperty` in `fdmProfiles.ts`.

### Gamepad / keyboard bindings

`controls/src/gamepadToolsAdapter.ts` `FLIGHT_GAMEPAD_ACTIONS` — **no** jettison, stores, or weapon actions today (flight axes, flaps, gear, pause, view, camera only).

**Armament release** would naturally add e.g. `flight.storeRelease` / `flight.weaponRelease` as `kind: "command"` here, with defaults in the same file, and handling in `createFlightGamepadAdapter` → `FlightInputManager` or a dedicated stores callback from `createFlightSimApp.ts`.

### Recommended UI split for weapons

| UX | Pattern to follow |
|----|-------------------|
| Loadout / per-station attach & release | **New panel tab** (parallel **Fuel** + `ArmamentPanel`) |
| Debris lifetime / visual budget | **Renderer** tab new section (parallel `external-tanks`) or generalized `osfs.stores.debris*` |
| Hold-to-arm / master arm (if simulated) | **Controls** tab section (parallel **F-35B STOVL**) |
| Bindings | **`gamepadToolsAdapter.ts`** command actions |

---

## 8. Tank behaviors weapons must **not** copy

| Tank behavior | Why weapons differ |
|---------------|-------------------|
| **Fuel feed** — tanks 2/3 in engine `<feed>`, priority, XML `fuel-held` / `feed-priority` switches | Weapons are not fuel sources; no `propulsion/tank` / `writeFuelTanks` integration |
| **Respawn empty** in flight (`FuelPanel` "Respawn" re-attaches via `setExternalFuelTankAttached(..., true)` with zero fuel) | Gameplay/debug fuel tool, not a munition reload model |
| **`discoverFuelTanks` / `external-store-index` linkage** | Weapons should use their own property namespace and discovery; don't piggyback fuel tank indices unless XML models them as fuel tanks |
| **Provisional drag** (`qbar * 1 ft² * attached`) | Documented placeholder in XML; weapons need their own drag/mass model or none |
| **Pointmass + fuel tank co-location** | Acceptable for fuel; weapons may be pointmass-only or separate force/moment without tank capacity |
| **Clearing fuel on jettison** (`setExternalFuelTankAttached` always zeros `contents-lbs`) | Weapons release should drop store mass/property state, not fuel tank semantics |
| **Fuel tab total slider / `distributeFuel`** | Irrelevant to armament |
| **Saved-session default** that missing `stores/*` ⇒ attached empty externals | Weapon-specific legacy rules may differ; don't reuse fuel migration blindly |

### Behaviors weapons **should** copy

- `stores/.../attached` (or equivalent) as the **single physics truth** for carriage
- Host setter + XML channel pattern for mass/interlocks
- `read*` for panel sync + `createFlightSimApp` `sync` each frame
- `jettison` + ECEF ballistic visual with `getWorldFromEcef`, scene velocity from flight state
- `resetDetached` on teleport / new flight
- `fdmProfiles` `forceExternalForces` for debug
- `safeFlightState` + `resetFlightLocation` persistence of attachment flags
- Integration tests mirroring `fuelTanks.integration.test.ts`

---

## Appendix: aircraft catalog entry (`f-35b`)

Registered in `fly/src/flight/aircraft/fleet.ts` (`AIRCRAFT_CATALOG`):

- `id` / `familyId`: `f-35b`
- Exterior: `aircraft/f-35b/F-35B_AF267-airframe.glb`
- FDM: `getFdmProfile("f-35b")` → model `F-35B-jsbsim`, optional empirical engine package
- No external tank fields on `AircraftDefinition` — stores are entirely fuel/JSBSim/fly-layer

---

## Appendix: package export surfaces (integration checklist)

**`@0sfs/fuel`:** `createExternalTankVisuals`, `externalFuelTanks`, `externalTankDefinitions`, `FuelPanel`, `fuelTankLayouts`, `fuelTanks`

**`@0sfs/aircraft`:** catalog, model loading, animation, lights — no stores API

**`@0sfs/f-35b`:** only `./validation/gearGeometry` + assets under `public/`

**`@0sfs/controls`:** flight input, STOVL/braking parameters, `FLIGHT_GAMEPAD_ACTIONS`

**`@0sfs/ground-contact`:** `safeFlightState`, `ecefBridge`, terrain — snapshot lists for stores

**`fly`:** application entry, `fdmProfiles`, `resetFlightLocation`, `savedFlight`, `createFlightSimApp` orchestration
