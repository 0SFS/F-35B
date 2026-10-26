# F-35B armament

Date: 2026-10-22. Status: Phase 1, hung stores, is implemented. Phase 2, leaving the rail, is not.
The factual record is [F-35B weapons and stores](../../../reports/F35B%20weapons%20and%20stores.md).
This document decides what the flying F-35B will carry and fire, and which
published disagreements stay visible in the data.

The aircraft is the F-35B already in the simulator. The A and C appear only
where their stores would be wrong on the B. The flight model remains the
experimental JSBSim trial. Armament does not calibrate it.

## Result

A pilot can load a published F-35B store on a published station, see it, and
feel its weight and drag. With the master arm set, the pilot can fire the
centerline gun and release or launch what is actually on the jet. Rounds and
missiles then fly with the integrators `@0sfs/multiplayer` already has, so a
later session draws the same shot the shooter drew.

The first flying load is empty of weapons. The external tanks stay as they
are. Named presets add the Marine Corps and UK loads below. Stores that are
still in test, sized for the A and C, or nuclear stay in the catalog as
rows the panel cannot select.

Damage, hit rewind, seekers, and a laser spot are out of this specification.
The [multiplayer proposal](../../../docs/proposals/multiplayer.md) already
holds hit rewind until stores exist. This spec gives it a burst and a launch
to judge. It does not decide the hit.

## What the airplane can fire

"Selectable" means a service has said the F-35B is cleared for the store, or
operational crews expended it for initial operational capability, or the
Block 3F record shows the store separating from this variant. A test flight
with an inert round is a catalog row.

| Store | Where it hangs on this jet | Status used for the panel | Selectable |
| --- | --- | --- | --- |
| AIM-120 AMRAAM | Internal bays. Four is the air-to-air arrangement. Two share the bays with bombs | Cleared. Block 3F text says AIM-120C. Lockheed's standard load says C/D. The bay suffix is unpublished | Yes |
| GBU-12 | Internal, one per bay, on the heavy station | Expended for USMC IOC, June 2015 | Yes |
| GBU-32 | Internal, one per bay, on the heavy station. The standard B load is two | Expended for USMC IOC. Published launch weight 1,013 lb | Yes |
| AIM-9X | External only | Block 3F separation. Outside the 2015 IOC expenditure | Yes |
| AIM-132 ASRAAM | Station unpublished. Weight fits the wingtip and the outboard wing | Cleared on the UK F-35B, 12 July 2022 | Yes |
| Paveway IV | Internal and external | Cleared on the UK F-35B, 12 July 2022 | Yes |
| GAU-22/A pod | Centerline. B-specific pod, 220 rounds | Described as available. The 2010 pod brief is the capacity source | Yes |
| Meteor | In the bay during 2025 inert trials | In-service estimate early 2030s | No |
| SPEAR 3 | Four inert rounds carried, 20 January 2026. Eight is the later claim | Captive carry. Jettison still ahead | No |
| GBU-53/B StormBreaker | An eight-round internal plan | Limited test. Unclassified record through 30 September 2025 fielded no new F-35 combat capability | No |
| GBU-39 SDB I | An F-35 rack exists. Rounds per B bay are unpublished | In the Block 3F campaign. The loaded rack is 1,397 lb | No |
| AGM-154 JSOW | Platform lists disagree, and the body is a 1,065 lb class store | No demonstrated B clearance | No |
| AARGM-ER | Datasheet: external on A/B/C, internal on A/C | A plan. No B flight report in the record | No |
| AGM-158C LRASM | A plan says four external on B and C | Integration ongoing | No |
| JSM | Kongsberg: internal on the A and C | An A/C bay store | No |
| GBU-31 | Internal standard on the A and C | Above the B bay class | No |
| AIM-260 | Intended for the F-35. Size unpublished | No clearance, no card | No |
| Sidekick | A and C, stations 4 and 8 | Incompatible with the B bay | No |
| B61-12 | F-35A, certified 12 October 2023 | The certification stops at the A | No |
| External fuel tank | Would occupy stations 3 and 9 if one were certified | No certified tank. The sim's tanks stay a fuel feature | Already implemented, unchanged |

The panel's store list is the selectable rows. The refused rows exist in the
catalog so a test can show they stay refused. Adding Meteor or SPEAR 3 later
is a catalog flag, after a source says the store is cleared.

Three presets, plus the empty jet:

| Preset | Stations | Why this set |
| --- | --- | --- |
| Clean | No weapons. Tanks stay attached and empty | Today's flying jet. Handling tests keep their mass |
| USMC strike | 4 and 8: GBU-32. 5 and 7: AIM-120 | Lockheed's standard internal B load, and the two bombs from the IOC expenditure |
| USMC air-to-air | 4, 5, 7, 8: AIM-120 | The published four-missile bay |
| UK | 4 and 8: Paveway IV. 1 and 11: ASRAAM | The 12 July 2022 clearance. The wingtip assignment is a weight fit. The Ministry answer does not name the station |

AIM-9X and the gun pod are checkboxes on top of a preset, because they are
Block 3F additions and were outside the 2015 expenditure. The wingtip is the
checkbox's station. AIM-9X also fits stations 2 and 10 by the 1,500 lb rating,
and the panel allows that. The 2012 flight carried one on a wing pylon and
did not number it.

A gun pod plus an internal load is allowed. They are different stations. A
2012 flight-test photo shows that geometry. The combination is labeled
flight-test geometry. No 2026 load card reprints it, and no source prohibits it.

## Stations

All three variants are briefed as four internal and seven external stations,
numbered 1 through 11. The B's bay is the 1,000 lb class. The A and C bay is
the 2,000 lb class. The B weapons payload on the 2015, 2019, and 2023 product
cards is 15,000 lb. Internal fuel on the 2023 card is 13,100 lb and is a
different number. The station ratings below are the STOVL column as read from
the March 2010 Lockheed brief. The 2012 roadmap extract can be read as
2,500 lb on stations 4 and 8. That reading is stored and does not admit a
2,000 lb store. The bay-class sentence is the one the panel follows.

| Stations | Place | Rating enforced | Slide type | This jet's selectable stores |
| --- | --- | --- | --- | --- |
| 1, 11 | Wingtip | 300 lb | Air-to-air | AIM-9X, ASRAAM |
| 2, 10 | Outboard wing | 1,500 lb | Air-to-air and air-to-surface | AIM-9X, ASRAAM, Paveway IV |
| 3, 9 | Inboard wing, the plumbed pair | 5,000 lb | Air-to-air and air-to-surface | Paveway IV, or the existing tank, one of them |
| 4, 8 | Bay, heavy station | 1,500 lb | Air-to-air and air-to-surface | AIM-120, GBU-12, GBU-32, Paveway IV |
| 5, 7 | Bay, light station | 350 lb | Air-to-air | AIM-120, by the exception below |
| 6 | Centerline | 1,000 lb on the slide | Gun | The loaded pod |

Port and starboard are not in the briefs. The mesh survey assigns which of
1–5 is the pilot's right. Stations 4 and 5 share a bay. Stations 7 and 8 share
the other. Station 6 is the centerline.

One store occupies one station. The panel also refuses a load whose weapon
masses sum past 15,000 lb. Fuel and the tanks' dry mass stay out of that sum.
The two limits are separate: the station ratings add up to more than the card,
and a legal station can still be refused because the card is already full.

Three published weights sit a few pounds over the printed cell. The panel
keeps both numbers and allows the store, because the store is the published
load:

| Store | Published mass | Printed cell | Decision |
| --- | --- | --- | --- |
| AIM-120 | 356 lb on the Navy fact file. NAVAIR prints 358 lb for the D | Stations 5 and 7, 350 lb | Allow on 5 and 7. The card records 356 lb as the mass used, and 358 lb as the D disagreement |
| GBU-32(v)1/B | 1,013 lb | Bay class described as 1,000 lb | Allow on 4 and 8. This is the B's published internal bomb |
| Loaded gun pod | 1,017 lb | Centerline cell 1,000 lb | Allow on 6 |

AIM-120 at 356 lb stays off stations 1 and 11. The wingtip cell is 300 lb, and
no source assigns an external AMRAAM station on the B. AIM-120 is internal on
this jet.

Stations 3 and 9 are the existing external tanks' stations by assignment.
Greg Ulmer named that pair as the plumbed wing stations. The tanks' current
coordinates are a mesh fit for a provisional tank, not a survey of station 3.
Loading a weapon there detaches the tank through the fuel path that already
exists, tank and pylon and fuel together. Loading the tank clears a weapon
on that station first. The weapon pointmass and the tank pointmass are
different properties, so the two features cannot both be heavy at once.

## Store cards

Masses and sizes are the figures the report traces to a fact sheet. A blank
stays blank. The mass column is what the pointmass uses.

| Id | Mass | Length | Diameter or the lateral figure we have | Guidance class on the card |
| --- | --- | --- | --- | --- |
| `aim-120` | 356 lb | 12 ft | 7 in diameter, 19 in span for C/D | Active radar, inertial midcourse |
| `aim-9x` | 186 lb | 9.9 ft | 5 in diameter, 17.6 in span | Imaging infrared |
| `asraam` | 88 kg (194 lb) | 2.9 m | 166 mm diameter. Span unpublished | Heat-seeking infrared |
| `gbu-32` | 1,013 lb | 119.5 in | Span 19.6 in. Body diameter unpublished | GPS-aided inertial |
| `gbu-12` | 500 lb, the class figure | 10 ft 9 in | Caption says "11 to 18 in" and does not split body from fin | Laser-guided bomb. The spot is not modeled |
| `paveway-iv` | 500 lb, the class figure | Unpublished | Unpublished | Dual-mode in the weapon's own description. The 2015 release names inertial and GPS |
| `gau-22-pod` | 1,017 lb, the loaded pod | 146 in | 27 in wide, 32 in high | Gun |

AIM-120A/B, at 348 lb and 21 in span, is a different body. No source names it
as the F-35 bay store, so the mesh and the mass are the C/D card. ASRAAM fins
wait until a span is sourced. The mesh is the published body. Paveway IV and
the GBU-12 can hang and weigh before their meshes exist. A stand-in mesh is
allowed only with a NOTICE that says the diameter is unpublished.

The gun card, beside the pod:

| Field | Value used | Source status |
| --- | --- | --- |
| Caliber | 25 mm, four barrels | Published |
| Rounds | 220 | 2010 pod brief. The count is a property. Empty-pod weight is unpublished, so firing does not change the 1,017 lb |
| Rate, default | 50 rounds per second | The 2010 installation brief, and Air Combat Command's "up to 50 rounds per second" for the A gun. The pod's own service setting is unpublished |
| Rate, alternate setting | 55 rounds per second | The 2024 gun sheet's "up to 3,300 shots per minute." A gun capability, stored as a setting, and left out of the default |
| Muzzle velocity | 1,085 m/s (3,560 ft/s) | 2024 sheet, TP and HEI. The practice round in the test record is PGU-23. API at 1,036 m/s is on the sheet and is a second round id if a later change adds it |
| Dispersion | 5 milliradian diameter, 80 percent circle | The gun sheet. Installed B-pod dispersion is unpublished. The cone is labeled as the gun sheet |
| Recoil | 3,700 lb average | 2024 sheet, applied while rounds are leaving |

Drag area is `qbar * area * occupied`, the same shape as the tanks' provisional
drag, with a per-store area. Where a diameter is published, the area is the
disk, `Cd = 1`, and the NOTICE says so. That gives about 0.267 ft² for
AIM-120, 0.136 ft² for AIM-9X, and 0.233 ft² for ASRAAM. The pod uses its
27 by 32 in face, 6 ft², from the published envelope. GBU-32, GBU-12, and
Paveway IV have no published body diameter. Their area is 1 ft², the same
placeholder the tanks already document, and the name in the XML says placeholder.

## Behavior

### Carriage

Each station is a JSBSim pointmass and a wind-axis drag force, following the
external tanks. The tanks already occupy pointmasses 0 and 1. Weapon
pointmasses are new entries, one per station 1 through 11, at 0 lb when empty.
Locations use the aircraft's structural inches, `+X` aft, `+Y` right, `+Z` up.
The visual parent is `aircraft.modelRoot`, and the inch-to-body conversion is
the one `createExternalTankVisuals` already uses.

The host writes three numbers per station:

| Property | Meaning |
| --- | --- |
| `stores/station[n]/occupied` | 1 when a store is hung |
| `stores/station[n]/store-id` | Catalog id as an integer. 0 is empty |
| `stores/station[n]/mass-lbs` | The card mass, or 0 |
| `stores/station[n]/drag-area-ft2` | The area above, or 0 |

`n` is the briefing number, 1 through 11. An FCS channel copies `mass-lbs`
onto that station's pointmass and builds `stores/station[n]/drag-lbs` as
`aero/qbar-psf * drag-area-ft2 * occupied`. The host writes the same end
state, as the tank setter already does, so a zero-time step cannot leave the
pointmass behind. Debug forces gain one entry per station on the plant
profile. The empirical profile keeps the tank and pushback list, because that
model has no station properties.

Station coordinates are unpublished. Phase 1 starts by fitting them to the
AF267 mesh and writing the inches into the station table, with the same
honesty as the tank fit: clearance from the wing, the gear, the lift-fan
doors, and the nozzle, and left-right symmetry. Those inches are mesh-fit
assumptions. They are not a station drawing. Until a station has a location,
the panel can show it and cannot hang a mesh on it.

Weapons do not enter the fuel feed and do not take a tank priority. Rearm
is an explicit control and needs the master arm safe. In single-player it
works in the air. One pilot setting, "Rearm on the ground only", off by
default, makes weapon load changes and the fuel panel's quantity edits and
"Respawn empty" wait for weight on wheels. A server or multiplayer session
can hold that setting on through fly's `setRearmRule`; there is no session
protocol for it yet. Jettison and the bay doors never wait.

### Doors

Each bay has an inboard door and an outboard door. The UK Paveway IV form
life-counts those two cycles and does not publish the life, the hinge line,
or the seconds. Hinges come from the mesh survey. If the AF267 mesh has no
door to rotate, the door is a new mesh with a NOTICE, and an internal store
stays hidden until that mesh can open.

`stores/bay[n]/door-cmd-norm` is the request. `stores/bay[n]/door-pos-norm`
slews, 0 shut and 1 at the launch angle. Code One describes the inboard doors
opening ninety-seven degrees to launch an AMRAAM. The slew time is
unpublished. Phase 1 slews it with a JSBSim kinematic, 0 to 1 in 1.5 s. That
1.5 s is the development stand-in. It is not a settings key: the actuator
would not read one, and a per-frame write would cost a property on every
physics step. Tests may pin the stand-in. They may not describe it as a
measured door time.

An internal release sets the bay command to open, waits until the position is
at least 0.95, then lets the store go, then requests shut. A door switch on
the armament panel can open and shut without firing. External stations ignore
the doors. Release during conversion stays available. No public source
prohibits it. The life-limit numbers on the Paveway IV form were not in the
form, so the sim does not invent a cycle budget.

Code One also describes those inboard doors at about forty-five degrees in a
vertical landing, as walls for the lift-fan fountain. That motion belongs to
the powered-lift model. It is recorded here and deferred, so this work does
not move a STOVL surface on the way to hanging a bomb.

### Master arm and the trigger

`stores/master-arm` is 0 or 1, default 0, captured with the other store
properties. The Phase 1 switch sits on the armament tab, beside the load it
gates. It is a pilot command, not a renderer preference. The trigger stays
with Phase 2.

The trigger is one command, `flight.weaponRelease`, added to
`FLIGHT_GAMEPAD_ACTIONS`. Held, it fires the gun while the pod is hung, the
arm is set, and rounds remain. A press releases the selected station once.
The selected station is panel state. There is no ripple interval in the
public record, so one press is one store.

### Gun

A firing gun spends `stores/gun/rounds`, starting at 220 when the pod is hung
and at 0 when it is absent. The pointmass stays 1,017 lb until the pod leaves.
Removing the pod removes the remaining rounds with it.

The shot is a `FireBurst`. Single-player and a session both build it with
`roundsFromBurst` and step it with `stepRound`. The burst's velocity is the
aircraft's ground velocity plus 1,085 m/s along the body forward axis, which
is the JSBSim body `+X` already used by the lift fan's "up" being `−Z`.
Boresight alignment of the pod is unpublished. Body axis is the assumption.
Each round's direction is that axis plus a draw whose 80 percent radius is
2.5 milliradians, the gun-sheet cone.

`dragPerSec` defaults to 0. The protocol calls that a vacuum arc, and no
round drag was published. `lifeS` defaults to 3 and stays inside the protocol
cap of 8. Both are settings under Renderer → Released stores, labeled
development.

The protocol and the anti-cheat envelope cap a burst at 40 rounds. The gun
emits a burst every 40 rounds, and a shorter one when the trigger lifts or
the magazine ends. A full magazine is six bursts. The local list keeps eight
bursts, matching the session world, and drops the oldest first.

Recoil is a body force of 3,700 lb at the pod station, direction aft (`−X`),
for as long as rounds are actually leaving. It is an `external_reactions`
force gated by `stores/gun/firing`. Average recoil is what the sheet prints,
so the force is constant over the burst.

The envelope's `maxMuzzleMps` of 1,200 compares the burst vector's magnitude,
and that vector is a ground velocity. The published 1,085 m/s is relative to
the gun. An airborne jet firing forward along the body sums the two and can
pass 1,200. Phase 2 changes `@0sfs/anti-cheat` so the gun check is the
velocity relative to the shooter, still capped at 1,200 m/s. The relative
1,085 m/s stays inside that cap. The protocol's absolute parse limit of
5,000 m/s is left where it is. This spec does not raise 1,200 to make the
sum fit.

### Bombs

GBU-12, GBU-32, and Paveway IV leave as one ballistic body: a `FireBurst`
with `count` 1 and `rateHz` 1. The velocity is the aircraft's ground velocity
plus a body-down ejection. Ejection speed is unpublished. The parameter
`osfs.stores.ejectionMps` defaults to 3 and is labeled development. The bomb
then follows `stepRound` with `dragPerSec` 0 and a `lifeS` setting, default
30, clamped to the protocol cap of 8 until a store drop has its own message.

That clamp is a real gap. A bomb in the air for eight seconds is not a
bomb's flight. Phase 2 still uses `FireBurst` so there is one ballistic
function and one envelope. The follow-on, in this same specification, adds a
`drop` message beside `fire` and `launch`: one store, the same `stepRound`,
and a life cap long enough for a fall from the altitudes this jet already
flies. `drop` is judged like a burst, with the shooter's speed as the speed
bound, because a bomb leaves at aircraft speed. Phase 2 may ship the
eight-second body. The armament tab then says the visible fall is capped.
Phase 2 is not done while that sentence is the only place a pilot would learn
it. The `drop` message is part of the phase, and the eight-second path is
only the interim behind a test that fails once `drop` exists.

Laser guidance and GPS steering are classes on the card. The body does not
steer. A designated point is a later phase, and it is a point the pilot sets,
not a model of the EOTS.

### Missiles

AIM-120, AIM-9X, and ASRAAM leave as a `MissileLaunch`. `stepMissile` already
holds course at `speedMps` when there is no target. That is the whole single-
player missile. `speedMps` and the launch velocity are the aircraft's ground
velocity at the moment of release. No motor thrust is published for the F-35
carriage, and the current Navy sheets mark AIM-120 and AIM-9X speed and range
classified. A development override `osfs.stores.missileSpeedMps`, default 0
meaning "use release speed," may raise the card speed up to the anti-cheat
missile bound of 1,500 m/s and no further. The panel calls that field a
development speed.

`navGain` and `maxTurnRadPerSec` travel on the message because the protocol
requires them. Defaults are 3 and 1, inside the anti-cheat caps of 6 and 2.
They do nothing until a launch carries a `targetId`. The only target this
spec allows is an aircraft pose a multiplayer session already accepted.
There is no new target list, no radar, and no infrared seeker. A launch with
a target uses the proportional navigation `stepMissile` already implements.
Those gains are development numbers on the message, labeled as such in the
catalog, and they are not a model of either seeker.

`lifeS` defaults to 30 and stays inside the protocol cap of 180. `missileId`
is a short token matching the protocol's pilot-id pattern.

Internal missiles wait for the bay doors. External missiles leave on the press.

### What stays visual

Released stores, rounds, and missiles are kinematic drawings. They do not
collide with terrain, aircraft, or each other. They do not damage anything.
They end at `lifeS`, or when a session drops the burst. Pause passes `dt = 0`
and the existing step functions hold still. Relocation and a new flight drop
the local drawings, as jettisoned tanks already do. A saved flight keeps the
hung load and the round count. It does not keep a round that has left.

The drawing budget for fallen stores matches the tanks: a renderer lifetime
and a maximum count, one reusable mesh per station for a jettisoned store,
and the burst cap for rounds. Jettison, as distinct from release, is the tank
behavior: the store leaves with the aircraft's ground velocity, ballistic,
and the station goes empty. Jettison works with the master arm safe or set,
in the air or on the wheels, so a pilot can shed weight without firing. It is
on the armament tab, per station. A store in a shut bay is not drawn, so it
leaves without a falling drawing. The release step is shared with the tanks
through `@0sfs/stores/releasedStore`.

## Where the code goes

`@0sfs/fuel` keeps the tanks. Weapons get `@0sfs/stores`, AGPL-3.0-only, the
same export style as `@0sfs/fuel`.

| Concern | Place |
| --- | --- |
| Catalog, station table, presets, the allow and refuse rules | `@0sfs/stores` `storeCatalog.ts`, `stationTable.ts` |
| Read and write the JSBSim properties, with no fuel calls | `@0sfs/stores` `storeAttachment.ts` |
| Hung meshes and jettison drawings | `@0sfs/stores` `createStoreVisuals.ts` |
| Armament tab | `@0sfs/stores` `ArmamentPanel.tsx` |
| Pointmasses, drag, door slew, recoil | `F-35B/public/jsbsim-data/aircraft/F-35B-jsbsim/F-35B-jsbsim.xml` |
| The same bytes the app and its tests load | `fly/public/jsbsim-data/aircraft/F-35B-jsbsim/` |
| Meshes and NOTICE files | `F-35B/public/aircraft/f-35b/` and the fly public tree |
| Create, sync, fire, rearm, save | `fly/src/flight/createFlightSimApp.ts` |
| Debug force labels | `fly/src/flight/jsbsim/fdmProfiles.ts` |
| Tracer life, ejection, development missile speed (Phase 2) | `fly/src/flight/settings/flightParameters.ts` |
| Tab | `fly/src/flight/hud/FlightControlPanel.tsx`, id `armament` |
| Master arm | Armament tab, written to `stores/master-arm` |
| Trigger | `controls/src/gamepadToolsAdapter.ts` |
| Snapshot and runway reset | `ground-contact/src/safeFlightState.ts`, `fly/src/flight/jsbsim/resetFlightLocation.ts` |
| Round and missile steps | `@0sfs/multiplayer` `ballistics.ts`, `guidance.ts` |
| Relative muzzle check | `@0sfs/anti-cheat` `review.ts`, `bounds.ts` |

The plant file edited for Phase 1 is
`F-35B/public/jsbsim-data/aircraft/F-35B-jsbsim/F-35B-jsbsim.xml`. fly loads
that file through the symlink at
`fly/public/jsbsim-data/aircraft/F-35B-jsbsim/F-35B-jsbsim.xml`, so one edit
updates both paths. The empirical file is not that symlink and stays untouched.

`F-35B-jsbsim-empirical.xml` stays the frozen pre-plant aircraft. The host
shows no armament when `stores/station[1]/occupied` is absent, and the
empirical flights keep today's mass.

`@0sfs/stores` may import the ballistic and guidance functions and the
protocol types. It does not import the session, the transport, or anti-cheat.
`fly` may import `@0sfs/stores`. Opening a flight still opens no peer
connection. The acceptance check is that connection, not the shape of the
bundle. If a static import drags the session into the startup graph, the
implementer switches the two pure modules to a path the bundler can keep and
leaves the session behind `createMultiplayerAvailability`.

Persistence follows the tanks. `safeFlightState` captures `stores/station[*]`
occupied, store-id, and mass, plus `stores/gun/rounds`, `stores/master-arm`,
and the door commands. Drag outputs are derived and stay out of the snapshot.
`resetFlightLocation` keeps those values across a runway preset, as it keeps
tank attachment. A save without store keys loads the clean preset. Old saves
keep their tanks and gain no weapons.

New meshes are original, with a NOTICE and a license file beside them, the
way `ExternalTank_FlightGear` already documents itself. No game asset and no
manufacturer render is a runtime mesh.

## Phases

### Phase 1 — hung stores

The station survey, the catalog, the panel, mass, drag, presets, persistence,
and meshes for the stores whose dimensions are published. Doors open and shut
on the panel switch. Nothing leaves the rail.

Acceptance:

- Clean start matches today's weight, fuel, and tank drag, within the existing
  integration tolerances.
- USMC strike adds `2 * 1013 + 2 * 356` lb, and the moment of an asymmetric
  single GBU-32 appears at that station's surveyed arm.
- The panel refuses GBU-31, JSM, Sidekick, B61, AIM-260, Meteor, SPEAR 3,
  StormBreaker, an AIM-120 on a wingtip, and a weapon on station 3 while that
  tank is attached.
- AIM-120 on stations 5 and 7 is accepted, and the test names the 350 lb cell
  and the 356 lb card.
- A constructed load past 15,000 lb is refused even when every station rating
  would allow its pieces.
- Jettison of one station zeros that pointmass and that drag term and leaves
  the other stations alone.
- Rearm is refused with the master arm set. With "Rearm on the ground only"
  off, the default, it is accepted in the air; with it on, it is refused in
  the air and accepted on the wheels with the arm safe.
- Save, restore, recovery, and a runway change keep the hung load. A pre-armament
  save stays clean.
- The empirical model still flies, and its run shows no station properties and
  no added weight.
- Existing fuel, powered-lift, and yaw tests pass. The ones that detach tanks
  still detach tanks.

### Phase 2 — leaving the jet

Doors gate internal release. The gun, the bomb body, and the missile body
run through the shared steps. Recoil and the round count work. The anti-cheat
muzzle check becomes relative. The `drop` message replaces the eight-second
bomb cap.

Acceptance:

- Master arm safe: the trigger spends no rounds and releases no store.
- Gun at 50 Hz spends 220 rounds in 4.4 s of trigger time and then stops. The
  pod still weighs 1,017 lb. Recoil is 3,700 lb while rounds leave and 0 after.
- A burst's relative muzzle is 1,085 m/s. A forward shot from a flying jet
  still passes the envelope. A relative muzzle above 1,200 m/s fails it.
- Bursts are at most 40 rounds. The ninth stored burst drops the oldest.
- An internal store stays on the station until the door position is at least
  0.95, and the door then shuts.
- An external store leaves on the press, doors shut.
- With no session target, a missile holds the release velocity. Its
  development speed cannot be set above 1,500 m/s.
- A bomb's `drop` lives longer than 8 s and still steps with `stepRound`.
- Pause freezes rounds and missiles. A new flight clears them and reloads the
  hung preset that was saved, including the remaining gun rounds.
- No peer connection opens during a single-player firing test.

### Later, not this specification

The forty-five-degree vertical-landing door schedule, after a powered-lift
check. Steering a bomb toward a pilot-designated point. A seeker. Damage and
hit rewind, which stay with the multiplayer work once these messages exist.
Clearing Meteor, SPEAR 3, or StormBreaker, which is a catalog change when a
source says the store is fielded. Any retune of the tanks' 2,991 lb capacity,
300 lb dry mass, or 1 ft² drag.

## Sources

The report cites the primary documents. The decisions above rest on these:

- Lockheed Martin F-35B product card, 2023, for the 15,000 lb weapons payload
  and the 13,100 lb internal fuel.
- Doug Hayward, Lockheed Martin, March 2010, and Col Mark Werth, 21 March 2012,
  for the eleven stations, the bay class, and the STOVL ratings.
- RADM Mahr, 17 March 2015, for the 1,000 lb B bay and the 2,000 lb A/C bay.
- Lockheed Martin F-35 variant material, for two AIM-120 and two GBU-32 as the
  standard B internal load.
- U.S. Navy AIM-120 fact file and the Air Force JDAM fact sheet, for the masses
  and sizes on the cards.
- NAVAIR AIM-9X, for 186 lb, 9.9 ft, 5 in, 17.6 in.
- MBDA ASRAAM, for 88 kg, 2.9 m, 166 mm.
- UK Parliament UIN 31755, 12 July 2022, for Paveway IV, AMRAAM, and ASRAAM on
  the UK F-35B.
- General Dynamics GAU-22/A sheet, 2024, and the 2010 Hayward and Parker
  briefs, for the gun and the pod envelope.
- DOT&E FY2018 and FY2019, for the B pod being its own pod.
- DOT&E FY2025, for no new F-35 combat capability fielded through 30 September 2025.
- Code One Magazine, for the ninety-seven-degree launch angle.
