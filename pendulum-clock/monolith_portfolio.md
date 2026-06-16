# The Monolith — Weight-Driven Mechanical Pendulum Wall Clock

**Personal Engineering Project | Apr 2026**  
*Design, Analysis, Manufacturing, Assembly & Commissioning*

---

## Project Overview

The Monolith is a fully functional, weight-driven mechanical pendulum wall clock — designed from the ground up as an original work and 3D-printed on a Bambu P1S. The clock runs for multiple days on a single wind, keeps accurate time via a Graham deadbeat escapement, and was designed with a deliberately architectural aesthetic: a tall vertical form factor, exposed white spoked gears, a minimalist dial, and a matte black frame. Every structural element — the frame, weight shell, dial, pendulum bob, and spatial layout — is an original design. The underlying gear train (Steve Peterson's SP5B) is treated as a proven engineering subsystem, in the same way a professional engineer selects a verified drivetrain rather than re-deriving it from first principles.

---

## Problem Statement

Most 3D-printed mechanical clock projects are either direct kit builds (print-and-assemble with zero design input) or naive attempts to redesign a proven gear train that introduce unnecessary failure risk. I set out to do something more meaningful: study the engineering deeply enough to understand every design decision, then apply that understanding to create an original clock that a hiring manager in mechanical design would look at and say *"that person thinks like an engineer."*

---

## Phase 1 — Research & Design Study

Before touching CAD, I spent significant time doing what professional engineers do: studying existing proven designs to understand *why* they work, not just *how* they look.

I read assembly notes for Steve Peterson's full design portfolio (SP1 through SP16) and extracted the following engineering insights, which directly shaped my design decisions:

- **Gear train math independently verified.** SP5B uses a consistent module of 1.86765 mm (13.6 DP) across all gears. Wheels range from 30T–54T; pinions are 12T and 18T. I worked through the gear ratio calculations independently to confirm the clock's 8-day runtime target: the total reduction ratio from the winding drum to the escapement wheel × the escapement wheel tooth count × the pendulum period produces ~86,400 impulses per day with a seconds-beat pendulum.

- **Constant tooth sum principle identified.** All SP5B runtime configurations maintain a constant tooth sum of 66 (wheel + pinion per mesh), which produces an identical 61.63 mm center distance across every configuration. This is a deliberate interchangeability feature — the frame bearing holes never move regardless of which gear count combination is installed.

- **Cycloidal tooth profile understood.** Steve's gears use cycloidal (not involute) tooth profiles. These cannot sustain the same center-distance tolerances as involute gears — operating spacing must be verified from printed parts, not derived theoretically. This drove my decision not to redesign the gear geometry and to use Steve's STLs for printing.

- **Axial thrust failure mode studied.** SP12 documentation traces random stoppages to axial forces generated at the escapement. The fix (cycloidal profiles plus set screws constraining axial movement) illustrates how systematic failure analysis — not trial-and-error — is the correct engineering methodology.

- **Cantilever arbor deflection recognized as critical.** For escapement-stage gears, cantilever arbors are not viable: tip deflection under load alters center-to-center spacing beyond the cycloidal gear tolerance, causing the escapement to lock. This finding directly constrained my frame architecture.

---

## Phase 2 — Concept Design & Aesthetic Direction

With the engineering constraints defined, I developed the visual identity.

**Design language:** Bauhaus/architectural minimalism. Straight rectangular frame members. Geometric cutouts creating shadow and depth. Arched escapement window framing the pallet and escape wheel as a visible focal point. Matte black frame with white spoked gears — the color contrast creates the impression of gears floating in space rather than being housed in a mechanism. Floating wall standoffs give the clock the appearance of hovering off the wall surface.

**Form factor decision:** I rotated the SP5B gear train 90° counter-clockwise from Steve's original horizontal layout. This produces a tall, slender vertical form factor (the "Monolith" proportion) that reads as an architectural object rather than a mechanical device. The pallet sits at the top; the winding drum at the bottom.

**Key layout constraints resolved:**
- The pendulum must swing in a clear plane — gear positions adjusted to avoid collision within the ±6° swing envelope (±5° operating, ±6° design margin)
- Drive weight drop distance sets minimum frame height — cord length calculated using block-and-tackle geometry (movable pulley doubles runtime, halves drum torque, doubles cord paid out per revolution)
- The dial hub must support concentric hour and minute hand shafts without lateral play

---

## Phase 3 — CAD Design (SolidWorks)

All structural design work was completed in SolidWorks.

**Assembly layout strategy:** Built a gear train layout assembly using pitch-circle extrusions as proxy geometry to establish arbor center positions. A shared master layout sketch drives both the front and back frame plates — if a bearing hole position changes, both plates update simultaneously. This is the correct professional approach: changes propagate automatically through the assembly rather than requiring manual synchronization across parts.

**SolidWorks Design Tables:** Used a Design Table to manage multiple gear configurations (varying tooth count and spoke count) within a single gear part file. Feature suppression columns (`$STATE@`) handle spoke geometry that would violate wall thickness minimums at low tooth counts.

**Frame architecture:** Two-plate construction (front and back) connected by pillars. Front plate uses a partial ring around the escapement to provide front-end arbor support without a full face plate — solving the cantilever deflection problem while preserving the open, skeletal aesthetic. Frame was designed to be split into a two-piece print at 255 mm (Bambu P1S print bed limit is 256 mm) with an angled interlocking joint secured by screws to resist gravity-induced shear over time. A pure press-fit was rejected because PLA creeps under sustained load.

**Tolerance stack-up analysis:** Z-axis depth of the gear train was calculated from actual printed gear thicknesses (measured with calipers) rather than nominal values. Spacer lengths set to produce <0.5 mm end shake at each arbor.

**Bearing boss design:** All 623RS bearing pockets (3 mm bore, 10 mm OD, 4 mm width) designed as interference fits. Tightest tolerances applied at the escapement arbor, where bearing quality has the highest impact on energy loss.

**Friction clutch (hand-setting mechanism):** The minute hand shaft uses a pen-spring friction clutch between a driven gear (loose on arbor) and a pinion (locked to arbor). The clutch transmits running torque but slips under hand-applied time-setting force. The minute hand hub uses a D-profile bore matched to a filed flat on the 3 mm arbor — a simple, reliable keying method requiring no keyway broach or machine shop.

---

## Phase 4 — Manufacturing

### 3D Printing (Bambu P1S)

Printing mechanical clock gears at 0.15 mm layer height with a 0.4 mm nozzle requires careful process control. Key parameters established and validated:

- **Bed:** 55°C smooth PEI plate (IPA-cleaned only — soap residue destroys adhesion)
- **Layer height:** 0.15 mm (0.12 mm for escapement wheel — surface finish directly affects pallet-face drag)
- **Perimeters:** 4 walls, Classic perimeter generator (not Arachne — Arachne varied wall count at gear tooth tips produced weaker tooth geometry)
- **Infill:** 25% Cubic
- **Brim:** 5 mm outer brim for large-diameter gears
- **Elephant foot compensation:** 0.25 mm (critical for gear mesh — an oversized first layer on a gear tooth is a bearing preload problem waiting to happen)
- **Seam:** Random (prevents a repeating seam line coinciding with the same tooth position each revolution)

**Problem encountered and resolved:** A partial nozzle clog from an early print failure went unresolved and compounded into a blob-of-death event on a subsequent print — destroying the part and requiring nozzle replacement. Root cause identified as chasing symptoms (re-printing) rather than eliminating the root cause (the partial clog). Engineering lesson applied: nozzle was replaced; a 0.2 mm hardened nozzle was installed as a temporary substitute, requiring recalibration of layer height (0.12 mm), flow rate, pressure advance, and Z offset. Filament was dried in a dehydrator at 120°F for 5 hours to address moisture-related stringing.

### Shaft Preparation

- 3 mm stainless steel rod cut with a bi-metal hacksaw (18–24 TPI), ends deburred and lightly sanded to fit 623RS inner bore
- 1.5 mm music wire used for pallet arbor (hardened spring steel — requires abrasive cut-off disc, not standard hacksaw)
- Minute hand shaft: 3 mm rod with a filed D-flat using a needle file set; flat depth verified with calipers to achieve correct hand-to-shaft interference

### Bearing Preparation

All 623RS bearings flushed of factory grease via overnight IPA soak, dried, and re-evaluated by spin test. Smoothest bearings reserved for escapement arbor and pendulum pivot — highest-leverage positions for friction reduction. Lightweight oil applied to pendulum pivot bearings for long-term wear protection.

---

## Phase 5 — Assembly

Assembly sequenced to avoid inaccessible fasteners:

1. Bearings pressed into frame bearing bosses (light interference — no hammer, finger pressure only)
2. Gears threaded onto arbors with spacers set for minimal end shake
3. Drive cord (65 lb braided PowerPro fishing line) tied to G8 spoke with a figure-8 knot, wrapped in the correct rotational direction, fed through the pulley in the weight shell
4. Fixed end of cord anchored to frame cord-peg at ~6:30 position relative to the drum
5. Pallet and pendulum installed last, after gear train was confirmed to move freely under applied load
6. Gear train lubricated selectively: trace grease on escapement pallet faces and pinion leaves only — not on large gear teeth (attracts abrasive dust)

---

## Phase 6 — Commissioning & Troubleshooting

Getting a mechanical clock from "it moves sometimes" to "it runs reliably" is an exercise in systematic fault isolation. I worked through two distinct failure modes:

**Failure Mode 1 — Pendulum amplitude dying:** Weight applied → movement → pendulum slowly loses amplitude → clock stops. Diagnosis: energy starvation. The drive cord was making contact with adjacent frame members, introducing friction that reduced effective drum torque below the escapement's minimum threshold. Fix: cord path geometry adjusted; frame interference eliminated.

**Failure Mode 2 — Gear train lockup:** Weight applied → zero movement, even at 7+ lbs drive weight. Diagnosis: geometric lockup, not torque deficiency (random stalling = torque issue; repeatable stalling = geometry issue). Systematic isolation procedure:
- Pallet removed → gear train moved freely → escapement geometry confirmed as root cause
- Pallet depth adjusted (rotated pallet body to increase arm engagement depth)
- Escapement wheel reprinted at 0.12 mm layer height to improve impulse face surface finish
- Weight increased incrementally from baseline until minimum self-sustaining threshold identified, then operating weight set at 1.5× that threshold

**Weight calibration:** The movable pulley in the weight shell halves effective drive force at the drum. Target minimum drum force (from Steve's SP5B notes) is ~3.2 lbs — requiring a minimum 6.4 lbs of total weight. Weight shell sized and filled (BB shot) to achieve this target with margin.

**Outcome:** Clock runs reliably, pendulum amplitude stable, gear train progresses cleanly through each escapement cycle.

---

## Engineering Skills Demonstrated

| Domain | Skills Applied |
|---|---|
| Mechanical Design | Gear train analysis, center distance calculation, tolerance stack-up, friction clutch design, cantilever deflection analysis, press/interference fit design |
| CAD | SolidWorks parametric part modeling, assembly layout, Design Tables, feature suppression, in-context frame design |
| Manufacturing | FDM 3D printing process control, print failure diagnosis, filament moisture management, shaft cutting and deburring, bearing preparation |
| Systems Thinking | Root cause analysis (vs. symptom chasing), failure mode identification, systematic fault isolation, energy budget analysis |
| Engineering Judgment | Pragmatic use of proven subsystems, design-for-assembly sequencing, tolerance allocation |

---

## Key Takeaways

This project taught me that mechanical engineering at the system level is fundamentally about managing energy — where it enters, how it is stored, how it is lost, and how to keep losses below the threshold that causes failure. The clock is an unusually pure demonstration of this because the energy margins are razor-thin: an extra 0.1 mm of cord friction can stop a clock that a proper cord path would run for a week.

The most important engineering discipline I developed was the habit of fully resolving root causes before proceeding. Every time I chased a symptom without eliminating its source, I paid the cost in compounded failures downstream. Every time I stopped and asked "why is this happening?" first, I solved the problem in one step instead of five.

---

*Hardware: 623RS bearings (3×10×4 mm), 3 mm stainless steel arbor rod, 1.5 mm music wire, 65 lb PowerPro braided fishing line*  
*Software: SolidWorks, Bambu Studio*  
*Printer: Bambu P1S, smooth PEI plate*  
*Filament: Matte white PLA (gears), Matte black PLA (frame)*  
*Gear train: SP5B by Steve Peterson (stevesclocks.com) — used as proven engineering subsystem*
