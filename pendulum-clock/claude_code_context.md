# Project Context: The Monolith — Mechanical Pendulum Clock

Paste this at the start of any Claude Code session to restore full project context.

---

## What This Project Is

I built a fully functional, weight-driven mechanical pendulum wall clock called "The Monolith." It is designed as an original work — original frame, aesthetic, weight shell, dial, pendulum bob, and spatial layout. The underlying gear train (SP5B by Steve Peterson, stevesclocks.com/MyMiniFactory) is used as a proven subsystem and printed unchanged from Steve's STLs.

The clock uses a Graham deadbeat escapement, 623RS ball bearings, 3 mm stainless steel arbor rod, 1.5 mm music wire for the pallet arbor, and 65 lb braided PowerPro fishing line as the drive cord. It is 3D-printed on a Bambu P1S in matte white PLA (gears) and matte black PLA (frame). CAD was done in SolidWorks.

---

## Gear Train (SP5B) — Locked Parameters

- **Module:** 1.86765 mm (13.6 DP), consistent across all gears
- **Tooth profiles:** Cycloidal (not involute) — operating center distance must be verified from printed parts, not derived from theory
- **Constant tooth sum:** All SP5B runtime configurations use tooth sum of 66 (wheel + pinion), producing a constant center distance of 61.63 mm — deliberate interchangeability feature
- **Gear configurations:** Wheels 30T–54T; pinions 12T and 18T
- **Power flow (cannot be altered):** Winding drum → G8 → G7 → G4 → G3 → G2 → Escapement wheel → Pallet
- **Bearings:** 623RS (3×10×4 mm) at all arbor positions; smoothest bearings at escapement arbor and pendulum pivot
- **Arbor rod:** 3 mm stainless steel (most arbors), 1.5 mm music wire (pallet arbor only)
- **Drive cord:** 65 lb PowerPro braided fishing line, ~4–5 m total length
- **Pulley system:** Movable pulley in weight shell (block-and-tackle) — doubles runtime, halves drum torque, doubles cord paid out per drum revolution

---

## Frame Design

- **Architecture:** Two-plate construction (front + back) connected by pillars
- **Front plate:** Partial ring around escapement provides front-end arbor support, solving cantilever deflection problem while maintaining skeletal aesthetic
- **Frame split:** Frame exceeds 256 mm print bed limit → split into two pieces with angled interlocking joint + screws (pure press-fit rejected due to PLA creep under sustained load)
- **Print bed:** Bambu P1S, 256 mm max; smooth PEI plate
- **Shared layout sketch:** Both frame plates driven by one master sketch in SolidWorks — bearing hole positions update simultaneously across both plates
- **Bearing bosses:** 623RS pockets designed as interference fits; tightest tolerances at escapement arbor

---

## Friction Clutch (Hand-Setting Mechanism)

- Minute hand arbor uses pen-spring friction clutch
- Driven gear (G4a) sits loose on arbor; pinion (G4b) locked to arbor via set screw
- Spring clamped between them provides enough friction to transmit running torque, slips under hand-applied time-setting force
- Minute hand hub: D-profile bore matched to filed flat on 3 mm rod — no keyway broach required

---

## Print Settings (Established)

For SP5B gears on Bambu P1S, smooth PEI:
- Bed: 55°C
- Brim: 5 mm outer
- Layer height: 0.15 mm standard / 0.12 mm for escapement wheel (surface finish critical)
- Perimeters: 4 walls, Classic perimeter generator (not Arachne)
- Infill: 25% Cubic
- Elephant foot compensation: 0.25 mm
- Seam: Random

Note: A 0.2 mm hardened nozzle was temporarily installed during the build (after a blob-of-death event and nozzle replacement). This required 0.12 mm layer height and flow/pressure advance recalibration. Normal 0.4 mm nozzle has since been reinstalled.

---

## Assembly Notes

- Bearings flushed with IPA overnight to remove factory grease; spin-tested and sorted by smoothness
- Arbor shafts cut with bi-metal hacksaw (3 mm rod) or abrasive cut-off disc (1.5 mm music wire)
- Minute hand D-flat filed using needle file set; depth verified with calipers
- Assembly sequence: bearings → gears + spacers → drive cord → pallet + pendulum (last)
- Lubrication: trace grease on pallet faces and pinion leaves only — no grease on large gear wheel teeth

---

## Commissioning History

**Failure Mode 1 (Pendulum dying):** Drive cord rubbing frame members → friction reduced drum torque below escapement threshold → fixed by adjusting cord path

**Failure Mode 2 (Gear train lockup):** Pallet arm engagement too shallow → repeatable stall on same tooth (geometric, not torque problem) → fixed by rotating pallet body to increase arm depth; escapement wheel reprinted at 0.12 mm for better surface finish

**Weight calibration:** Target minimum drum force ~3.2 lbs → minimum 6.4 lbs total weight required (movable pulley halves effective force). Operating weight set at 1.5× minimum threshold. Clock now runs reliably with stable pendulum amplitude.

---

## Key Engineering Principles Applied in This Project

1. **Root cause analysis over symptom chasing** — every compounded failure traced to an unresolved root cause
2. **Energy budget thinking** — clock performance is a function of energy in vs. energy lost at each stage; cord friction, bearing friction, pallet face drag all deduct from the same budget
3. **Systematic fault isolation** — remove one variable at a time; pallet removal to isolate gear train is the canonical diagnostic first step
4. **Proven subsystem integration** — Steve's STLs are treated as catalog hardware; creative energy directed at original design work
5. **Cycloidal geometry constraint** — operating center distance must be measured, not calculated; this is non-negotiable for this gear profile type

---

## Files & Tools

- **CAD:** SolidWorks (frame design, assembly layout, Design Tables, Toolbox spur gear proxies for layout visualization)
- **Slicing:** Bambu Studio
- **Reference docs:** Steve Peterson SP1–SP16 assembly notes (project knowledge)
- **Hardware:** 623RS bearings (Amazon), 3 mm stainless rod, 1.5 mm music wire, PowerPro 65 lb fishing line
- **Gear STLs:** Steve Peterson SP5B (MyMiniFactory / stevesclocks.com) — printed unchanged

---

*Clock is complete and running as of April 2026.*
