# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Simr Virk, a Mechatronic Systems Engineering student at SFU. Hosted on GitHub Pages at simrvirk.github.io. Static site — no build process, no dependencies, no compilation required.

## Personal Branding & Strategic Goals

**Target Audience:** Recruiters and hiring managers at top-tier hardware/tech companies (Tesla, Apple, Google, SpaceX, FAANG).

**Core Identity:** - Senior Mechatronic Systems Engineering student at SFU (Graduating Aug 2027).
- Design Validation Engineering Intern at Motorola Solutions (Avigilon) (Incoming Mechanical Design Engineer at Motorola Solutions (Aviglon) as an extension offer for an additioal 8 months).
- Certified SOLIDWORKS Professional (CSWP).
- Retired Chassis Member at SFU Team Phantom (Formula Student).
- Does a lot of personal projects/wants to do more. Wants to take on more projects that solves issues/inconveniences he is seeing in his life.

**Key Technical Pillars to Highlight:**
1. **Robotics:** Specifically the vision-guided 6-DOF robotic chess arm (OpenCV, closed-loop steppers).
2. **Mechanical Design:** Chassis structural design and electrical integration for Team Phantom. 
3. **Professional Experience:** Large-scale validation and design internship at Motorola.
4. **Prototyping:** Advanced 3D printing (Bambu P1S, multi-material/TPU).

**Career Goals**
- Internship in the United States - ideally Tesla in California. 
- Post Graduation, full time offer as a product designer at Google, Apple, or similar.

**Personal Goal**
- To have a website to document everything about myself

**Voice & Tone:** Casual/Personal tone, data-driven, yet still explains the technical details. Focus on the "Why" and "How" of engineering decisions rather than just listing features.

## Development

Since this is a pure static site, development is just editing files and previewing in a browser. To serve locally:

```bash
# Python (usually available)
python -m http.server 8000

# Node.js alternative
npx serve .
```

No linting, testing, or build steps exist.

## Architecture

**Technology:** Vanilla HTML5, CSS3 (custom properties), and JavaScript. No frameworks or bundlers.

**External dependencies (CDN only):**
- Google Fonts: Bebas Neue, Rajdhani, DM Sans, JetBrains Mono
- Font Awesome 6.5.0

**Shared styling:** All pages import `/style.css` from the root. CSS uses variables for the theme (`#09090f` dark background, `#3694ed` blue accent).

**Shared scripting:** Most pages use `/script.js` from the root. Project detail pages and some about sub-pages have inline `<script>` tags for page-specific functionality (lightbox gallery, scroll animations).

## Site Structure

```
index.html          # Main portfolio/home page
style.css           # Global stylesheet
script.js           # Global JavaScript
about/
  about.html        # About page
  anime/ books/ gaming/ golf/ msess/ outdoors/ roblox/ travel/  # Interest sub-pages
motorola/           # Project detail page
chess/
dog-feeder/
pid-ball-launcher/
pendulum-clock/
team-phantom/
v12-engine/
```

Each project directory contains an HTML file plus its media assets (images, videos, GIFs).

## Key Patterns

**Navigation bar:** Replicated in every HTML file (no templating). Changes to the nav must be made in each file independently.

**Project cards** on `index.html` use a filtering system (`data-category` attributes) driven by JS. Categories: `industry`, `robotics`, `mechanical`.

**Animations:** Scroll-triggered via `IntersectionObserver` in `script.js`. Elements use the class `fade-up` to opt in.

**Lightbox galleries:** Implemented inline in each project page. Images in `.gallery-grid` containers get lightbox behavior from the page's inline script.

**Canvas hero background:** `index.html` has a canvas-based engineering grid animation; drawn via `<canvas id="bgCanvas">` and controlled in `script.js`.

**Tag coloring:** Project tech tags use inline `style="--tag-color: #hexcode"` to set per-tag accent colors dynamically via CSS `calc()`/RGB conversion.
