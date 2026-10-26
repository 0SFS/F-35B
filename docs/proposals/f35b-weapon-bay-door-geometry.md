# F-35B weapon-bay door geometry for AF267

Date: 2026-10-23, serrated ends added 2026-10-24. Status: geometry specification only; no implementation or asset changes.

Replace the two procedural boxes with **four shaped leaves: one inboard and
one outboard per bay**. Extract their exterior shape from the AF267 lower
fuselage, provide matching openings, and use the fitted straight hinge lines
below. All coordinates, outlines, thicknesses, fairings and clearances in this
document are **AF267 visual fits**, not aircraft station or hinge drawings.

The selected fit has 4.100 m longitudinal coverage and approximately 0.54 m
and 0.51 m plan widths. Both leaves reach a relative opening of 97°. The
**inboard** angle is published; applying 97° to the **outboard** leaf is a
simulation convention. The existing 1.5 s JSBSim slew remains a development
stand-in. Powered-lift/fountain-fence motion remains deferred.

This is an **empty-centerline fit checked with gear locked up or down**.
The current gear transit and rectangular gun-pod visuals have conflicts
described below; this specification does not claim clearance for those
combinations.

## Evidence and limits

Use the existing [weapons and stores report](../../../reports/F35B%20weapons%20and%20stores.md)
and [research notes](../../../research_notes/F35B%20weapons%20and%20stores/).
The report's later Code One finding supersedes the older notes saying no
door angle was found.

| Item | Basis |
| --- | --- |
| Two internal bays | [NAVAIR, 18 April 2012](https://www.navair.navy.mil/node/18946) identifies left and right bays. |
| Inboard and outboard door categories | [MOD Form 706D, April 2025, p. 1](https://assets.publishing.service.gov.uk/media/680b6a73faff81833fcae8c6/706D_PWIV__F-35_.pdf) records their cycles separately. |
| One long inboard and one long outboard leaf per bay; shaped cross-sections | Visual reading of [Lockheed Martin's BF-3 underside photograph, taken 1 March 2012](https://www.flickr.com/photos/lockheedmartin/6965210969), supported by [MBDA's F-35B SPEAR photograph](https://www.mbda-systems.com/mbda-spear-first-flight-f-35b). These are topology references, not dimensioned drawings. |
| Serrated forward and aft ends | Traced by eye from three Wikimedia Commons photographs of JASDF F-35B 69-8205 with its bays open. The [serration method record](f35b-weapon-bay-door-serrations.md) gives the photographs, the trace and its limits. No photograph shows the outboard aft end, so it repeats the inboard aft pattern. A visual fit, not a manufacturer dimension. |
| Inboard launch opening 97°; fountain-fence position about 45° | [Code One, Eric Hehs, 15 May 2008, “Weapon Bay Doors”](https://www.codeonemagazine.com/article.html?item_id=28). The latter belongs to the deferred powered-lift model. |
| Outboard 97°; simultaneous leaf motion; hinge lines; panel dimensions, shape, skin adaptation and thickness | Fits/conventions selected here. No published outboard travel or surveyed hinge coordinates were found. |
| Bay/station sides | Preserve the labeled assumption: bay 0 = pilot's right, stations 4/5; bay 1 = pilot's left, stations 7/8. Stations 1–5 are assigned positive JSBSim structural Y. The briefs do not establish the numbered side. |
| Door time | Unpublished in the collected evidence. **1.5 s is not a measured aircraft time.** |

## Coordinate frame and asset fingerprint

All following XYZ values are metres on **`aircraft.modelRoot`**:
`+X left, +Y up, +Z forward`. Positive axis-angle rotation follows the
right-hand rule. “Aft” is the negative-Z end.

Measured asset:
`F-35B/public/aircraft/f-35b/F-35B_AF267-airframe.glb`.
SHA-256:
`76c76d6230fcf3259e2552d793f95f5421a2ab3cc35f39a5ebf01817b38d5814`.

Evaluate every glTF node's full ancestor transform, including
`F35B_Conversion`, before converting a glTF-world point `g`:

```text
body = (-g.x, g.y - 1.267, -g.z)
```

This includes the runtime model yaw π and stance offset −1.267 m from
`fly/src/flight/aircraft/fleet.ts` and `fly/src/flight/jsbsim/fdmProfiles.ts`.
The conversion root already carries uniform scale 0.8330574632, translation
`(0, 2.056310654, -1.551762342)` and its authored quaternion. Do not apply
that scale, yaw, stance offset or the structural CG a second time to the
body-frame panel coordinates below.

Structural store conversion remains the existing
`bodyMetersFromStructural` in `stores/src/stationTable.ts`:

```text
body.x = -structural.y * 0.0254
body.y = (structural.z + 15.36) * 0.0254
body.z = (368.52 - structural.x) * 0.0254
```

The CG `(368.52, 0, -15.36)` inches is the sim's reference. The station
coordinates and asset alignment are mesh fits, not evidence for door hinges.

## Four hinge definitions and poses

Each line runs **A aft → B forward**. Use A as the pivot; normalize `B-A`
for its rotation axis. Closed vertices are specified in body coordinates;
their hinge-local coordinates are simply `Pclosed - A`, with no extra closed
Euler rotation. `u` is the existing clamped bay position, 0…1.

| Bay / leaf | Hinge A | Hinge B | Signed opening at u=1 |
| --- | --- | --- | --- |
| 0 right / inboard | `(-0.350000, 0.033099, -1.600000)` | `(-0.350000, -0.153644, 2.500000)` | `+97°` |
| 0 right / outboard | `(-1.420000, 0.204225, -1.600000)` | `(-1.420000, -0.098552, 2.500000)` | `-97°` |
| 1 left / inboard | `(0.350000, 0.033099, -1.600000)` | `(0.350000, -0.153644, 2.500000)` | `-97°` |
| 1 left / outboard | `(1.420000, 0.204225, -1.600000)` | `(1.420000, -0.098552, 2.500000)` | `+97°` |

Both sides use the same forward axis vectors:

| Leaf | Unit axis | Hinge midpoint | Hinge length |
| --- | --- | --- | --- |
| Inboard | `(0, -0.04549994, 0.99896434)` | `(±0.350, -0.060272, 0.450)` | `4.104251 m` |
| Outboard | `(0, -0.07364771, 0.99728432)` | `(±1.420, 0.052837, 0.450)` | `4.111165 m` |

These slightly sloping axes follow the belly's longitudinal slope. Rotating
about global body Z alone would not reproduce this fit.

For **every** vertex, including thickness and edge caps, the complete pose is:

```text
theta = openingSign * clamp(u, 0, 1) * 97 * pi / 180
v = Pclosed - A
P(u) = A + v*cos(theta) + cross(axis, v)*sin(theta)
         + axis*dot(axis, v)*(1-cos(theta))
```

Equivalently, a hinge TransformNode at A uses quaternion
`(axis.x*sin(theta/2), axis.y*sin(theta/2), axis.z*sin(theta/2), cos(theta/2))`.
The inboard and outboard leaves of a bay read the same existing bay position;
there are still two bay commands, not four independent plant channels.

## Panel sizes and closed surface

Use curved/faceted shells, not `CreateBox`. Dimensions are **plan extents**,
not claimed flat manufacturing blanks:

| Leaf, each side | Longitudinal extent | Maximum plan width | Shell thickness |
| --- | --- | --- | --- |
| Inboard | `Z -1.600…2.500`, 4.100 m | `|X| 0.350…0.894`, 0.544 m | 0.018 m toward body +Y in the closed pose |
| Outboard | `Z -1.600…2.500`, 4.100 m | `|X| 0.906…1.420`, 0.514 m | 0.018 m toward body +Y in the closed pose |

The free-edge split has a **12 mm** gap centered on `|X|=0.900`.
The following outlines list `(abs(X), Z)` around each exterior face. Mirror
X for the right bay and reverse winding as needed. The forward and aft ends
are serrated. The teeth are a visual fit traced from photographs, and the
[serration method record](f35b-weapon-bay-door-serrations.md) explains how.
The outboard aft end is assumed from the inboard aft end. The foremost and
aftmost tips stay on the bay's end lines, Z=2.500 and Z=-1.600. Every line
X=constant crosses each outline once.

```text
inboard:
  (0.350,-1.520), (0.453,-1.580), (0.530,-1.530), (0.633,-1.600),
  (0.714,-1.535), (0.802,-1.590), (0.894,-1.520),
  (0.894, 2.320), (0.840, 2.455), (0.742, 2.415), (0.617, 2.500),
  (0.464, 2.415), (0.350, 2.210)

outboard:
  (0.906,-1.524), (0.993,-1.591), (1.076,-1.539), (1.153,-1.600),
  (1.250,-1.534), (1.322,-1.581), (1.420,-1.524),
  (1.420, 2.200), (1.261, 2.500), (1.163, 2.435), (1.081, 2.495),
  (0.906, 2.360)
```

Define `S(x,z)` as the **lowest exterior `fuselage` intersection** on a
vertical body-Y line. Inside this footprint it is the lower `livery` skin.
Use actual triangle barycentric interpolation, not a fuselage bounding box,
nearest vertex or upper ray hit. Preserve the source triangles/UVs and clip
them at the footprint boundaries; do not reduce each leaf to its outline corners.
Retain source creases and subdivide at the hinge-band boundary.

The hinge must be straight although the original belly edge is curved.
Fit its adjacent panel strip as follows, using its selected A/B endpoints:

```text
h = abs(hinge.x)                         # 0.350 or 1.420
d = abs(abs(x) - h)
w = clamp(1 - d/0.120, 0, 1)
H(z) = A.y + (B.y - A.y) * (z + 1.600)/4.100
Youter(x,z) = (1-w)*S(x,z) + w*H(z)
Yinner(x,z) = Youter(x,z) + 0.018
```

The 120 mm band deliberately reprofiles the skin onto the hinge rail. Outside
that band the exterior is exactly the original lower skin. Maximum measured
reprofiling at the checked mesh vertices is about **110 mm inboard / 78 mm
outboard**. This is an explicit visual adaptation of an unmodeled bay region,
not a claim that an actual hinge floats that distance from its door.
Connect both faces with edge caps and give the hinge a small local relief
pocket of 25 mm radius for the 18 mm shell. Do not center thickness equally
around the exterior, which would move the visible closed belly downward.

Bevel the shell along the serrated ends instead of squaring it. The inner
face is the outline inset **18 mm** in plan along every end edge, and a
bevel rises at 45° from each exterior end edge to it. The hinged and free
edges, along X=constant, keep square caps. A square end would sweep through
the fixed skin left between the teeth: the outboard leaves' 18 mm ends and
inner faces crossed those lips from about 3° to 34°, up to about 40 mm deep.
With the bevel, 1° sampled checks find no crossing at the ends.

Closed exterior outline Y values, left side, for a reconstruction check:

| Leaf | Outline vertex XYZ, in the order above |
| --- | --- |
| Inboard | `(0.350,0.029455,-1.520)`; `(0.453,0.012627,-1.580)`; `(0.530,0.001508,-1.530)`; `(0.633,0.024253,-1.600)`; `(0.714,0.056645,-1.535)`; `(0.802,0.130901,-1.590)`; `(0.894,0.104333,-1.520)`; `(0.894,-0.167193,2.320)`; `(0.840,-0.150325,2.455)`; `(0.742,-0.160013,2.415)`; `(0.617,-0.170735,2.500)`; `(0.464,-0.172844,2.415)`; `(0.350,-0.140435,2.210)` |
| Outboard | `(0.906,0.103120,-1.524)`; `(0.993,0.100736,-1.591)`; `(1.076,0.078899,-1.539)`; `(1.153,0.097427,-1.600)`; `(1.250,0.104597,-1.534)`; `(1.322,0.140550,-1.581)`; `(1.420,0.198613,-1.524)`; `(1.420,-0.076398,2.200)`; `(1.261,-0.170101,2.500)`; `(1.163,-0.191771,2.435)`; `(1.081,-0.198533,2.495)`; `(0.906,-0.170903,2.360)` |

These corner heights alone do not describe the belly curvature. Useful
unmodified lower-skin samples are:

| Body Z | S at X=0.350 | S at X=0.600 | S at X=0.900 | S at X=1.400 |
| --- | --- | --- | --- | --- |
| -1.600 | 0.03310 | 0.02077 | 0.11691 | 0.18760 |
| -1.000 | -0.05536 | -0.07459 | 0.01909 | 0.08871 |
| 0.000 | -0.11796 | -0.13880 | -0.07128 | -0.00045 |
| 1.000 | -0.16612 | -0.19782 | -0.14527 | -0.08046 |
| 2.000 | -0.19946 | -0.21815 | -0.16924 | -0.11673 |
| 2.500 | -0.15364 | -0.16953 | -0.16177 | -0.11129 |

## Seating, openings and adjacent structures

AF267 has **no weapon-bay cavity or separate weapon-door meshes** here. The
relevant exterior is part of one connected `fuselage/livery` component.
Simply placing four new panels below it would leave solid belly visible
behind the open doors.

1. Split the lower exterior at the four footprints. Remove those static
   skin patches and use their clipped/interpolated shape for the new leaves.
   Preserve the rest of the fuselage and the stacked inlet/duct surfaces.
   Select the lower surface geometrically; deleting every triangle with
   matching X/Z would also delete upper fuselage and duct geometry.
2. Stitch fixed skin to the fitted hinge rails. On the fixed side of each
   hinge, blend from H(z) back to S over **80 mm**: inner fixed strip
   `|X|=0.270…0.350`, outer fixed strip `1.420…1.500`. Use linear weighting
   by distance from the hinge. Blend the panel-profile change back to the
   unchanged skin over 80 mm beyond each longitudinal end as well. This
   provides continuous surrounding skin instead of a recessed panel behind
   intact fuselage. Add a **3 mm opening seam** at non-hinged perimeter edges
   by cutting the stationary skin outward; keep the panel coordinates above.
3. The serrated ends leave fixed skin lips between the teeth, and a V notch
   where both leaves' set-back free corners meet at the center seam. Match
   their edges to the neighboring closed surface. Keep the 12 mm center seam open/dark;
   do not insert a thick vertical divider into the moving shells' sweep.
4. Add a visually simple recessed bay lining, labeled as a stand-in. Jambs
   extend **upward into the fuselage**, not downward through the open leaf.
   Relieve the aft jamb by at least **35 mm longitudinally**, because the
   canted hinges carry the open aft teeth as far aft as Z=-1.616. Keep all
   new lining at least 30 mm from existing inlet/gear/lift interior surfaces;
   a roof is bounded by the next upper mesh intersection minus that margin,
   rather than an invented constant cavity depth. No measured rack geometry
   or aircraft bay depth is supplied by this spec.

The doors' sampled maximum Y is 0.215075 m. The identified inlet dark
interior begins at Y=0.286549 m, leaving **71 mm Y separation from that
selected `darkmet2` interior patch** for the moving shells. Check all inlet
lip triangles and the new stitched skin, rails and lining on the final mesh;
the selected-patch bound alone does not certify those surfaces. The shells'
forward extent stays at Z=2.500 m; the lower
lift aperture and its doors start at Z=3.301157 m, leaving **801 mm Z
separation**. Upper lift and auxiliary-inlet doors are much higher.

## Measured meshes and bounds used

These are actual transformed vertex bounds, not transformed local AABB
corners. Values are rounded to six decimals. A connected material patch is
identified explicitly where no separate node exists. Right-side patches
mirror X within export rounding.

| Node / selection and pose | Minimum XYZ | Maximum XYZ |
| --- | --- | --- |
| `fuselage`, full node | `(-5.333999,-0.241070,-4.668902)` | `(5.334000,2.198743,9.360408)` |
| `leftDoor`, authored gear-door pose | `(2.047344,-0.073966,-1.111732)` | `(2.374794,0.615152,1.289600)` |
| `rightDoor`, authored gear-door pose | `(-2.374794,-0.073966,-1.111734)` | `(-2.047344,0.615152,1.289598)` |
| `leftGear`, authored extended leg, own mesh | `(1.625521,-0.152133,-0.938055)` | `(1.949950,0.685792,-0.540194)` |
| `leftWheel`, authored extended | `(1.862737,-1.247432,-1.261935)` | `(2.310411,-0.270695,-0.285199)` |
| `leftWheel`, production gear sweep union | `(1.003431,-1.265778,-1.261935)` | `(2.310411,1.239767,1.271043)` |
| Left inlet interior, connected `fuselage/darkmet2` patch | `(0.535870,0.286549,1.974651)` | `(1.361922,1.209198,2.796044)` |
| Left gear-cavity interior, connected `fuselage/darkmet2` patch | `(1.591936,0.186718,-1.095509)` | `(2.115758,0.742167,1.297593)` |
| Lower lift aperture, connected `fuselage/darkmet2` patch | `(-0.466022,0.027727,3.301157)` | `(0.466021,1.072489,4.268728)` |
| `leftLiftDoor`, authored closed | `(-0.000001,0.027727,3.301157)` | `(0.498160,0.390978,4.755948)` |
| `rightLiftDoor`, authored closed | `(-0.498163,0.027727,3.301157)` | `(-0.000001,0.390978,4.755948)` |
| `leftLiftDoor`, production lift sweep union | `(approximately 0,-0.238059,3.301157)` | `(0.741543,0.396616,4.755948)` |
| `topLiftDoor`, production lift sweep union | `(-0.612371,1.747534,3.372546)` | `(0.612369,3.614783,5.122254)` |
| `fan`, authored | `(-0.534332,1.559429,3.799559)` | `(0.534329,1.722224,4.861696)` |
| `leftNoseDoor`, authored gear door | `(0.293970,-0.099433,4.867877)` | `(0.493003,0.436311,7.428717)` |
| `leftExhaustDoor`, authored auxiliary-inlet door | `(approximately 0,1.811857,1.507745)` | `(0.548513,2.064215,2.770229)` |
| `leftEngineDoor`, authored aft engine door | `(0.000002,0.157911,-3.790482)` | `(0.698957,0.580673,-2.421231)` |

The 0.32745 m spanwise extent and roughly 2.401 m length of `leftDoor` and
`rightDoor` belong to **gear doors**. Do not rename, repurpose or duplicate
them as weapon doors. Gear checks also included both sides' `Gear`,
`Suspension`, `Wheel`, `Piston`, `StrutT`, `StrutB` and door nodes, evaluated
through the production `aircraftAnimation.ts` rig.

## Numeric pose checks

Left shells, including 18 mm thickness, end bevels and serrated ends; right shells
mirror X (`[xmin,xmax]` becomes `[-xmax,-xmin]`). These bounds are checks of
the shape recipe, not alternate box geometry.

| Leaf / pose | Minimum XYZ | Maximum XYZ |
| --- | --- | --- |
| Inboard closed | `(0.350000,-0.241070,-1.600000)` | `(0.894000,0.145470,2.500000)` |
| Inboard 97° | `(0.205273,-0.682232,-1.615423)` | `(0.408193,0.029455,2.488813)` |
| Outboard closed | `(0.906000,-0.227520,-1.600000)` | `(1.420000,0.215075,2.500000)` |
| Outboard 97° | `(1.402183,-0.587632,-1.613740)` | `(1.646978,0.198613,2.494273)` |

At 1° sampling over 0…97°, the combined left shell envelope is approximately
`X=0.205…1.647`, `Y=-0.689…0.215`, `Z=-1.616…2.500`.

Triangle checks used 21 door angles (0, 4.85, …, 97°) and 21 production gear
positions (0, .05, …, 1). With gear **locked up or locked down**, there were
no sampled shell/gear triangle crossings. Minimum shell-to-gear distance was
**0.100742 m gear down**, outboard at 97° versus `leftGear`, and **0.239519 m
gear up**, outboard closed versus `leftDoor`. Right-side geometry is mirrored.
The gear checks were run on the earlier clipped-end shells and not repeated
for the serrated ends. The serrated outlines lie inside the clipped ones
except at the free corners, where they reach up to 24 mm past them, aft of
Z=-1.500, and 1 mm past near Z=2.455. The minima above are mid-leaf.
These checks cover the moving shells, not a final implemented lining or a
mathematical continuous-sweep proof. Verify the fitted rails, seams, end
lips and lining against the final generated mesh before accepting an
implementation; preserve the stated shell coordinates and clearances.

## Existing fit conflicts and required integration limits

**Gear transit:** the current gear rig already intersects the original
unmodified closed belly at sampled fractions .45–.60. For example, at .45
`leftStrutB` crosses near `(1.409125,-0.027277,0.421404)`. The proposed
reprofiled closed outboard patch has conflicts at .40–.60, including an
additional .40 wheel crossing near `(1.419814,0.015148,0.957753)`. At 97°,
conflicts extend through sampled fractions .40–.85. This is not solved by a
different door opening sign.
Allow weapon-door motion only with gear locked at 0 or 1. On a requested
gear transition, command both weapon bays closed and **hold gear motion
until both bay positions and commands are at or below 0.001**. Then release
gear travel and queue bay-open requests until gear position and command
agree at the same locked endpoint (both at or below 0.001, or both at or
above 0.999). These tolerances are development choices, not aircraft data;
do not teleport either mechanism to satisfy them. This avoids additional
open-door conflicts, **but does not establish closed-belly clearance during
gear transit**. Reconcile the gear rig with both the original skin conflict
and this fit's raised rail before claiming clearance through every gear
state. This interlock is a simulation integration requirement, not a claimed
published F-35B operating rule.

**Current internal-store visuals:** their fitted centers are approximately
`Y=-0.400`, `Z=0.400`, with heavy stations at `|X|=0.600` and light stations
at `|X|=1.150`. They are below the measured closed belly. Do not lower the
new doors to enclose those placeholders. The 4.100 m door length covers the
current 3.6576 m AIM-120 longitudinal extent `Z≈-1.429…2.229`; its plan
span also fits, with only about 1 mm at the heavy GBU-32 fin's inboard tip
and 29 mm at the light AIM-120 fin's outboard tip. Those small margins are
another reason not to call the current station fits a surveyed bay layout.
Visual rack/store seating must be fitted inside the new opening before
claiming a contained load; leave physics station coordinates unchanged in
the door-only implementation.

**Current gun-pod box:** its published-size rectangular stand-in reaches
`|X|=0.3429`, `Y≈-1.15646…-0.34366`, `Z=±1.8542`. It intersects the proposed
inboard leaves from about 61° through 97° in 1° sampled triangle checks.
The report's published weapon-door bumper does not supply the real pod's
local clearance shape. This spec therefore establishes the empty-centerline
door geometry; a correctly shaped pod/bumper fit is required before claiming
clearance for the combined visual load. Do not silently shorten the
published inboard travel to conceal the box collision.

## Implementation handoff

Replace the single hinge fields in `BAYS` with the two hinge definitions,
outline extents, skin-band and sign per bay given above. Replace
`DOOR_PANEL_M` and the `CreateBox` door construction in
`stores/src/createStoreVisuals.ts` with the four fitted shells and matching
lower-skin openings. A two-box-only change cannot meet this specification.
Keep the existing bay indexing, native position/command properties and
1.5 s kinematic; both leaves use their bay's existing position. Preserve
the deferred status of powered-lift 45° motion. Preserve the explicit fit
labels when these values move into source data.

Acceptance requires closed skin continuous with its fitted surrounding
rails, no intact fuselage behind an open bay, the four numeric hinge/pose
checks above, no contact with inlet or lift-system geometry, and the stated
gear/pod limitations visible in the implementation handoff. This document
authorizes no code edits, model export, commit, push or publication.
