# APS Pool Chemistry Calculator – Investigation Report

## Scope & Method
- Read `AGENTS.md` and `README.md` fully.
- Surveyed core files: `server.js`, `calculator.js`, `script.js`, `index.html`, `volume_calculator.html`, `volume_script.js`, `ai_search.html`, `styles.css`.
- Traced user flows between the browser UI and the Node/Express backend.

## Purpose (High-Level)
This project is a web-based pool chemistry calculator for APS residential pools. It provides:
- Chemical dosing guidance and LSI status for water balance.
- A pool volume calculator for various pool shapes.
- A separate AI search page (CrystalClear) that launches a Google Gen App Builder widget.

## Technical Architecture & Execution Flows
### 1) Main Chemistry Calculator Flow
1. `index.html` renders the UI and loads `script.js`.
2. `script.js` validates user input and POSTs JSON to `/api/calculate`.
3. `server.js` serves static assets and routes `/api/calculate` to `calculator.js`.
4. `calculator.js` computes dosing/LSI, returns a pre-rendered HTML fragment.
5. `script.js` injects the HTML into the `#results` container.

### 2) Volume Calculator Flow
1. `volume_calculator.html` renders shape selection and dimension inputs.
2. `volume_script.js` dynamically generates inputs, renders SVG diagrams, and computes volume.
3. Computed volume is stored in `localStorage`.
4. `script.js` reads that value to pre-fill the capacity on the main calculator page.

### 3) AI Search Page
- `ai_search.html` is a static page that loads a Google Gen App Builder widget configured by `configId`.

### 4) Logging
- `calculator.js` logs request payloads to `user_activity.log` via `fs.appendFile`.

## Findings (Fresh-Eyes Bug/Issue Review)
### A) Markup/SVG Issues
1. **JSX-style comments inside HTML/SVG** are present in `volume_calculator.html` and multiple SVG template strings in `volume_script.js`. These are **not valid HTML/SVG comments** and will render literal text nodes or break SVG parsing.
2. **Stray closing `</em>` tag** in salt-chlorine advice HTML for salt pools.

### B) Validation & Range Mismatches
1. **Capacity range mismatch**: UI allows 100–50,000, backend enforces 500–50,000.
2. **Temperature range mismatch**: validation uses 50–104, text says 32–104, HTML input allows 32–120.
3. **Alkalinity range mismatch**: frontend and backend permit 0, but copy says minimum 10.
4. **Optional fields enforced as required**: UI labels TDS as optional but required-check logic treats it as mandatory.

### C) Backend Robustness
1. **State not validated**: If `state` is missing/unknown, `GOLDEN_NUMBERS[state]` is undefined and later property access will throw.
2. **Language not validated**: If `lang` is missing/unknown, `translations[lang]` is undefined and error rendering will throw.
3. **`cyanuric`/`tds` parsing** uses `parseFloat(...) || 0`, allowing malformed input to silently become `0` (bypassing requiredness).

### D) Security / Data Exposure
1. **`express.static(__dirname)` serves the entire repo**, which can expose `user_activity.log` (containing user inputs) and other non-public assets.

### E) Content/Translation Issues
1. **Spanish translation includes Italian text** for `saltChlorineBelowTarget`.
2. **Version mismatch** between README history (v1.14.1) and UI (v1.15.7).

## Correction Plan (Systematic)
1. **Fix invalid comments**
   - Replace JSX-style `{"/* ... */"}` with proper HTML comments `<!-- ... -->` or remove entirely.
   - Apply to `volume_calculator.html` and all SVG template strings in `volume_script.js`.

2. **Normalize validation rules across UI + backend**
   - Define a single source for min/max limits (e.g., constants shared across `script.js` and `calculator.js`).
   - Align the input attributes, frontend validation, backend validation, and localized error strings.

3. **Backend guards for state/lang**
   - Validate `state` and `lang` with explicit allowlists.
   - Provide safe defaults (`state` fallback + `lang` fallback) and return localized errors instead of throwing.

4. **Fix HTML and translations**
   - Remove stray `</em>` in salt advice HTML.
   - Correct Spanish translation string and scan for similar copy/paste errors.

5. **Reduce data exposure**
   - Serve only a dedicated `public/` directory (or explicit allowlist) via `express.static`.
   - Write `user_activity.log` outside the static root or rename to a non-public path and add to `.gitignore`.

6. **Documentation sync**
   - Update README version history or UI version string so they match.

## Next Step Needed
Confirm which ranges and validation rules are intended (especially for capacity, alkalinity, and temperature), then I can implement the fixes.
