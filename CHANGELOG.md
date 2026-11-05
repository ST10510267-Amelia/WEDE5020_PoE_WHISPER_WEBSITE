# Changelog — Whisper Website Development

All notable changes, bug fixes, and feature updates for the Whisper luxury cosmetics web platform are documented in this file.

---

## [Formative 2 / Part 2 Submission] — 2026-10-12

### Added
* **Dedicated Cart View (`cart.html`):** Developed a standalone cart user interface template featuring custom minimalist vector iconography for luxury product display.
* **Inline SVG Tote Icon:** Replaced plain text cart indicators with an inline vector SVG curved tote bag icon featuring a dynamic item badge counter.
* **Menu Product Collections (`menu.html`):** Expanded the interactive menu showcase to include dedicated product lines for the **Shots Line** and **After Hours** offerings.

### Changed & Refactored
* **Part 1 Feedback Corrections:** 
  * Re-architected site layout structure by incorporating semantic `<main>` parent containers and standard `<footer>` elements across all HTML pages.
  * Added descriptive inline code comments throughout HTML and CSS files to improve code maintainability[cite: 9, 11].
* **Codebase Modernization:** Refactored legacy HTML markup to adhere to HTML5 accessibility standards.
* **Global CSS Restructuring (`styles.css`):** Consolidated repetitive styling rules for header, navigation, body, and footer elements into centralized variables and utilities[cite: 9].
* **Editorial Layout Overhaul (`about.html`):** Redesigned the "About Us" page with a wide-format zig-zag media and text layout.

### Fixed
* **Map Embed URL Integrity (`events.html`):** Fixed broken `iframe` src pathing caused by multi-line whitespace returns for the Cloud 9 Umhlanga event map.
* **Hover States (`events.html`):** Resolved button hover and state feedback inconsistencies on event RSVP cards[cite: 10].

## [3.0.0] - 2026-10-22

### Added
* **Dual Form Architecture & Tabbed Interface:** Consolidated general messaging and product enquiries into `contact.html` using an interactive JavaScript tab switcher (`switchForm`).
* **Dynamic Menu Pricing & Stock Estimation:** Configured the product enquiry dropdown with exact menu rates (`R120` for Cocktail Line, `R75` for Shooter Line, `R150` for After Hours Line) to calculate real-time totals and inventory status.
* **Client-Side Form Validation:** Implemented robust JavaScript validation for email formatting, required fields, minimum name character lengths, and inline error handling.
* **Interactive Product Lightbox:** Added full-screen modal image zooming for product cards and media blocks via `js/main.js`.
* **SEO & Crawler Configuration:** Integrated meta title, description, and keyword tags across HTML pages alongside root-level `sitemap.xml` and `robots.txt` files.
* **Documentation & Compliance:** Updated asset citations in `README.md` and `CHANGELOG.md` to acknowledge structural assistance from Google Gemini AI.