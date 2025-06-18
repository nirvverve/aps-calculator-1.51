document.addEventListener('DOMContentLoaded', () => {
    const shapeButtons = document.querySelectorAll('#shape-buttons button');
    const dimensionInputsSection = document.getElementById('dimension-inputs-section');
    const inputsContainer = document.getElementById('inputs-container');
    const avgDepthInput = document.getElementById('avg-depth');
    const calculateVolumeBtn = document.getElementById('calculate-volume-btn');
    const volumeResultsSection = document.getElementById('volume-results-section');
    const volumeResultDiv = document.getElementById('volume-result');

    const shapeDiagramSection = document.getElementById('shape-diagram-section');
    const diagramContainer = document.getElementById('diagram-container');
    const rotateButtonContainer = document.getElementById('rotate-button-container'); 
    const rotateDiagramBtn = document.getElementById('rotate-diagram-btn'); 

    let selectedShape = null;
    let currentLazyLRotation = 0; 

    const GALLONS_PER_CUBIC_FOOT = 7.48;
    const DIAGRAM_TEXT_COLOR_NORMAL = "#0c4a6e"; 
    const DIAGRAM_LINE_COLOR_NORMAL = "#075985"; 
    const DIAGRAM_HIGHLIGHT_COLOR = "#dc2626";   

     // Constants for L-shape dynamic scaling (shared by TrueL and LazyL)
     const DEFAULT_L_SHAPE_INPUTS = { lenA: 30, widA: 15, lenB: 20, widB: 12, diagC: 5 }; // Added diagC default
     const DEFAULT_LAZYL2_INPUTS = { dimA: 18, dimB: 29, dimS: 17, dimT: 18, dimP: 12, dimN: 24 };
     const SVG_L_BASE_X = 20; // Renamed from SVG_BASE_X
     const SVG_L_BASE_Y = 20; // Renamed from SVG_BASE_Y
     const MAX_SVG_L_EXTENT_WIDTH = 180;
     const MAX_SVG_L_EXTENT_HEIGHT = 170;
     const DIM_L_LINE_OFFSET = 10; // Renamed
     const DIM_L_CAP_SIZE = 5;    // Renamed
     const DIM_L_TEXT_APPROX_HALF_WIDTH = 20; // Renamed
     const INNER_L_RECT_PADDING = 8; // Renamed

    const svgDiagrams = {
    rectangle: `
    <svg viewBox="0 0 220 155" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="180" height="100" rx="8" ry="8" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <rect x="28" y="28" width="164" height="84" rx="5" ry="5" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>
    <line id="rect-length-cap1" x1="20" y1="125" x2="20" y2="135" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="rect-length-line1" x1="20" y1="130" x2="85" y2="130" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="rect-length-text" x="110" y="130" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length</text>
    <line id="rect-length-line2" x1="135" y1="130" x2="200" y2="130" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="rect-length-cap2" x1="200" y1="125" x2="200" y2="135" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="rect-width-cap1" x1="5" y1="20" x2="15" y2="20" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="rect-width-line1" x1="10" y1="20" x2="10" y2="50" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="rect-width-text" x="10" y="70" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, 10, 70)">Width</text>
    <line id="rect-width-line2" x1="10" y1="90" x2="10" y2="120" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="rect-width-cap2" x1="5" y1="120" x2="15" y2="120" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`,
    round: `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="65" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <circle cx="80" cy="80" r="57" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>
    <line id="round-diameter-cap1" x1="15" y1="75" x2="15" y2="85" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="round-diameter-line1" x1="15" y1="80" x2="40" y2="80" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="round-diameter-text" x="80" y="80" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Diameter</text>
    <line id="round-diameter-line2" x1="120" y1="80" x2="145" y2="80" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="round-diameter-cap2" x1="145" y1="75" x2="145" y2="85" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`,
    oval: `
    <svg viewBox="0 0 230 180" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="115" cy="85" rx="100" ry="60" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <ellipse cx="115" cy="85" rx="92" ry="52" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>
    <line id="oval-length-cap1" x1="15" y1="150" x2="15" y2="160" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="oval-length-line1" x1="15" y1="155" x2="80" y2="155" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="oval-length-text" x="115" y="155" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length</text>
    <line id="oval-length-line2" x1="150" y1="155" x2="215" y2="155" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="oval-length-cap2" x1="215" y1="150" x2="215" y2="160" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="oval-width-cap1" x1="0" y1="25" x2="10" y2="25" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="oval-width-line1" x1="5" y1="25" x2="5" y2="55" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="oval-width-text" x="5" y="85" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, 5, 85)">Width</text>
    <line id="oval-width-line2" x1="5" y1="115" x2="5" y2="145" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="oval-width-cap2" x1="0" y1="145" x2="10" y2="145" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`,
    trueL: (rotation = 0, dims = {}) => { // Renamed from lazyL to trueL
        // Use provided dims or defaults, ensuring they are numbers
        const L_A = !isNaN(parseFloat(dims.lenA)) && parseFloat(dims.lenA) > 0 ? parseFloat(dims.lenA) : DEFAULT_L_SHAPE_INPUTS.lenA;
        const W_A = !isNaN(parseFloat(dims.widA)) && parseFloat(dims.widA) > 0 ? parseFloat(dims.widA) : DEFAULT_L_SHAPE_INPUTS.widA;
        const L_B = !isNaN(parseFloat(dims.lenB)) && parseFloat(dims.lenB) > 0 ? parseFloat(dims.lenB) : DEFAULT_L_SHAPE_INPUTS.lenB;
        const W_B = !isNaN(parseFloat(dims.widB)) && parseFloat(dims.widB) > 0 ? parseFloat(dims.widB) : DEFAULT_L_SHAPE_INPUTS.widB;

        // Determine overall scale factor
        const totalInputWidthSpan = L_A; 
        const totalInputHeightSpan = W_A + L_B; 

        let scale = 1;
        if (totalInputWidthSpan > 0 && totalInputHeightSpan > 0) {
            const scaleX = MAX_SVG_L_EXTENT_WIDTH / totalInputWidthSpan;
            const scaleY = MAX_SVG_L_EXTENT_HEIGHT / totalInputHeightSpan;
            scale = Math.min(scaleX, scaleY);
        } else { 
            scale = Math.min(MAX_SVG_L_EXTENT_WIDTH / DEFAULT_L_SHAPE_INPUTS.lenA, MAX_SVG_L_EXTENT_HEIGHT / (DEFAULT_L_SHAPE_INPUTS.widA + DEFAULT_L_SHAPE_INPUTS.lenB));
        }
        
        const r1w = L_A * scale; 
        const r1h = W_A * scale; 
        const r2w = W_B * scale; 
        const r2h = L_B * scale; 

        const r1x = SVG_L_BASE_X;
        const r1y = SVG_L_BASE_Y;
        const r2x = SVG_L_BASE_X; // Second rect aligns left with the first
        const r2y = SVG_L_BASE_Y + r1h;

        const inner_r1w = Math.max(0, r1w - 2 * INNER_L_RECT_PADDING);
        const inner_r1h = Math.max(0, r1h - 2 * INNER_L_RECT_PADDING);
        const inner_r2w = Math.max(0, r2w - 2 * INNER_L_RECT_PADDING);
        const inner_r2h = Math.max(0, r2h - 2 * INNER_L_RECT_PADDING);

        const la_line_y = r1y - DIM_L_LINE_OFFSET;
        const la_text_x = r1x + r1w / 2;
        const wa_line_x = r1x + r1w + DIM_L_LINE_OFFSET;
        const wa_text_y = r1y + r1h / 2;
        
        // Length B for TrueL is the height of the second rectangle
        const lb_line_x = r2x - DIM_L_LINE_OFFSET; // To the left of the second rectangle
        const lb_text_y = r2y + r2h / 2;

        // Width B for TrueL is the width of the second rectangle
        const wb_line_y = r2y + r2h + DIM_L_LINE_OFFSET; // Below the second rectangle
        const wb_text_x = r2x + r2w / 2;

        // Rotation center needs to be calculated based on overall shape, approx center of viewBox for now
        const rotationCenterX = (MAX_SVG_L_EXTENT_WIDTH + SVG_L_BASE_X + SVG_L_BASE_X) / 2 -10; // Adjusted for viewBox
        const rotationCenterY = (MAX_SVG_L_EXTENT_HEIGHT + SVG_L_BASE_Y + SVG_L_BASE_Y) / 2 -10; // Adjusted for viewBox

        return `
    <svg viewBox="-10 -10 240 210" xmlns="http://www.w3.org/2000/svg"> 
    <g id="trueL-group" transform="rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})"> 
    {/* Top Rectangle (Section A based on Length A and Width A) */}
    <rect x="${r1x}" y="${r1y}" width="${r1w}" height="${r1h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <rect x="${r1x + INNER_L_RECT_PADDING}" y="${r1y + INNER_L_RECT_PADDING}" width="${inner_r1w}" height="${inner_r1h}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>
    
    {/* Side Rectangle (Section B based on Length B and Width B) */}
    <rect x="${r2x}" y="${r2y}" width="${r2w}" height="${r2h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <rect x="${r2x + INNER_L_RECT_PADDING}" y="${r2y + INNER_L_RECT_PADDING}" width="${inner_r2w}" height="${inner_r2h}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>

    {/* Dimension: Length A (overall width of top arm) */}
    <line id="trueL-lengthA-cap1" x1="${r1x}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${r1x}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthA-line1" x1="${r1x}" y1="${la_line_y}" x2="${Math.max(r1x, la_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-lengthA-text" x="${la_text_x}" y="${la_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length A</text>
    <line id="trueL-lengthA-line2" x1="${la_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${la_line_y}" x2="${r1x + r1w}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthA-cap2" x1="${r1x + r1w}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${r1x + r1w}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Dimension: Width A (height of top arm) */}
    <line id="trueL-widthA-cap1" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${r1y}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${r1y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-widthA-line1" x1="${wa_line_x}" y1="${r1y}" x2="${wa_line_x}" y2="${Math.max(r1y, wa_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-widthA-text" x="${wa_line_x}" y="${wa_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${wa_line_x}, ${wa_text_y})">Width A</text>
    <line id="trueL-widthA-line2" x1="${wa_line_x}" y1="${wa_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${wa_line_x}" y2="${r1y + r1h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-widthA-cap2" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${r1y + r1h}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${r1y + r1h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Dimension: Length B (height of side arm) */}
    <line id="trueL-lengthB-cap1" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${r2y}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${r2y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthB-line1" x1="${lb_line_x}" y1="${r2y}" x2="${lb_line_x}" y2="${Math.max(r2y, lb_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-lengthB-text" x="${lb_line_x}" y="${lb_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${lb_line_x}, ${lb_text_y})">Length B</text>
    <line id="trueL-lengthB-line2" x1="${lb_line_x}" y1="${lb_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${lb_line_x}" y2="${r2y + r2h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthB-cap2" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${r2y + r2h}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${r2y + r2h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Dimension: Width B (width of side arm) */}
    <line id="trueL-widthB-cap1" x1="${r2x}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${r2x}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-widthB-line1" x1="${r2x}" y1="${wb_line_y}" x2="${Math.max(r2x, wb_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-widthB-text" x="${wb_text_x}" y="${wb_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Width B</text>
    <line id="trueL-widthB-line2" x1="${wb_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${wb_line_y}" x2="${r2x + r2w}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-widthB-cap2" x1="${r2x + r2w}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${r2x + r2w}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </g>
    </svg>`;
    },
    lazyL: (rotation = 0, dims = {}) => { // New LazyL with cut corner
        const L_A = !isNaN(parseFloat(dims.lenA)) && parseFloat(dims.lenA) > 0 ? parseFloat(dims.lenA) : DEFAULT_L_SHAPE_INPUTS.lenA;
        const W_A = !isNaN(parseFloat(dims.widA)) && parseFloat(dims.widA) > 0 ? parseFloat(dims.widA) : DEFAULT_L_SHAPE_INPUTS.widA;
        const L_B = !isNaN(parseFloat(dims.lenB)) && parseFloat(dims.lenB) > 0 ? parseFloat(dims.lenB) : DEFAULT_L_SHAPE_INPUTS.lenB;
        const W_B = !isNaN(parseFloat(dims.widB)) && parseFloat(dims.widB) > 0 ? parseFloat(dims.widB) : DEFAULT_L_SHAPE_INPUTS.widB;
        const DIAG_C = !isNaN(parseFloat(dims.diagC)) && parseFloat(dims.diagC) > 0 ? parseFloat(dims.diagC) : DEFAULT_L_SHAPE_INPUTS.diagC;

        const totalInputWidthSpan = L_A;
        const totalInputHeightSpan = W_A + L_B;

        let scale = 1;
        if (totalInputWidthSpan > 0 && totalInputHeightSpan > 0) {
            const scaleX = MAX_SVG_L_EXTENT_WIDTH / totalInputWidthSpan;
            const scaleY = MAX_SVG_L_EXTENT_HEIGHT / totalInputHeightSpan;
            scale = Math.min(scaleX, scaleY);
        } else {
            scale = Math.min(MAX_SVG_L_EXTENT_WIDTH / DEFAULT_L_SHAPE_INPUTS.lenA, MAX_SVG_L_EXTENT_HEIGHT / (DEFAULT_L_SHAPE_INPUTS.widA + DEFAULT_L_SHAPE_INPUTS.lenB));
        }

        const lA_s = L_A * scale;
        const wA_s = W_A * scale;
        const lB_s = L_B * scale; // Height of vertical arm
        const wB_s = W_B * scale; // Width of vertical arm
        const diagC_s = DIAG_C * scale;

        // Calculate the side length of the 45-degree cut, constrained by dimensions
        const s_from_diag_s = diagC_s / Math.sqrt(2);
        const available_on_A_s = Math.max(0, lA_s - wB_s); // Space on horizontal arm's bottom edge, to the right of vertical arm
        const available_on_B_s = lB_s; // Space on vertical arm's left edge, below horizontal arm
        const s_constrained_s = Math.min(s_from_diag_s, available_on_A_s, available_on_B_s);

        const baseX = SVG_L_BASE_X;
        const baseY = SVG_L_BASE_Y;

        // Define path points
        const p = [
            { x: baseX, y: baseY }, // P0: Top-left of horizontal arm
            { x: baseX + lA_s, y: baseY }, // P1: Top-right of horizontal arm
            { x: baseX + lA_s, y: baseY + wA_s }, // P2: Bottom-right of horizontal arm
            { x: baseX + wB_s + s_constrained_s, y: baseY + wA_s }, // P3: Start of cut on horizontal arm
            { x: baseX + wB_s, y: baseY + wA_s + s_constrained_s }, // P4: End of cut on vertical arm
            { x: baseX + wB_s, y: baseY + wA_s + lB_s }, // P5: Bottom-end of vertical arm's right side
            { x: baseX, y: baseY + wA_s + lB_s }, // P6: Bottom-left of vertical arm
            { x: baseX, y: baseY + wA_s }  // P7: Top-left of vertical arm (inner point)
        ];
        
        const pathData = `M ${p[0].x},${p[0].y} L ${p[1].x},${p[1].y} L ${p[2].x},${p[2].y} L ${p[3].x},${p[3].y} L ${p[4].x},${p[4].y} L ${p[5].x},${p[5].y} L ${p[6].x},${p[6].y} L ${p[7].x},${p[7].y} Z`;
        
        // Inner decorative path (simplified offset)
        const innerPadding = INNER_L_RECT_PADDING;
        // This is complex for a path; for now, we'll skip the inner path for LazyL or use a simpler one if time permits.
        // For simplicity, the LazyL will not have an inner decorative path like the TrueL.

        // Dimension lines (similar to TrueL, with addition for DiagC)
        const la_line_y = baseY - DIM_L_LINE_OFFSET;
        const la_text_x = baseX + lA_s / 2;
        const wa_line_x = baseX + lA_s + DIM_L_LINE_OFFSET;
        const wa_text_y = baseY + wA_s / 2;
        const lb_line_x = baseX - DIM_L_LINE_OFFSET; // For L_B (height of vertical part)
        const lb_text_y = baseY + wA_s + lB_s / 2;
        const wb_line_y = baseY + wA_s + lB_s + DIM_L_LINE_OFFSET; // For W_B (width of vertical part)
        const wb_text_x = baseX + wB_s / 2;

        // DiagC dimension line points
        const diagC_p1 = p[3]; // { x: baseX + wB_s + s_constrained_s, y: baseY + wA_s }
        const diagC_p2 = p[4]; // { x: baseX + wB_s, y: baseY + wA_s + s_constrained_s }
        const diagC_text_x = (diagC_p1.x + diagC_p2.x) / 2 + 5; // Offset for readability
        const diagC_text_y = (diagC_p1.y + diagC_p2.y) / 2 - 5; // Offset for readability

        const rotationCenterX = (MAX_SVG_L_EXTENT_WIDTH + SVG_L_BASE_X + SVG_L_BASE_X) / 2 -10;
        const rotationCenterY = (MAX_SVG_L_EXTENT_HEIGHT + SVG_L_BASE_Y + SVG_L_BASE_Y) / 2 -10;

        return `
    <svg viewBox="-10 -10 240 210" xmlns="http://www.w3.org/2000/svg">
    <g id="lazyL-group" transform="rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})">
    <path d="${pathData}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    
    {/* Dimension: Length A */}
    <line id="lazyL-lengthA-cap1" x1="${baseX}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${baseX}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthA-line1" x1="${baseX}" y1="${la_line_y}" x2="${Math.max(baseX, la_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-lengthA-text" x="${la_text_x}" y="${la_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length A</text>
    <line id="lazyL-lengthA-line2" x1="${la_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${la_line_y}" x2="${baseX + lA_s}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthA-cap2" x1="${baseX + lA_s}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${baseX + lA_s}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Dimension: Width A */}
    <line id="lazyL-widthA-cap1" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${baseY}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${baseY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthA-line1" x1="${wa_line_x}" y1="${baseY}" x2="${wa_line_x}" y2="${Math.max(baseY, wa_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-widthA-text" x="${wa_line_x}" y="${wa_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${wa_line_x}, ${wa_text_y})">Width A</text>
    <line id="lazyL-widthA-line2" x1="${wa_line_x}" y1="${wa_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${wa_line_x}" y2="${baseY + wA_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthA-cap2" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${baseY + wA_s}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${baseY + wA_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Dimension: Length B (height of vertical part) */}
    <line id="lazyL-lengthB-cap1" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${baseY + wA_s}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${baseY + wA_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthB-line1" x1="${lb_line_x}" y1="${baseY + wA_s}" x2="${lb_line_x}" y2="${Math.max(baseY + wA_s, lb_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-lengthB-text" x="${lb_line_x}" y="${lb_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${lb_line_x}, ${lb_text_y})">Length B</text>
    <line id="lazyL-lengthB-line2" x1="${lb_line_x}" y1="${lb_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${lb_line_x}" y2="${baseY + wA_s + lB_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthB-cap2" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${baseY + wA_s + lB_s}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${baseY + wA_s + lB_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    
    {/* Dimension: Width B (width of vertical part) */}
    <line id="lazyL-widthB-cap1" x1="${baseX}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${baseX}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthB-line1" x1="${baseX}" y1="${wb_line_y}" x2="${Math.max(baseX, wb_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-widthB-text" x="${wb_text_x}" y="${wb_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Width B</text>
    <line id="lazyL-widthB-line2" x1="${wb_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${wb_line_y}" x2="${baseX + wB_s}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthB-cap2" x1="${baseX + wB_s}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${baseX + wB_s}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Dimension: Diagonal C */}
    <line id="lazyL-diagC-line" x1="${diagC_p1.x}" y1="${diagC_p1.y}" x2="${diagC_p2.x}" y2="${diagC_p2.y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    {/* Caps for DiagC line can be tricky due to 45deg angle. Simple line for now. */}
    <text id="lazyL-diagC-text" x="${diagC_text_x}" y="${diagC_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-45, ${diagC_text_x}, ${diagC_text_y})">Diag. C</text>
    </g>
    </svg>`;
},
lazyL2: (rotation = 0, dims = {}) => { // Lazy L (#2) based on Hydra PDF (A,B,S,T,P,N)
    // Input dimensions or defaults
    const A_in = !isNaN(parseFloat(dims.dimA)) && parseFloat(dims.dimA) > 0 ? parseFloat(dims.dimA) : DEFAULT_LAZYL2_INPUTS.dimA;
    const B_in = !isNaN(parseFloat(dims.dimB)) && parseFloat(dims.dimB) > 0 ? parseFloat(dims.dimB) : DEFAULT_LAZYL2_INPUTS.dimB;
    const S_in = !isNaN(parseFloat(dims.dimS)) && parseFloat(dims.dimS) > 0 ? parseFloat(dims.dimS) : DEFAULT_LAZYL2_INPUTS.dimS;
    const T_in = !isNaN(parseFloat(dims.dimT)) && parseFloat(dims.dimT) > 0 ? parseFloat(dims.dimT) : DEFAULT_LAZYL2_INPUTS.dimT;
    const P_in = !isNaN(parseFloat(dims.dimP)) && parseFloat(dims.dimP) >= 0 ? parseFloat(dims.dimP) : DEFAULT_LAZYL2_INPUTS.dimP; // P can be 0
    const N_in = !isNaN(parseFloat(dims.dimN)) && parseFloat(dims.dimN) >= 0 ? parseFloat(dims.dimN) : DEFAULT_LAZYL2_INPUTS.dimN; // N can be 0

    // Ensure B >= S for valid geometry
    const valid_B = Math.max(B_in, S_in);
    const valid_S = S_in > B_in ? B_in : S_in;

    // Calculate effective dimensions for the three rectangles
    const rect1_w = A_in; // Top rectangle width
    const rect1_h = Math.max(0, valid_B - valid_S); // Top rectangle height

    const rect2_w = T_in; // Middle/Bottom-left rectangle width
    const rect2_h = valid_S; // Middle/Bottom-left rectangle height

    const rect3_w = P_in; // Foot/Bottom-right rectangle width
    const rect3_h = N_in; // Foot/Bottom-right rectangle height

    // Determine overall scale factor
    // Overall width is max(A, T+P)
    // Overall height is B (if N <= S) or S + (N-S) + (B-S) = B + N - S (if N > S, foot extends lower)
    const totalInputWidthSpan = Math.max(rect1_w, rect2_w + rect3_w);
    const y_offset_for_P = Math.max(0, rect3_h - rect2_h); // How much P extends below T's bottom
    const totalInputHeightSpan = rect1_h + rect2_h + y_offset_for_P;


    let scale = 1;
    if (totalInputWidthSpan > 0 && totalInputHeightSpan > 0) {
        const scaleX = MAX_SVG_L_EXTENT_WIDTH / totalInputWidthSpan;
        const scaleY = MAX_SVG_L_EXTENT_HEIGHT / totalInputHeightSpan;
        scale = Math.min(scaleX, scaleY);
    } else { 
        const default_total_w = Math.max(DEFAULT_LAZYL2_INPUTS.dimA, DEFAULT_LAZYL2_INPUTS.dimT + DEFAULT_LAZYL2_INPUTS.dimP);
        const default_y_offset_P = Math.max(0, DEFAULT_LAZYL2_INPUTS.dimN - DEFAULT_LAZYL2_INPUTS.dimS);
        const default_total_h = (DEFAULT_LAZYL2_INPUTS.dimB - DEFAULT_LAZYL2_INPUTS.dimS) + DEFAULT_LAZYL2_INPUTS.dimS + default_y_offset_P;
        scale = Math.min(MAX_SVG_L_EXTENT_WIDTH / default_total_w, MAX_SVG_L_EXTENT_HEIGHT / default_total_h);
    }

    // Scaled dimensions for drawing
    const r1w_s = rect1_w * scale;
    const r1h_s = rect1_h * scale;
    const r2w_s = rect2_w * scale;
    const r2h_s = rect2_h * scale;
    const r3w_s = rect3_w * scale;
    const r3h_s = rect3_h * scale;

    const baseX = SVG_L_BASE_X;
    // Adjust baseY so the lowest point of the shape is at SVG_L_BASE_Y + total_scaled_height
    // The lowest point is determined by whether N makes the foot extend below T.
    // If N > S, foot bottom is at y_base_T - (N_s - S_s).
    // If S >= N, foot bottom is at y_base_T - 0 (aligned with T's bottom).
    const y_foot_extension_below_T_bottom_s = Math.max(0, r3h_s - r2h_s);
    const total_scaled_height_drawing = r1h_s + r2h_s + y_foot_extension_below_T_bottom_s;
    const baseY = SVG_L_BASE_Y + total_scaled_height_drawing; // Start drawing from top

    // Coordinates for the three rectangles (drawn from their top-left corners)
    // R2 (Middle/Bottom-Left - T x S)
    const r2x = baseX;
    const r2y = baseY - r2h_s - y_foot_extension_below_T_bottom_s; // Align top of R2 with bottom of R1

    // R1 (Top - A x (B-S))
    const r1x = baseX;
    const r1y = r2y - r1h_s;

    // R3 (Foot/Bottom-Right - P x N)
    const r3x = baseX + r2w_s; // Starts to the right of R2
    const r3y = baseY - r3h_s - y_foot_extension_below_T_bottom_s; // Align top of R3 with top of R2

    // Path construction using the 8 vertices for a clean outline
    // V0: Top-left of R1
    const V0 = { x: r1x, y: r1y };
    // V1: Top-right of R1
    const V1 = { x: r1x + r1w_s, y: r1y };
    // V2: Bottom-right of R1, IF A > T+P. Or top-right of R3 if A <= T+P
    // This point is where R1 meets R3 vertically, or just end of R1 if R3 is not as wide.
    const V2_x = Math.max(r1x + r1w_s, r3x + r3w_s); // Furthest right x for top part
    const V2 = { x: V2_x, y: r1y + r1h_s }; // This should be r3y if A is shorter than T+P
                                            // This is actually (r3x+r3w_s, r3y) if P extends beyond A
                                            // Or (r1x+r1w_s, r2y) if A is longer

    // Simplified path from the three rectangles:
    // Start at top-left of R1
    // Go to top-right of R1
    // If R1 is wider than R2+R3: go down right edge of R1 to its bottom, then left to R3's right edge.
    // Else (R2+R3 is wider): go down to top-right of R3, then along top of R3.
    // This is complex. Let's draw the 3 rects and their dimension lines.
    // The path will be formed by the outer perimeter of these 3 rects.

    // For drawing, we need the absolute min/max x/y to set viewBox correctly
    const min_x_coord = baseX;
    const max_x_coord = baseX + Math.max(r1w_s, r2w_s + r3w_s);
    const min_y_coord = r1y; // Topmost y
    const max_y_coord = baseY - y_foot_extension_below_T_bottom_s; // Bottommost y (bottom of T or P)
    
    const svg_width = max_x_coord - min_x_coord + 2 * SVG_L_BASE_X; // Add padding
    const svg_height = max_y_coord - min_y_coord + 2 * SVG_L_BASE_Y; // Add padding

    const rotationCenterX = min_x_coord + (max_x_coord - min_x_coord) / 2;
    const rotationCenterY = min_y_coord + (max_y_coord - min_y_coord) / 2;
    
    // Dimension line positions
    // A: Top edge of R1
    const dimA_line_y = r1y - DIM_L_LINE_OFFSET;
    const dimA_text_x = r1x + r1w_s / 2;
    // B: Left edge of R1 + R2 (total height from top of R1 to bottom of R2)
    const dimB_line_x = r1x - DIM_L_LINE_OFFSET;
    const dimB_text_y = r1y + (r2y + r2h_s - r1y) / 2;
    // S: Height of R2
    const dimS_line_x = r2x + r2w_s + DIM_L_LINE_OFFSET; // Right of R2
    const dimS_text_y = r2y + r2h_s / 2;
    // T: Width of R2
    const dimT_line_y = r2y + r2h_s + DIM_L_LINE_OFFSET; // Below R2
    const dimT_text_x = r2x + r2w_s / 2;
    // P: Width of R3
    const dimP_line_y = r3y + r3h_s + DIM_L_LINE_OFFSET; // Below R3
    const dimP_text_x = r3x + r3w_s / 2;
    // N: Height of R3
    const dimN_line_x = r3x + r3w_s + DIM_L_LINE_OFFSET; // Right of R3
    const dimN_text_y = r3y + r3h_s / 2;


return `
<svg viewBox="${min_x_coord - SVG_L_BASE_X} ${min_y_coord - SVG_L_BASE_Y} ${svg_width} ${svg_height}" xmlns="http://www.w3.org/2000/svg">
<g id="lazyL2-group" transform="rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})">
{/* Rectangle 1 (Top: A x (B-S)) */}
<rect x="${r1x}" y="${r1y}" width="${r1w_s}" height="${r1h_s}" fill="#a5f3fc" stroke="#0284c7" stroke-width="1.5"/>
{/* Rectangle 2 (Middle/Bottom-Left: T x S) */}
<rect x="${r2x}" y="${r2y}" width="${r2w_s}" height="${r2h_s}" fill="#a5f3fc" stroke="#0284c7" stroke-width="1.5"/>
{/* Rectangle 3 (Foot/Bottom-Right: P x N) */}
<rect x="${r3x}" y="${r3y}" width="${r3w_s}" height="${r3h_s}" fill="#a5f3fc" stroke="#0284c7" stroke-width="1.5"/>

{/* Dimension A */}
<line id="lazyL2-dimA-cap1" x1="${r1x}" y1="${dimA_line_y - DIM_L_CAP_SIZE}" x2="${r1x}" y2="${dimA_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimA-line1" x1="${r1x}" y1="${dimA_line_y}" x2="${dimA_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH}" y2="${dimA_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="lazyL2-dimA-text" x="${dimA_text_x}" y="${dimA_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">A</text>
<line id="lazyL2-dimA-line2" x1="${dimA_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${dimA_line_y}" x2="${r1x + r1w_s}" y2="${dimA_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimA-cap2" x1="${r1x + r1w_s}" y1="${dimA_line_y - DIM_L_CAP_SIZE}" x2="${r1x + r1w_s}" y2="${dimA_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

{/* Dimension B (Overall left height) */}
<line id="lazyL2-dimB-cap1" x1="${dimB_line_x - DIM_L_CAP_SIZE}" y1="${r1y}" x2="${dimB_line_x + DIM_L_CAP_SIZE}" y2="${r1y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimB-line1" x1="${dimB_line_x}" y1="${r1y}" x2="${dimB_line_x}" y2="${dimB_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="lazyL2-dimB-text" x="${dimB_line_x}" y="${dimB_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${dimB_line_x}, ${dimB_text_y})">B</text>
<line id="lazyL2-dimB-line2" x1="${dimB_line_x}" y1="${dimB_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${dimB_line_x}" y2="${r2y + r2h_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimB-cap2" x1="${dimB_line_x - DIM_L_CAP_SIZE}" y1="${r2y + r2h_s}" x2="${dimB_line_x + DIM_L_CAP_SIZE}" y2="${r2y + r2h_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

{/* Dimension S (Height of R2) */}
<line id="lazyL2-dimS-cap1" x1="${dimS_line_x - DIM_L_CAP_SIZE}" y1="${r2y}" x2="${dimS_line_x + DIM_L_CAP_SIZE}" y2="${r2y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimS-line1" x1="${dimS_line_x}" y1="${r2y}" x2="${dimS_line_x}" y2="${dimS_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="lazyL2-dimS-text" x="${dimS_line_x}" y="${dimS_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${dimS_line_x}, ${dimS_text_y})">S</text>
<line id="lazyL2-dimS-line2" x1="${dimS_line_x}" y1="${dimS_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${dimS_line_x}" y2="${r2y + r2h_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimS-cap2" x1="${dimS_line_x - DIM_L_CAP_SIZE}" y1="${r2y + r2h_s}" x2="${dimS_line_x + DIM_L_CAP_SIZE}" y2="${r2y + r2h_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

{/* Dimension T (Width of R2) */}
<line id="lazyL2-dimT-cap1" x1="${r2x}" y1="${dimT_line_y - DIM_L_CAP_SIZE}" x2="${r2x}" y2="${dimT_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimT-line1" x1="${r2x}" y1="${dimT_line_y}" x2="${dimT_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH}" y2="${dimT_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="lazyL2-dimT-text" x="${dimT_text_x}" y="${dimT_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">T</text>
<line id="lazyL2-dimT-line2" x1="${dimT_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${dimT_line_y}" x2="${r2x + r2w_s}" y2="${dimT_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimT-cap2" x1="${r2x + r2w_s}" y1="${dimT_line_y - DIM_L_CAP_SIZE}" x2="${r2x + r2w_s}" y2="${dimT_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

{/* Dimension P (Width of R3) */}
<line id="lazyL2-dimP-cap1" x1="${r3x}" y1="${dimP_line_y - DIM_L_CAP_SIZE}" x2="${r3x}" y2="${dimP_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimP-line1" x1="${r3x}" y1="${dimP_line_y}" x2="${dimP_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH}" y2="${dimP_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="lazyL2-dimP-text" x="${dimP_text_x}" y="${dimP_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">P</text>
<line id="lazyL2-dimP-line2" x1="${dimP_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${dimP_line_y}" x2="${r3x + r3w_s}" y2="${dimP_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimP-cap2" x1="${r3x + r3w_s}" y1="${dimP_line_y - DIM_L_CAP_SIZE}" x2="${r3x + r3w_s}" y2="${dimP_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

{/* Dimension N (Height of R3) */}
<line id="lazyL2-dimN-cap1" x1="${dimN_line_x - DIM_L_CAP_SIZE}" y1="${r3y}" x2="${dimN_line_x + DIM_L_CAP_SIZE}" y2="${r3y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimN-line1" x1="${dimN_line_x}" y1="${r3y}" x2="${dimN_line_x}" y2="${dimN_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="lazyL2-dimN-text" x="${dimN_line_x}" y="${dimN_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${dimN_line_x}, ${dimN_text_y})">N</text>
<line id="lazyL2-dimN-line2" x1="${dimN_line_x}" y1="${dimN_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${dimN_line_x}" y2="${r3y + r3h_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="lazyL2-dimN-cap2" x1="${dimN_line_x - DIM_L_CAP_SIZE}" y1="${r3y + r3h_s}" x2="${dimN_line_x + DIM_L_CAP_SIZE}" y2="${r3y + r3h_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
</g>
</svg>`;
},
    kidney: `
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
    {/* New Kidney shape path - single color, adapted from reference */}
    <path d="M65,130 C30,110 35,40 100,35 C165,30 210,60 210,90 C210,120 170,140 140,135 C110,130 100,120 65,130Z" 
    fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>

    {/* Overall Length Dimension (L) */}
    {/* Path X-range: approx 30 to 210. Length dim X-range: 50 to 210. This should be fine. */}
    <line id="kidney-length-cap1" x1="50" y1="155" x2="50" y2="165" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="kidney-length-line1" x1="50" y1="160" x2="120" y2="160" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="kidney-length-text" x="130" y="160" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length</text>
    <line id="kidney-length-line2" x1="140" y1="160" x2="210" y2="160" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="kidney-length-cap2" x1="210" y1="155" x2="210" y2="165" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Width A Dimension - Positioned near the left wider part (approx x=80) */}
    {/* Path Y-range at x=80: approx 36 to 126. Width A dim Y-range: 15 to 140. */}
    <line id="kidney-widthA-cap1" x1="75" y1="15" x2="85" y2="15" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="kidney-widthA-line1" x1="80" y1="15" x2="80" y2="35" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="kidney-widthA-text" x="80" y="80" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, 80, 80)">Width A</text>
    <line id="kidney-widthA-line2" x1="80" y1="125" x2="80" y2="140" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/> 
    <line id="kidney-widthA-cap2" x1="75" y1="140" x2="85" y2="140" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    {/* Width B Dimension - Positioned near the right wider part (approx x=180) */}
    {/* Path Y-range at x=180: approx 50 to 135 (includes indent). Width B dim Y-range: 55 to 140. */}
    <line id="kidney-widthB-cap1" x1="175" y1="55" x2="185" y2="55" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/> 
    <line id="kidney-widthB-line1" x1="180" y1="55" x2="180" y2="75" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="kidney-widthB-text" x="180" y="95" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, 180, 95)">Width B</text>
    <line id="kidney-widthB-line2" x1="180" y1="115" x2="180" y2="140" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/> 
    <line id="kidney-widthB-cap2" x1="175" y1="140" x2="185" y2="140" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`
    };

    function collectTrueLDimensions() { // Renamed from collectLazyLDimensions
        const lengthAVal = document.getElementById('lengthA')?.value;
        const widthAVal = document.getElementById('widthA')?.value;
        const lengthBVal = document.getElementById('lengthB')?.value;
        const widthBVal = document.getElementById('widthB')?.value;
        return { lenA: lengthAVal, widA: widthAVal, lenB: lengthBVal, widB: widthBVal };
    }

    function collectLazyLDimensions() { // New function for the new LazyL
        const lengthAVal = document.getElementById('lengthA')?.value;
        const widthAVal = document.getElementById('widthA')?.value;
        const lengthBVal = document.getElementById('lengthB')?.value;
        const widthBVal = document.getElementById('widthB')?.value;
        const diagCVal = document.getElementById('diagC')?.value;
        return { lenA: lengthAVal, widA: widthAVal, lenB: lengthBVal, widB: widthBVal, diagC: diagCVal };
    }
    function collectLazyL2Dimensions() { // New: For 6-input Lazy L (#2)
        const dimAVal = document.getElementById('dimA')?.value; 
        const dimBVal = document.getElementById('dimB')?.value;
        const dimSVal = document.getElementById('dimS')?.value; // Changed from dimC
        const dimTVal = document.getElementById('dimT')?.value; // Changed from dimD
        const dimPVal = document.getElementById('dimP')?.value; // Changed from diagE
        const dimNVal = document.getElementById('dimN')?.value; // Changed from diagF
        return { 
            dimA: dimAVal, 
            dimB: dimBVal, 
            dimS: dimSVal, 
            dimT: dimTVal, 
            dimP: dimPVal,
            dimN: dimNVal
        };
    }


    function updateShapeDiagram(shape, rotation = 0, dynamicDims = null) { 
        let svgContent = '';
        if (shape === 'trueL') { // Changed from 'lazyL' to 'trueL'
            const dimsToUse = dynamicDims || collectTrueLDimensions();
            svgContent = svgDiagrams.trueL(rotation, dimsToUse); 
            rotateButtonContainer.style.display = 'block'; 
        } else if (shape === 'lazyL') { // New LazyL shape
            const dimsToUse = dynamicDims || collectLazyLDimensions();
            svgContent = svgDiagrams.lazyL(rotation, dimsToUse);
            rotateButtonContainer.style.display = 'block';
        } else if (shape === 'lazyL2') { // New: 6-input Lazy L (#2)
            const dimsToUse = dynamicDims || collectLazyL2Dimensions();
            svgContent = svgDiagrams.lazyL2(rotation, dimsToUse);
            rotateButtonContainer.style.display = 'block';
        } else {
            if (svgDiagrams[shape]) {
                svgContent = typeof svgDiagrams[shape] === 'function' ? svgDiagrams[shape]() : svgDiagrams[shape];
            }
            rotateButtonContainer.style.display = 'none'; 
        }

        if (svgContent) {
            diagramContainer.innerHTML = svgContent;
            shapeDiagramSection.style.display = 'block';
            updateAllDiagramTextsFromInputs(); // This will update text content like "Length A" to "X Feet"
        } else {
            diagramContainer.innerHTML = '<p class="text-gray-500">Diagram not available.</p>';
            shapeDiagramSection.style.display = 'block';
            rotateButtonContainer.style.display = 'none';
        }
    }
    
    rotateDiagramBtn.addEventListener('click', () => {
        if (selectedShape === 'trueL' || selectedShape === 'lazyL' || selectedShape === 'lazyL2') { // Added lazyL2
        currentLazyLRotation = (currentLazyLRotation + 90) % 360;
        updateShapeDiagram(selectedShape, currentLazyLRotation); 
        }
    });

    shapeButtons.forEach(button => {
        button.addEventListener('click', () => {
            shapeButtons.forEach(btn => {
                btn.classList.remove('btn-active');
                btn.classList.add('btn-inactive');
            });
            button.classList.remove('btn-inactive');
            button.classList.add('btn-active');
            
            selectedShape = button.dataset.shape;
            currentLazyLRotation = 0; 
            
            updateShapeDiagram(selectedShape, currentLazyLRotation); 
            updateDimensionInputs(selectedShape); 
            
            dimensionInputsSection.style.display = 'block';
            calculateVolumeBtn.disabled = false;
            volumeResultsSection.style.display = 'none';
            avgDepthInput.value = '';
            const currentInputs = inputsContainer.querySelectorAll('input[type="number"]');
            currentInputs.forEach(input => input.value = '');
        });
    });

    function getDefaultDiagramText(diagramTextId) {
    if (diagramTextId.includes('lazyL2-dimA-text')) return 'A';
    if (diagramTextId.includes('lazyL2-dimB-text')) return 'B';
    if (diagramTextId.includes('lazyL2-dimS-text')) return 'S'; // Was dimC
    if (diagramTextId.includes('lazyL2-dimT-text')) return 'T'; // Was dimD
    if (diagramTextId.includes('lazyL2-dimP-text')) return 'P'; // Was diagE
    if (diagramTextId.includes('lazyL2-dimN-text')) return 'N'; // Was diagF
    if (diagramTextId.includes('trueL-lengthA')) return 'Length A'; 
    if (diagramTextId.includes('lengthA')) return 'Length A'; // TrueL & LazyL
    if (diagramTextId.includes('widthA')) return 'Width A';   // TrueL & LazyL & Kidney
    if (diagramTextId.includes('lengthB')) return 'Length B'; // TrueL & LazyL
    if (diagramTextId.includes('widthB')) return 'Width B';   // TrueL & LazyL & Kidney
    if (diagramTextId.includes('diagC')) return 'Diag. C';    // LazyL
    if (diagramTextId.includes('length')) return 'Length';    // Rectangle, Oval, Kidney (overall length)
    if (diagramTextId.includes('width') && !diagramTextId.includes('widthA') && !diagramTextId.includes('widthB')) return 'Width'; // Rectangle, Oval
    if (diagramTextId.includes('diameter')) return 'Diameter'; // Round
        return '';
    }

    function setElementsAttribute(ids, attribute, value) {
        ids.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.setAttribute(attribute, value);
            }
        });
    }

    function createInputElement(id, label, placeholder, diagramTextIdBase) {
        const div = document.createElement('div');
        div.innerHTML = `
            <label class="block text-sm font-medium text-gray-700 mb-1" for="${id}">${label}</label>
            <input type="number" id="${id}" name="${id}" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="${placeholder}" inputmode="decimal" step="0.1" required data-diagram-target-base="${diagramTextIdBase}">
        `;
        const inputElement = div.querySelector('input');

        const textId = diagramTextIdBase; 
        const line1Id = diagramTextIdBase.replace('-text', '-line1');
        const line2Id = diagramTextIdBase.replace('-text', '-line2');
        const cap1Id = diagramTextIdBase.replace('-text', '-cap1');
        const cap2Id = diagramTextIdBase.replace('-text', '-cap2');
        
        const lineAndCapIds = [line1Id, line2Id, cap1Id, cap2Id].filter(id => document.getElementById(id));

        inputElement.addEventListener('focus', (e) => {
            const textElement = document.getElementById(textId);
            if (textElement) {
                textElement.setAttribute('fill', DIAGRAM_HIGHLIGHT_COLOR);
                textElement.textContent = getDefaultDiagramText(textId);
            }
            setElementsAttribute(lineAndCapIds, 'stroke', DIAGRAM_HIGHLIGHT_COLOR);
        });

        inputElement.addEventListener('blur', (e) => {
            const textElement = document.getElementById(textId);
            if (textElement) {
                textElement.setAttribute('fill', DIAGRAM_TEXT_COLOR_NORMAL);
                const value = e.target.value;
                if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
                    textElement.textContent = `${parseFloat(value)} Feet`;
                } else {
                    textElement.textContent = getDefaultDiagramText(textId);
                }
            }
            setElementsAttribute(lineAndCapIds, 'stroke', DIAGRAM_LINE_COLOR_NORMAL);
        });
        return div;
    }

    function updateDimensionInputs(shape) {
        inputsContainer.innerHTML = ''; 
        let diagramIdPrefix = ''; 

        switch (shape) {
            case 'rectangle':
                diagramIdPrefix = 'rect-';
                inputsContainer.appendChild(createInputElement('length', 'Length (feet)', 'e.g., 30', diagramIdPrefix + 'length-text'));
                inputsContainer.appendChild(createInputElement('width', 'Width (feet)', 'e.g., 15', diagramIdPrefix + 'width-text'));
                break;
            case 'round':
                diagramIdPrefix = 'round-';
                inputsContainer.appendChild(createInputElement('diameter', 'Diameter (feet)', 'e.g., 20', diagramIdPrefix + 'diameter-text'));
                break;
            case 'oval':
                diagramIdPrefix = 'oval-';
                inputsContainer.appendChild(createInputElement('length', 'Major Axis (Length) (feet)', 'e.g., 30', diagramIdPrefix + 'length-text'));
                inputsContainer.appendChild(createInputElement('width', 'Minor Axis (Width) (feet)', 'e.g., 15', diagramIdPrefix + 'width-text'));
                break;
            case 'trueL': // Renamed from 'lazyL'
                diagramIdPrefix = 'trueL-'; // Changed prefix
                inputsContainer.appendChild(createInputElement('lengthA', 'Length of Section A', 'e.g., 40', diagramIdPrefix + 'lengthA-text'));
                inputsContainer.appendChild(createInputElement('widthA', 'Width of Section A', 'e.g., 20', diagramIdPrefix + 'widthA-text'));
                inputsContainer.appendChild(createInputElement('lengthB', 'Length of Section B', 'e.g., 20', diagramIdPrefix + 'lengthB-text'));
                inputsContainer.appendChild(createInputElement('widthB', 'Width of Section B', 'e.g., 15', diagramIdPrefix + 'widthB-text'));
                
                ['lengthA', 'widthA', 'lengthB', 'widthB'].forEach(id => {
                    const inputEl = document.getElementById(id);
                    if (inputEl) {
                        inputEl.addEventListener('input', () => {
                            if (selectedShape === 'trueL') { // Changed from 'lazyL'
                                const currentDims = collectTrueLDimensions(); // Changed function call
                                updateShapeDiagram('trueL', currentLazyLRotation, currentDims); // Changed shape name
                            }
                        });
                    }
                });  
                break;
            case 'lazyL': // New case for the new LazyL shape
                diagramIdPrefix = 'lazyL-';
                inputsContainer.appendChild(createInputElement('lengthA', 'Length of Section A', 'e.g., 30', diagramIdPrefix + 'lengthA-text'));
                inputsContainer.appendChild(createInputElement('widthA', 'Width of Section A', 'e.g., 15', diagramIdPrefix + 'widthA-text'));
                inputsContainer.appendChild(createInputElement('lengthB', 'Length of Section B (vertical)', 'e.g., 20', diagramIdPrefix + 'lengthB-text'));
                inputsContainer.appendChild(createInputElement('widthB', 'Width of Section B (vertical)', 'e.g., 10', diagramIdPrefix + 'widthB-text'));
                inputsContainer.appendChild(createInputElement('diagC', 'Diagonal Cut Length (C)', 'e.g., 5', diagramIdPrefix + 'diagC-text'));
            
                ['lengthA', 'widthA', 'lengthB', 'widthB', 'diagC'].forEach(id => {
                    const inputEl = document.getElementById(id);
                    if (inputEl) {
                        inputEl.addEventListener('input', () => {
                            if (selectedShape === 'lazyL') {
                                const currentDims = collectLazyLDimensions();
                                updateShapeDiagram('lazyL', currentLazyLRotation, currentDims);
                            }
                        });
                    }
                });
                break;
            case 'lazyL2': // Updated for Lazy L (#2) based on Hydra PDF (A,B,S,T,P,N)
            diagramIdPrefix = 'lazyL2-';
            inputsContainer.appendChild(createInputElement('dimA', 'A - Top Arm Length', 'e.g., 18', diagramIdPrefix + 'dimA-text'));
            inputsContainer.appendChild(createInputElement('dimB', 'B - Overall Left Height', 'e.g., 29', diagramIdPrefix + 'dimB-text'));
            inputsContainer.appendChild(createInputElement('dimS', 'S - Middle Arm Height', 'e.g., 17', diagramIdPrefix + 'dimS-text'));
            inputsContainer.appendChild(createInputElement('dimT', 'T - Middle Arm Length', 'e.g., 18', diagramIdPrefix + 'dimT-text'));
            inputsContainer.appendChild(createInputElement('dimP', 'P - Foot Length', 'e.g., 12', diagramIdPrefix + 'dimP-text'));
            inputsContainer.appendChild(createInputElement('dimN', 'N - Foot Height', 'e.g., 24', diagramIdPrefix + 'dimN-text'));
        
            ['dimA', 'dimB', 'dimS', 'dimT', 'dimP', 'dimN'].forEach(id => { // Ensure these match new input IDs
                    const inputEl = document.getElementById(id);
                    if (inputEl) {
                        inputEl.addEventListener('input', () => {
                            if (selectedShape === 'lazyL2') {
                                const currentDims = collectLazyL2Dimensions();
                                updateShapeDiagram('lazyL2', currentLazyLRotation, currentDims);
                            }
                        });
                    }
                });
                break;
            case 'kidney':
                diagramIdPrefix = 'kidney-';
                inputsContainer.appendChild(createInputElement('length', 'Overall Length (L)', 'e.g., 30', diagramIdPrefix + 'length-text'));
                inputsContainer.appendChild(createInputElement('widthA', 'Width A', 'e.g., 15', diagramIdPrefix + 'widthA-text'));
                inputsContainer.appendChild(createInputElement('widthB', 'Width B', 'e.g., 10', diagramIdPrefix + 'widthB-text'));
                break;
        }
        updateAllDiagramTextsFromInputs();
    }

    function updateAllDiagramTextsFromInputs() {
        const inputs = inputsContainer.querySelectorAll('input[data-diagram-target-base]');
        inputs.forEach(input => {
            const diagramTextIdBase = input.dataset.diagramTargetBase;
            const textElement = document.getElementById(diagramTextIdBase);
            
            if (textElement) {
                const value = input.value;
                if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
                    textElement.textContent = `${parseFloat(value)} Feet`;
                } else {
                    textElement.textContent = getDefaultDiagramText(diagramTextIdBase);
                }
                if (document.activeElement !== input) {
                    textElement.setAttribute('fill', DIAGRAM_TEXT_COLOR_NORMAL);
                    const line1Id = diagramTextIdBase.replace('-text', '-line1');
                    const line2Id = diagramTextIdBase.replace('-text', '-line2');
                    const cap1Id = diagramTextIdBase.replace('-text', '-cap1');
                    const cap2Id = diagramTextIdBase.replace('-text', '-cap2');
                    setElementsAttribute([line1Id, line2Id, cap1Id, cap2Id].filter(id => document.getElementById(id)), 'stroke', DIAGRAM_LINE_COLOR_NORMAL);
                }
            }
        });
    }

    calculateVolumeBtn.addEventListener('click', () => {
        if (!selectedShape || !avgDepthInput.value) {
            alert('Please select a shape and enter all required dimensions, including average depth.');
            return;
        }

        const avgDepth = parseFloat(avgDepthInput.value);
        if (isNaN(avgDepth) || avgDepth <= 0) {
            alert('Average depth must be a positive number.');
            avgDepthInput.focus();
            return;
        }

        let volumeCubicFeet = 0;
        let dimensionsValid = true;
        let firstInvalidInput = null;

        try {
            switch (selectedShape) {
                case 'rectangle':
                    const lengthRect = parseFloat(document.getElementById('length').value);
                    const widthRect = parseFloat(document.getElementById('width').value);
                    if (isNaN(lengthRect) || lengthRect <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length'); }
                    if (isNaN(widthRect) || widthRect <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('width'); }
                    if (dimensionsValid) volumeCubicFeet = lengthRect * widthRect * avgDepth;
                    break;
                case 'round':
                    const diameter = parseFloat(document.getElementById('diameter').value);
                    if (isNaN(diameter) || diameter <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('diameter'); }
                    if (dimensionsValid) {
                        const radius = diameter / 2;
                        volumeCubicFeet = Math.PI * Math.pow(radius, 2) * avgDepth;
                    }
                    break;
                case 'oval':
                    const lengthOval = parseFloat(document.getElementById('length').value);
                    const widthOval = parseFloat(document.getElementById('width').value);
                    if (isNaN(lengthOval) || lengthOval <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length'); }
                    if (isNaN(widthOval) || widthOval <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('width'); }
                    if (dimensionsValid) volumeCubicFeet = (Math.PI / 4) * lengthOval * widthOval * avgDepth;
                    break;
                case 'trueL': // Renamed from 'lazyL'
                    const lengthA_TL = parseFloat(document.getElementById('lengthA').value); // TL for TrueL
                    const widthA_TL = parseFloat(document.getElementById('widthA').value);
                    const lengthB_TL = parseFloat(document.getElementById('lengthB').value);
                    const widthB_TL = parseFloat(document.getElementById('widthB').value);
                
                    if (isNaN(lengthA_TL) || lengthA_TL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthA');}
                    if (isNaN(widthA_TL) || widthA_TL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthA');}
                    if (isNaN(lengthB_TL) || lengthB_TL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthB');}
                    if (isNaN(widthB_TL) || widthB_TL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthB');}
                    
                    if (dimensionsValid) {
                        const areaA = lengthA_L * widthA_L;
                        const areaB = lengthB_L * widthB_L;
                        volumeCubicFeet = (areaA + areaB) * avgDepth;
                    }
                    break;
                case 'lazyL': // New calculation for LazyL with cut corner
                    const lengthA_LL = parseFloat(document.getElementById('lengthA').value); // LL for LazyL
                    const widthA_LL = parseFloat(document.getElementById('widthA').value);
                    const lengthB_LL = parseFloat(document.getElementById('lengthB').value);
                    const widthB_LL = parseFloat(document.getElementById('widthB').value);
                    const diagC_LL = parseFloat(document.getElementById('diagC').value);
            
                    if (isNaN(lengthA_LL) || lengthA_LL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthA');}
                    if (isNaN(widthA_LL) || widthA_LL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthA');}
                    if (isNaN(lengthB_LL) || lengthB_LL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthB');}
                    if (isNaN(widthB_LL) || widthB_LL <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthB');}
                    if (isNaN(diagC_LL) || diagC_LL < 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('diagC');} // diagC can be 0 for no cut
            
                    if (dimensionsValid) {
                        const s_from_diag = diagC_LL / Math.sqrt(2);
                        const available_on_A = Math.max(0, lengthA_LL - widthB_LL);
                        const available_on_B = lengthB_LL;
                        const s_constrained = Math.min(s_from_diag, available_on_A, available_on_B);
                        
                        const area_cut_triangle = 0.5 * s_constrained * s_constrained;
                        
                        const gross_area = (lengthA_LL * widthA_LL) + (widthB_LL * lengthB_LL);
                        volumeCubicFeet = (gross_area - area_cut_triangle) * avgDepth;
                    }
                    break;
                case 'lazyL2': // Calculation for Lazy L (#2) based on Hydra PDF (A,B,S,T,P,N)
                    let dimA_L2 = parseFloat(document.getElementById('dimA').value); 
                    let dimB_L2 = parseFloat(document.getElementById('dimB').value); 
                    let dimS_L2 = parseFloat(document.getElementById('dimS').value);   
                    let dimT_L2 = parseFloat(document.getElementById('dimT').value); 
                    let dimP_L2 = parseFloat(document.getElementById('dimP')?.value || "0");        
                    let dimN_L2 = parseFloat(document.getElementById('dimN').value);
    
                    if (isNaN(dimA_L2) || dimA_L2 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('dimA');}
                    if (isNaN(dimB_L2) || dimB_L2 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('dimB');}
                    if (isNaN(dimS_L2) || dimS_L2 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('dimS'); }  
                    if (isNaN(dimT_L2) || dimT_L2 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('dimT');}
                    if (isNaN(dimP_L2) || dimP_L2 < 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('dimP');} // P can be 0
                    if (isNaN(dimN_L2) || dimN_L2 < 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('dimN');} // N can be 0

                    if (dimensionsValid) {
                        if (dimS_L2 > dimB_L2) {
                alert("Dimension S (Middle Arm Height) cannot exceed Dimension B (Overall Left Height). Adjusting S to match B for accurate calculation."); 
                dimS_L2 = dimB_L2; 
                document.getElementById('dimS').value = dimS_L2; 
            }
            
            const area_rect1 = dimA_L2 * (dimB_L2 - dimS_L2); // Top arm
            const area_rect2 = dimS_L2 * dimT_L2;          // Middle/Bottom-left arm
            const area_rect3 = dimP_L2 * dimN_L2;          // Foot/Bottom-right arm
            
            volumeCubicFeet = (area_rect1 + area_rect2 + area_rect3) * avgDepth;
        }
        break;  
                case 'kidney':
                    const overallLengthK = parseFloat(document.getElementById('length').value); // Reusing 'length' ID for overall length
                    const widthAK = parseFloat(document.getElementById('widthA').value);
                    const widthBK = parseFloat(document.getElementById('widthB').value);

                    if (isNaN(overallLengthK) || overallLengthK <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length');}
                    if (isNaN(widthAK) || widthAK <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthA');}
                    if (isNaN(widthBK) || widthBK <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthB');}

                    if (dimensionsValid) {
                        const surfaceArea = (widthAK + widthBK) * overallLengthK * 0.45;
                        volumeCubicFeet = surfaceArea * avgDepth;
                    }
                    break;
            }

            if (!dimensionsValid) {
                alert('Please enter valid positive numbers for all dimensions.');
                if (firstInvalidInput) firstInvalidInput.focus();
                return;
            }

            const volumeGallons = volumeCubicFeet * GALLONS_PER_CUBIC_FOOT;
            const roundedGallons = Math.round(volumeGallons);

            volumeResultDiv.textContent = `${formatNumberWithCommas(roundedGallons)} gallons (approx.)`;
            volumeResultsSection.style.display = 'block';
            volumeResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Store the calculated volume in localStorage for the main page
            localStorage.setItem('calculatedPoolVolumeGallons', roundedGallons.toString());


        } catch (error) {
            alert('An error occurred during calculation. Please check your inputs.');
            console.error("Calculation error:", error);
        }
    });
    
    function formatNumberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});