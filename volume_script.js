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
     const DEFAULT_LAZYL2_INPUTS = { length1: 36, width1: 25, length2: 10, width2: 20, length3: 10, length4: 25 };
     const DEFAULT_ROMAN_INPUTS = { length: 30, width: 15 };
     const DEFAULT_DOUBLE_GRECIAN_INPUTS = { overallLength: 40, overallWidth: 20, endWidth: 12 };
     const DEFAULT_OFFSET_RECT_INPUTS = { lenA: 40, widA: 15, lenB: 15, widB: 10, offsetX: 5 };
     const DEFAULT_FIGURE8_INPUTS = { diameterA: 20, diameterB: 18 };
     const DEFAULT_CUSTOM_FREEFORM_INPUTS = { length: 40, widths: [15, 20, 18] };
     const DEFAULT_MOUNTAIN_LAKE_INPUTS = { length: 35, widthA: 18, widthB: 12 };
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
    
    mountainLake: (dims = {}) => {
        // This function is now dynamic, responding to user inputs for a more intuitive experience.
        // The path has been adjusted to be narrower in the middle, as requested.
        const length = !isNaN(parseFloat(dims.length)) && parseFloat(dims.length) > 0 ? parseFloat(dims.length) : DEFAULT_MOUNTAIN_LAKE_INPUTS.length;
        const widthA = !isNaN(parseFloat(dims.widthA)) && parseFloat(dims.widthA) > 0 ? parseFloat(dims.widthA) : DEFAULT_MOUNTAIN_LAKE_INPUTS.widthA;
        const widthB = !isNaN(parseFloat(dims.widthB)) && parseFloat(dims.widthB) > 0 ? parseFloat(dims.widthB) : DEFAULT_MOUNTAIN_LAKE_INPUTS.widthB;
        const avgWidth = (widthA + widthB) / 2;

        // Define a drawing area for the shape, leaving space for dimension lines
        const maxShapeWidth = 320;
        const maxShapeHeight = 180;

        let scale = 1;
        if (length > 0 && avgWidth > 0) {
            const scaleX = maxShapeWidth / length;
            const scaleY = maxShapeHeight / avgWidth;
            scale = Math.min(scaleX, scaleY);
        }

        const sL = length * scale;
        const sW = avgWidth * scale;

        // Center the shape within the viewBox
        const viewboxWidth = 400;
        const viewboxHeight = 250;
        const verticalPaddingForLines = 35;

        const baseX = (viewboxWidth - sL) / 2;
        const baseY = (viewboxHeight - sW - verticalPaddingForLines) / 2;

        // Define the Bezier curve points relative to the scaled bounding box.
        // These normalized factors create the "narrower middle" shape.
        const p_start = { x: baseX + sL * 0.5, y: baseY + sW * 0.15 };
        const p_end = { x: baseX + sL * 0.5, y: baseY + sW * 0.85 };
        const c1_p1 = { x: baseX + sL * 0.1, y: baseY };
        const c1_p2 = { x: baseX + sL * 0.1, y: baseY + sW };
        const c2_p1 = { x: baseX + sL * 0.9, y: baseY + sW };
        const c2_p2 = { x: baseX + sL * 0.9, y: baseY };

        const pathData = `M ${p_start.x},${p_start.y} C ${c1_p1.x},${c1_p1.y} ${c1_p2.x},${c1_p2.y} ${p_end.x},${p_end.y} C ${c2_p1.x},${c2_p1.y} ${c2_p2.x},${c2_p2.y} ${p_start.x},${p_start.y} Z`;

        // --- Dimension Lines (now closer to the shape) ---
        const lenLineY = baseY + sW + 15;
        const lenCapY1 = lenLineY - 5;
        const lenCapY2 = lenLineY + 5;
        const lenTextX = baseX + sL / 2;

        const widthALineX = baseX + sL * 0.25;
        const widthA_y1 = baseY + sW * 0.1;
        const widthA_y2 = baseY + sW * 0.9;
        const widthA_text_y = baseY + sW * 0.5;

        const widthBLineX = baseX + sL * 0.75;
        const widthB_y1 = baseY + sW * 0.1;
        const widthB_y2 = baseY + sW * 0.9;
        const widthB_text_y = baseY + sW * 0.5;

        return `
        <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
        <!-- Dynamically scaled Mountain Lake shape -->
        <path d="${pathData}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
        
        <!-- Overall Length Dimension (L) -->
        <line id="mountainLake-length-cap1" x1="${baseX}" y1="${lenCapY1}" x2="${baseX}" y2="${lenCapY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="mountainLake-length-line1" x1="${baseX}" y1="${lenLineY}" x2="${lenTextX - 20}" y2="${lenLineY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <text id="mountainLake-length-text" x="${lenTextX}" y="${lenLineY}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length</text>
        <line id="mountainLake-length-line2" x1="${lenTextX + 20}" y1="${lenLineY}" x2="${baseX + sL}" y2="${lenLineY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="mountainLake-length-cap2" x1="${baseX + sL}" y1="${lenCapY1}" x2="${baseX + sL}" y2="${lenCapY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        
        <!-- Width A Dimension (Left Lobe) -->
        <line id="mountainLake-widthA-cap1" x1="${widthALineX - 5}" y1="${widthA_y1}" x2="${widthALineX + 5}" y2="${widthA_y1}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="mountainLake-widthA-line1" x1="${widthALineX}" y1="${widthA_y1}" x2="${widthALineX}" y2="${widthA_text_y - 20}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <text id="mountainLake-widthA-text" x="${widthALineX}" y="${widthA_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${widthALineX}, ${widthA_text_y})">Width A</text>
        <line id="mountainLake-widthA-line2" x1="${widthALineX}" y1="${widthA_text_y + 20}" x2="${widthALineX}" y2="${widthA_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="mountainLake-widthA-cap2" x1="${widthALineX - 5}" y1="${widthA_y2}" x2="${widthALineX + 5}" y2="${widthA_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        
        <!-- Width B Dimension (Right Lobe) -->
        <line id="mountainLake-widthB-cap1" x1="${widthBLineX - 5}" y1="${widthB_y1}" x2="${widthBLineX + 5}" y2="${widthB_y1}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="mountainLake-widthB-line1" x1="${widthBLineX}" y1="${widthB_y1}" x2="${widthBLineX}" y2="${widthB_text_y - 20}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <text id="mountainLake-widthB-text" x="${widthBLineX}" y="${widthB_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${widthBLineX}, ${widthB_text_y})">Width B</text>
        <line id="mountainLake-widthB-line2" x1="${widthBLineX}" y1="${widthB_text_y + 20}" x2="${widthBLineX}" y2="${widthB_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="mountainLake-widthB-cap2" x1="${widthBLineX - 5}" y1="${widthB_y2}" x2="${widthBLineX + 5}" y2="${widthB_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        </svg>`;
    },
    roman: (dims = {}) => {
        const length = !isNaN(parseFloat(dims.length)) && parseFloat(dims.length) > 0 ? parseFloat(dims.length) : DEFAULT_ROMAN_INPUTS.length;
        const width = !isNaN(parseFloat(dims.width)) && parseFloat(dims.width) > 0 ? parseFloat(dims.width) : DEFAULT_ROMAN_INPUTS.width;
    
        const totalInputWidth = length + width;
        const totalInputHeight = width;
    
        // Define a drawing area for the shape itself, leaving space for dimension lines
        const maxShapeWidth = 180;
        const maxShapeHeight = 100;
    
        let scale = 1;
        if (totalInputWidth > 0 && totalInputHeight > 0) {
            const scaleX = maxShapeWidth / totalInputWidth;
            const scaleY = maxShapeHeight / totalInputHeight;
            scale = Math.min(scaleX, scaleY);
        }
    
        const s_total_w = totalInputWidth * scale;
        const s_h = totalInputHeight * scale;
        const s_l = length * scale;
    
        // Center the shape within the viewBox="0 0 220 155", accounting for dimension lines
        const viewboxWidth = 220;
        const viewboxHeight = 155;
        const verticalPaddingForLines = 25; // Extra space at the bottom for the length dimension line
    
        const baseX = (viewboxWidth - s_total_w) / 2;
        const baseY = (viewboxHeight - s_h - verticalPaddingForLines) / 2;
    
        // A rect with ry = height/2 will create the double-roman end shape
        const rect_ry = s_h / 2;
    
        return `
        <svg viewBox="0 0 220 155" xmlns="http://www.w3.org/2000/svg">
            <rect x="${baseX}" y="${baseY}" width="${s_total_w}" height="${s_h}" rx="${rect_ry}" ry="${rect_ry}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
            <rect x="${baseX + 4}" y="${baseY + 4}" width="${s_total_w - 8}" height="${s_h - 8}" rx="${rect_ry > 4 ? rect_ry - 4 : 0}" ry="${rect_ry > 4 ? rect_ry - 4 : 0}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>
    
            <!-- Dimension: Length (straight part) -->
            <line id="roman-length-cap1" x1="${baseX + s_h/2}" y1="${baseY + s_h + 5}" x2="${baseX + s_h/2}" y2="${baseY + s_h + 15}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="roman-length-line1" x1="${baseX + s_h/2}" y1="${baseY + s_h + 10}" x2="${baseX + s_h/2 + s_l/2 - 15}" y2="${baseY + s_h + 10}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <text id="roman-length-text" x="${baseX + s_h/2 + s_l/2}" y="${baseY + s_h + 10}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length</text>
            <line id="roman-length-line2" x1="${baseX + s_h/2 + s_l/2 + 15}" y1="${baseY + s_h + 10}" x2="${baseX + s_h/2 + s_l}" y2="${baseY + s_h + 10}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="roman-length-cap2" x1="${baseX + s_h/2 + s_l}" y1="${baseY + s_h + 5}" x2="${baseX + s_h/2 + s_l}" y2="${baseY + s_h + 15}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    
            <!-- Dimension: Width -->
            <line id="roman-width-cap1" x1="${baseX + s_total_w + 5}" y1="${baseY}" x2="${baseX + s_total_w + 15}" y2="${baseY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="roman-width-line1" x1="${baseX + s_total_w + 10}" y1="${baseY}" x2="${baseX + s_total_w + 10}" y2="${baseY + s_h/2 - 15}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <text id="roman-width-text" x="${baseX + s_total_w + 10}" y="${baseY + s_h/2}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(90, ${baseX + s_total_w + 10}, ${baseY + s_h/2})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Width</text>
            <line id="roman-width-line2" x1="${baseX + s_total_w + 10}" y1="${baseY + s_h/2 + 15}" x2="${baseX + s_total_w + 10}" y2="${baseY + s_h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="roman-width-cap2" x1="${baseX + s_total_w + 5}" y1="${baseY + s_h}" x2="${baseX + s_total_w + 15}" y2="${baseY + s_h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        </svg>`;
    },
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
    <!-- Top Rectangle (Section A based on Length A and Width A) -->
    <rect x="${r1x}" y="${r1y}" width="${r1w}" height="${r1h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <rect x="${r1x + INNER_L_RECT_PADDING}" y="${r1y + INNER_L_RECT_PADDING}" width="${inner_r1w}" height="${inner_r1h}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>
    
    <!-- Side Rectangle (Section B based on Length B and Width B) -->
    <rect x="${r2x}" y="${r2y}" width="${r2w}" height="${r2h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <rect x="${r2x + INNER_L_RECT_PADDING}" y="${r2y + INNER_L_RECT_PADDING}" width="${inner_r2w}" height="${inner_r2h}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>

    <!-- Dimension: Length A (overall width of top arm) -->
    <line id="trueL-lengthA-cap1" x1="${r1x}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${r1x}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthA-line1" x1="${r1x}" y1="${la_line_y}" x2="${Math.max(r1x, la_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-lengthA-text" x="${la_text_x}" y="${la_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length A</text>
    <line id="trueL-lengthA-line2" x1="${la_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${la_line_y}" x2="${r1x + r1w}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthA-cap2" x1="${r1x + r1w}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${r1x + r1w}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: Width A (height of top arm) -->
    <line id="trueL-widthA-cap1" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${r1y}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${r1y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-widthA-line1" x1="${wa_line_x}" y1="${r1y}" x2="${wa_line_x}" y2="${Math.max(r1y, wa_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-widthA-text" x="${wa_line_x}" y="${wa_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${wa_line_x}, ${wa_text_y})">Width A</text>
    <line id="trueL-widthA-line2" x1="${wa_line_x}" y1="${wa_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${wa_line_x}" y2="${r1y + r1h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-widthA-cap2" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${r1y + r1h}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${r1y + r1h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: Length B (height of side arm) -->
    <line id="trueL-lengthB-cap1" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${r2y}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${r2y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthB-line1" x1="${lb_line_x}" y1="${r2y}" x2="${lb_line_x}" y2="${Math.max(r2y, lb_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="trueL-lengthB-text" x="${lb_line_x}" y="${lb_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${lb_line_x}, ${lb_text_y})">Length B</text>
    <line id="trueL-lengthB-line2" x1="${lb_line_x}" y1="${lb_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${lb_line_x}" y2="${r2y + r2h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="trueL-lengthB-cap2" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${r2y + r2h}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${r2y + r2h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: Width B (width of side arm) -->
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
    
    <!-- Dimension: Length A -->
    <line id="lazyL-lengthA-cap1" x1="${baseX}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${baseX}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthA-line1" x1="${baseX}" y1="${la_line_y}" x2="${Math.max(baseX, la_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-lengthA-text" x="${la_text_x}" y="${la_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length A</text>
    <line id="lazyL-lengthA-line2" x1="${la_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${la_line_y}" x2="${baseX + lA_s}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthA-cap2" x1="${baseX + lA_s}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${baseX + lA_s}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: Width A -->
    <line id="lazyL-widthA-cap1" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${baseY}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${baseY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthA-line1" x1="${wa_line_x}" y1="${baseY}" x2="${wa_line_x}" y2="${Math.max(baseY, wa_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-widthA-text" x="${wa_line_x}" y="${wa_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${wa_line_x}, ${wa_text_y})">Width A</text>
    <line id="lazyL-widthA-line2" x1="${wa_line_x}" y1="${wa_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${wa_line_x}" y2="${baseY + wA_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthA-cap2" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${baseY + wA_s}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${baseY + wA_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: Length B (height of vertical part) -->
    <line id="lazyL-lengthB-cap1" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${baseY + wA_s}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${baseY + wA_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthB-line1" x1="${lb_line_x}" y1="${baseY + wA_s}" x2="${lb_line_x}" y2="${Math.max(baseY + wA_s, lb_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH)}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-lengthB-text" x="${lb_line_x}" y="${lb_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${lb_line_x}, ${lb_text_y})">Length B</text>
    <line id="lazyL-lengthB-line2" x1="${lb_line_x}" y1="${lb_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${lb_line_x}" y2="${baseY + wA_s + lB_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-lengthB-cap2" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${baseY + wA_s + lB_s}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${baseY + wA_s + lB_s}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    
    <!-- Dimension: Width B (width of vertical part) -->
    <line id="lazyL-widthB-cap1" x1="${baseX}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${baseX}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthB-line1" x1="${baseX}" y1="${wb_line_y}" x2="${Math.max(baseX, wb_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH)}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="lazyL-widthB-text" x="${wb_text_x}" y="${wb_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Width B</text>
    <line id="lazyL-widthB-line2" x1="${wb_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${wb_line_y}" x2="${baseX + wB_s}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="lazyL-widthB-cap2" x1="${baseX + wB_s}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${baseX + wB_s}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: Diagonal C -->
    <line id="lazyL-diagC-line" x1="${diagC_p1.x}" y1="${diagC_p1.y}" x2="${diagC_p2.x}" y2="${diagC_p2.y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <!-- Caps for DiagC line can be tricky due to 45deg angle. Simple line for now. -->
    <text id="lazyL-diagC-text" x="${diagC_text_x}" y="${diagC_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-45, ${diagC_text_x}, ${diagC_text_y})">Diag. C</text>
    </g> 
    </svg>`;
},
lazyL2: (rotation = 0, dims = {}, orientation = 'right') => {
    // Use provided dims or defaults. These represent the 6 perimeter sides.
    const L1 = !isNaN(parseFloat(dims.length1)) ? parseFloat(dims.length1) : DEFAULT_LAZYL2_INPUTS.length1; // Top Width
    const L2 = !isNaN(parseFloat(dims.width1)) ? parseFloat(dims.width1) : DEFAULT_LAZYL2_INPUTS.width1;   // Right Vertical Side
    const L3 = !isNaN(parseFloat(dims.length2)) ? parseFloat(dims.length2) : DEFAULT_LAZYL2_INPUTS.length2; // Right Angled Side
    const L4 = !isNaN(parseFloat(dims.width2)) ? parseFloat(dims.width2) : DEFAULT_LAZYL2_INPUTS.width2;   // Bottom Width
    const L5 = !isNaN(parseFloat(dims.length3)) ? parseFloat(dims.length3) : DEFAULT_LAZYL2_INPUTS.length3; // Left Angled Side
    const L6 = !isNaN(parseFloat(dims.length4)) ? parseFloat(dims.length4) : DEFAULT_LAZYL2_INPUTS.length4; // Left Vertical Side

    // --- Geometric Calculation ---
    // We solve a system of equations to find the coordinates of the vertices based on the 6 side lengths.
    // The shape is a hexagon with a horizontal top and vertical sides, and an angled bottom section.
    // Let the construction parameters be:
    // W: Overall width, H: Overall height
    // dx_left, dy_left: horizontal and vertical projection of the left angled side
    // dx_right, dy_right: horizontal and vertical projection of the right angled side

    let W = L1;
    let dx_left = 0, dy_left = 0, dx_right = 0, dy_right = 0, H = 0;

    // From the geometry, we derive a system of linear and quadratic equations.
    // (1) dx_left + dx_right = L1 - L4
    // (2) dy_left - dy_right = L2 - L6
    // (3) dx_left^2 + dy_left^2 = L5^2
    // (4) dx_right^2 + dy_right^2 = L3^2
    // We solve for dx_left, dy_left, dx_right, dy_right.

    const A = L1 - L4;
    const B = L2 - L6;
    const C = A * A + B * B + L5 * L5 - L3 * L3;

    // The system simplifies to the intersection of a line and a circle:
    // 2*A*dx_left + 2*B*dy_left = C
    // dx_left^2 + dy_left^2 = L5^2
    
    let validGeometry = true;
    if (Math.abs(A) > 1e-6) { // Standard case, solve quadratic for dy_left
        const qa = 4 * (A * A + B * B);
        const qb = -4 * B * C;
        const qc = C * C - 4 * A * A * L5 * L5;
        const discriminant = qb * qb - 4 * qa * qc;

        if (discriminant >= 0) {
            // We choose the positive root for dy_left for a convex pool shape.
            dy_left = (-qb + Math.sqrt(discriminant)) / (2 * qa);
            dx_left = (C - 2 * B * dy_left) / (2 * A);
        } else { validGeometry = false; }
    } else { // Special case: A is zero (L1=L4), the line is horizontal
        dy_left = C / (2 * B);
        const dx_left_sq = L5 * L5 - dy_left * dy_left;
        if (dx_left_sq >= 0) {
            dx_left = Math.sqrt(dx_left_sq);
        } else { validGeometry = false; }
    }

    if (dx_left < 0 || dy_left < 0) validGeometry = false;

    if (validGeometry) {
        dx_right = A - dx_left;
        dy_right = dy_left - B;
        if (dx_right < 0 || dy_right < 0) validGeometry = false;
    }
    
    if (validGeometry) {
        H = L6 + dy_left;
    } else {
        // Fallback to default proportions if inputs are not geometrically possible
        W = L1; H = L6 + L2; // Approximation
        dx_left = W / 4; dy_left = W / 4;
        dx_right = W / 4; dy_right = W / 4;
    }

    // --- SVG Drawing ---
    const all_dims = [W, H, dx_left, dy_left, dx_right, dy_right];
    const scale = Math.min(MAX_SVG_L_EXTENT_WIDTH / W, MAX_SVG_L_EXTENT_HEIGHT / H);
    const s = { W: W*scale, H: H*scale, dx_l: dx_left*scale, dy_l: dy_left*scale, dx_r: dx_right*scale, dy_r: dy_right*scale };

    const baseX = SVG_L_BASE_X;
    const baseY = SVG_L_BASE_Y;

    // Define the 6 vertices of the hexagon, starting from top-left and going clockwise.
    const p = [
        { x: baseX, y: baseY + s.H }, // P0: Top-left
        { x: baseX + s.W, y: baseY + s.H }, // P1: Top-right
        { x: baseX + s.W, y: baseY + s.dy_r }, // P2: Bottom of right vertical edge
        { x: baseX + s.W - s.dx_r, y: baseY }, // P3: Bottom-right corner
        { x: baseX + s.dx_l, y: baseY }, // P4: Bottom-left corner
        { x: baseX, y: baseY + s.dy_l }  // P5: Bottom of left vertical edge
    ];

    // Flip horizontally for "left" orientation
    if (orientation === 'left') {
        p.forEach(pt => { pt.x = baseX + s.W - (pt.x - baseX); });
    }

    const pathData = `M ${p[0].x},${p[0].y} L ${p[1].x},${p[1].y} L ${p[2].x},${p[2].y} L ${p[3].x},${p[3].y} L ${p[4].x},${p[4].y} L ${p[5].x},${p[5].y} Z`;
    const rotationCenterX = baseX + s.W / 2;
    const rotationCenterY = baseY + s.H / 2;

    return `
    <svg viewBox="-10 -10 240 210" xmlns="http://www.w3.org/2000/svg">
        <g id="lazyL2-group" transform="rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})">
            <path d="${pathData}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
            <path d="${pathData}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1" transform="scale(0.92, 0.92)" transform-origin="${rotationCenterX} ${rotationCenterY}"/>
    ${!validGeometry ? `<text x="${rotationCenterX}" y="${rotationCenterY}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="red">Invalid Dimensions</text>` : ''}
    <!-- Dimension Labels (simplified for clarity) -->
    <text id="lazyL2-length1-text" x="${baseX + s.W / 2}" y="${baseY + s.H + 15}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Top Width</text>
    <text id="lazyL2-width2-text" x="${baseX + s.dx_l + (s.W - s.dx_l - s.dx_r)/2}" y="${baseY - 10}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Bottom Width</text>
    <text id="lazyL2-length4-text" x="${baseX - 15}" y="${baseY + s.dy_l + (s.H - s.dy_l)/2}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(-90, ${baseX-15}, ${baseY + s.dy_l + (s.H - s.dy_l)/2})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Left Side</text>
    <text id="lazyL2-width1-text" x="${baseX + s.W + 15}" y="${baseY + s.dy_r + (s.H - s.dy_r)/2}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(90, ${baseX + s.W + 15}, ${baseY + s.dy_r + (s.H - s.dy_r)/2})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Right Side</text>
    
    <!-- Dimension Label for Left Angled Side (B / length3) -->
    <text id="lazyL2-length3-text" x="${(p[4].x + p[5].x) / 2 - 15}" y="${(p[4].y + p[5].y) / 2 + 5}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Left Angled</text>

    <!-- Dimension Label for Right Angled Side (C / length2) -->
    <text id="lazyL2-length2-text" x="${(p[2].x + p[3].x) / 2 + 15}" y="${(p[2].y + p[3].y) / 2 + 5}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Right Angled</text>
    </g>
    </svg>`;
},
doubleGrecian: (dims = {}) => {
    const L = !isNaN(parseFloat(dims.overallLength)) ? parseFloat(dims.overallLength) : DEFAULT_DOUBLE_GRECIAN_INPUTS.overallLength;
    const W = !isNaN(parseFloat(dims.overallWidth)) ? parseFloat(dims.overallWidth) : DEFAULT_DOUBLE_GRECIAN_INPUTS.overallWidth;
    const EW = !isNaN(parseFloat(dims.endWidth)) ? parseFloat(dims.endWidth) : DEFAULT_DOUBLE_GRECIAN_INPUTS.endWidth;

    // Define a drawing area for the shape itself
    const maxShapeWidth = 220;
    const maxShapeHeight = 140;

    let scale = 1;
    if (L > 0 && W > 0) {
    const scaleX = maxShapeWidth / L;
    const scaleY = maxShapeHeight / W;
    scale = Math.min(scaleX, scaleY);
    }

    const sL = L * scale;
    const sW = W * scale;

    // Assuming 45-degree angles for the cuts
    const s_dy = ((W - EW) / 2) * scale;
    const s_dx = s_dy; // 45-degree angle

    // Center the shape within the viewBox="0 0 260 180"
    const viewboxWidth = 260;
    const viewboxHeight = 180;
    
    const baseX = (viewboxWidth - sL) / 2;
    const baseY = (viewboxHeight - sW) / 2;

    // Define the 8 vertices of the octagon, starting from the bottom-left inside corner and going clockwise.
    // Note: Y-coordinate 0 is at the top of the SVG.
    const p = [
        { x: baseX + s_dx,      y: baseY + sW },       // P0: Bottom-left inside corner
        { x: baseX + sL - s_dx,  y: baseY + sW },       // P1: Bottom-right inside corner
        { x: baseX + sL,        y: baseY + sW - s_dy }, // P2: Right-bottom outside corner
        { x: baseX + sL,        y: baseY + s_dy },      // P3: Right-top outside corner
        { x: baseX + sL - s_dx,  y: baseY },           // P4: Top-right inside corner
        { x: baseX + s_dx,      y: baseY },           // P5: Top-left inside corner
        { x: baseX,             y: baseY + s_dy },      // P6: Left-top outside corner
        { x: baseX,             y: baseY + sW - s_dy }  // P7: Left-bottom outside corner
    ];

    const pathData = `M ${p[0].x},${p[0].y} L ${p[1].x},${p[1].y} L ${p[2].x},${p[2].y} L ${p[3].x},${p[3].y} L ${p[4].x},${p[4].y} L ${p[5].x},${p[5].y} L ${p[6].x},${p[6].y} L ${p[7].x},${p[7].y} Z`;

    // --- Define positions for dimension lines and text ---
    const textGapHorizontal = 30;
    const textGapVertical = 25;

    // Overall Length (bottom)
    const lenLineY = baseY + sW + 15;
    const lenCapY1 = lenLineY - 5;
    const lenCapY2 = lenLineY + 5;
    const lenTextX = baseX + sL / 2;

    // Overall Width (right)
    const widthLineX = baseX + sL + 15;
    const widthCapX1 = widthLineX - 5;
    const widthCapX2 = widthLineX + 5;
    const widthTextY = baseY + sW / 2;

    // End Width (left)
    const endWidthLineX = baseX - 15;
    const endWidthCapX1 = endWidthLineX - 5;
    const endWidthCapX2 = endWidthLineX + 5;
    const endWidthTextY = baseY + sW / 2;
    const endWidthY1 = p[6].y; // Y-coord of left-top corner
    const endWidthY2 = p[7].y; // Y-coord of left-bottom corner

    return `
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
    <path d="${pathData}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
    <path d="${pathData}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1" transform="scale(0.95, 0.95)" transform-origin="${baseX + sL/2} ${baseY + sW/2}"/>

    <!-- Dimension: Overall Length -->
    <line id="doubleGrecian-overallLength-cap1" x1="${baseX}" y1="${lenCapY1}" x2="${baseX}" y2="${lenCapY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="doubleGrecian-overallLength-line1" x1="${baseX}" y1="${lenLineY}" x2="${lenTextX - textGapHorizontal}" y2="${lenLineY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="doubleGrecian-overallLength-text" x="${lenTextX}" y="${lenLineY}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Overall Length</text>
    <line id="doubleGrecian-overallLength-line2" x1="${lenTextX + textGapHorizontal}" y1="${lenLineY}" x2="${baseX + sL}" y2="${lenLineY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="doubleGrecian-overallLength-cap2" x1="${baseX + sL}" y1="${lenCapY1}" x2="${baseX + sL}" y2="${lenCapY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    
    <!-- Dimension: Overall Width -->
    <line id="doubleGrecian-overallWidth-cap1" x1="${widthCapX1}" y1="${baseY}" x2="${widthCapX2}" y2="${baseY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="doubleGrecian-overallWidth-line1" x1="${widthLineX}" y1="${baseY}" x2="${widthLineX}" y2="${widthTextY - textGapVertical}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="doubleGrecian-overallWidth-text" x="${widthLineX}" y="${widthTextY}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(90, ${widthLineX}, ${widthTextY})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Overall Width</text>
    <line id="doubleGrecian-overallWidth-line2" x1="${widthLineX}" y1="${widthTextY + textGapVertical}" x2="${widthLineX}" y2="${baseY + sW}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="doubleGrecian-overallWidth-cap2" x1="${widthCapX1}" y1="${baseY + sW}" x2="${widthCapX2}" y2="${baseY + sW}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

    <!-- Dimension: End Width -->
    <line id="doubleGrecian-endWidth-cap1" x1="${endWidthCapX1}" y1="${endWidthY1}" x2="${endWidthCapX2}" y2="${endWidthY1}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="doubleGrecian-endWidth-line1" x1="${endWidthLineX}" y1="${endWidthY1}" x2="${endWidthLineX}" y2="${endWidthTextY - textGapVertical}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <text id="doubleGrecian-endWidth-text" x="${endWidthLineX}" y="${endWidthTextY}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(-90, ${endWidthLineX}, ${endWidthTextY})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">End Width</text>
    <line id="doubleGrecian-endWidth-line2" x1="${endWidthLineX}" y1="${endWidthTextY + textGapVertical}" x2="${endWidthLineX}" y2="${endWidthY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    <line id="doubleGrecian-endWidth-cap2" x1="${endWidthCapX1}" y1="${endWidthY2}" x2="${endWidthCapX2}" y2="${endWidthY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`;
},
customFreeform: (dims = {}) => {
    const L = !isNaN(parseFloat(dims.length)) ? parseFloat(dims.length) : DEFAULT_CUSTOM_FREEFORM_INPUTS.length;
    // Ensure widths are valid numbers and filter out any zeros.
    const widths = Array.isArray(dims.widths) && dims.widths.length > 0 ? dims.widths.map(w => parseFloat(w) || 0).filter(w => w > 0) : DEFAULT_CUSTOM_FREEFORM_INPUTS.widths;

    // If there are no valid widths, return an empty diagram to prevent errors.
    if (widths.length === 0) {
        return `<svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg"></svg>`;
    }

    const maxShapeWidth = 220;
    const maxShapeHeight = 140;

    const maxDimWidth = Math.max(...widths, 0);
    let scale = 1;
    if (L > 0 && maxDimWidth > 0) {
        const scaleX = maxShapeWidth / L;
        const scaleY = maxShapeHeight / maxDimWidth;
        scale = Math.min(scaleX, scaleY);
    }

    const sL = L * scale;
    const scaledWidths = widths.map(w => w * scale);
    const sMaxW = Math.max(...scaledWidths, 0);

    const viewboxWidth = 260;
    const viewboxHeight = 180;
    const baseX = (viewboxWidth - sL) / 2;
    const baseY = (viewboxHeight - sMaxW) / 2;

    const numSegments = scaledWidths.length + 1;
    const topPoints = scaledWidths.map((w, i) => ({ x: baseX + (sL * (i + 1)) / numSegments, y: baseY + (sMaxW - w) / 2 }));
    const bottomPoints = scaledWidths.map((w, i) => ({ x: baseX + (sL * (i + 1)) / numSegments, y: baseY + (sMaxW + w) / 2 }));

    // Create a smooth path with rounded ends using arcs.
    const pathData =
        `M ${topPoints[0].x},${topPoints[0].y}` + // Start at the first top point
        // Create a smooth curve through the subsequent top points
        topPoints.slice(1).map((p, i) => {
            const p_prev = topPoints[i];
            const midPointX = (p_prev.x + p.x) / 2;
            return ` C ${midPointX},${p_prev.y}, ${midPointX},${p.y}, ${p.x},${p.y}`;
        }).join('') +
        // Draw the rounded right end of the pool
        ` A ${scaledWidths[scaledWidths.length - 1] / 2},${scaledWidths[scaledWidths.length - 1] / 2} 0 0 1 ${bottomPoints[bottomPoints.length - 1].x},${bottomPoints[bottomPoints.length - 1].y}` +
        // Create a smooth curve through the bottom points (in reverse order)
        [...bottomPoints].reverse().slice(1).map((p, i) => {
            const p_prev = [...bottomPoints].reverse()[i];
            const midPointX = (p_prev.x + p.x) / 2;
            return ` C ${midPointX},${p_prev.y}, ${midPointX},${p.y}, ${p.x},${p.y}`;
        }).join('') +
        // Draw the rounded left end of the pool, closing the path
        ` A ${scaledWidths[0] / 2},${scaledWidths[0] / 2} 0 0 1 ${topPoints[0].x},${topPoints[0].y}` +
        ` Z`;

    // --- Dimension lines ---
    let widthLines = '';
    scaledWidths.forEach((sw, i) => {
        const x = baseX + (sL * (i + 1)) / numSegments;
        const y1 = baseY + (sMaxW - sw) / 2;
        const y2 = baseY + (sMaxW + sw) / 2;
        widthLines += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5" stroke-dasharray="2,2"/>`;
        widthLines += `<text id="customFreeform-width${i+1}-text" x="${x}" y="${y1 - 5}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">W${i+1}</text>`;
    });

    const lenLineY = baseY + sMaxW + 25;
    const lenCapY1 = lenLineY - 5;
    const lenCapY2 = lenLineY + 5;
    const lenTextX = baseX + sL / 2;
    const textGapHorizontal = 30;

    return `
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
        <path d="${pathData}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
        <path d="${pathData}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1" transform="scale(0.95, 0.95)" transform-origin="center"/>
        
        <!-- Width Dimension Lines -->
        ${widthLines}

        <!-- Dimension: Overall Length -->
        <line id="customFreeform-length-cap1" x1="${baseX}" y1="${lenCapY1}" x2="${baseX}" y2="${lenCapY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="customFreeform-length-line1" x1="${baseX}" y1="${lenLineY}" x2="${lenTextX - textGapHorizontal}" y2="${lenLineY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <text id="customFreeform-length-text" x="${lenTextX}" y="${lenLineY}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Overall Length</text>
        <line id="customFreeform-length-line2" x1="${lenTextX + textGapHorizontal}" y1="${lenLineY}" x2="${baseX + sL}" y2="${lenLineY}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="customFreeform-length-cap2" x1="${baseX + sL}" y1="${lenCapY1}" x2="${baseX + sL}" y2="${lenCapY2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`;
},
offsetRectangle: (rotation = 0, dims = {}) => {
    // Using similar dimension names as TrueL/T-Shape
    const L_A = !isNaN(parseFloat(dims.lenA)) ? parseFloat(dims.lenA) : DEFAULT_OFFSET_RECT_INPUTS.lenA; // Main rect length
    const W_A = !isNaN(parseFloat(dims.widA)) ? parseFloat(dims.widA) : DEFAULT_OFFSET_RECT_INPUTS.widA; // Main rect width
    const L_B = !isNaN(parseFloat(dims.lenB)) ? parseFloat(dims.lenB) : DEFAULT_OFFSET_RECT_INPUTS.lenB; // Offset rect length
    const W_B = !isNaN(parseFloat(dims.widB)) ? parseFloat(dims.widB) : DEFAULT_OFFSET_RECT_INPUTS.widB; // Offset rect width
    const O_X = !isNaN(parseFloat(dims.offsetX)) ? parseFloat(dims.offsetX) : DEFAULT_OFFSET_RECT_INPUTS.offsetX; // Horizontal offset

    // Overall dimensions for scaling
    const totalInputWidthSpan = L_A;
    const totalInputHeightSpan = W_A + L_B;

    const scale = Math.min(MAX_SVG_L_EXTENT_WIDTH / totalInputWidthSpan, MAX_SVG_L_EXTENT_HEIGHT / totalInputHeightSpan);

    // Scaled dimensions
    const r1w = L_A * scale; // Main rect
    const r1h = W_A * scale;
    const r2w = W_B * scale; // Offset rect
    const r2h = L_B * scale;
    const r2offsetX = O_X * scale;

    // Positioning
    const r1x = SVG_L_BASE_X;
    const r1y = SVG_L_BASE_Y;
    const r2x = r1x + r2offsetX;
    const r2y = r1y + r1h;

    const rotationCenterX = SVG_L_BASE_X + r1w / 2;
    const rotationCenterY = SVG_L_BASE_Y + (r1h + r2h) / 2;

    return `
    <svg viewBox="-10 -10 240 210" xmlns="http://www.w3.org/2000/svg">
        <g id="offsetRectangle-group" transform="rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})">
            <!-- Main Rectangle (A) -->
            <rect x="${r1x}" y="${r1y}" width="${r1w}" height="${r1h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
            <!-- Offset Rectangle (B) -->
            <rect x="${r2x}" y="${r2y}" width="${r2w}" height="${r2h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>

            <!-- Dimension: Length A (Main Length) -->
            <text id="offsetRectangle-lengthA-text" x="${r1x + r1w / 2}" y="${r1y - 10}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length A</text>
            <!-- Dimension: Width A (Main Width) -->
            <text id="offsetRectangle-widthA-text" x="${r1x + r1w + 10}" y="${r1y + r1h / 2}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(90, ${r1x + r1w + 10}, ${r1y + r1h / 2})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Width A</text>
            <!-- Dimension: Length B (Offset Length) -->
            <text id="offsetRectangle-lengthB-text" x="${r2x - 10}" y="${r2y + r2h / 2}" font-family="sans-serif" font-size="10" text-anchor="middle" transform="rotate(-90, ${r2x - 10}, ${r2y + r2h / 2})" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length B</text>
            <!-- Dimension: Width B (Offset Width) -->
            <text id="offsetRectangle-widthB-text" x="${r2x + r2w / 2}" y="${r2y + r2h + 10}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Width B</text>
            <!-- Dimension: Offset X -->
            <line x1="${r1x}" y1="${r1y + r1h + 5}" x2="${r2x}" y2="${r1y + r1h + 5}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1" stroke-dasharray="2,2"/>
            <text id="offsetRectangle-offsetX-text" x="${r1x + r2offsetX / 2}" y="${r1y + r1h + 15}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Offset X</text>
        </g>
    </svg>`;
},
figure8: (dims = {}) => {
    const dA = !isNaN(parseFloat(dims.diameterA)) ? parseFloat(dims.diameterA) : DEFAULT_FIGURE8_INPUTS.diameterA;
    const dB = !isNaN(parseFloat(dims.diameterB)) ? parseFloat(dims.diameterB) : DEFAULT_FIGURE8_INPUTS.diameterB;

    const maxShapeWidth = 220;
    const maxShapeHeight = 140;

    // Define overlap as a fraction of the smaller diameter
    const overlapFactor = 0.4;
    const overlap = overlapFactor * Math.min(dA, dB);

    const totalInputWidth = dA + dB - overlap;
    const totalInputHeight = Math.max(dA, dB);

    let scale = 1;
    if (totalInputWidth > 0 && totalInputHeight > 0) {
        const scaleX = maxShapeWidth / totalInputWidth;
        const scaleY = maxShapeHeight / totalInputHeight;
        scale = Math.min(scaleX, scaleY);
    }

    const s_dA = dA * scale;
    const s_dB = dB * scale;
    const s_rA = s_dA / 2;
    const s_rB = s_dB / 2;
    const s_overlap = overlap * scale;

    const s_total_w = s_dA + s_dB - s_overlap;
    const s_total_h = Math.max(s_dA, s_dB);

    const viewboxWidth = 260;
    const viewboxHeight = 180;

    const baseX = (viewboxWidth - s_total_w) / 2;
    const baseY = (viewboxHeight - s_total_h) / 2;

    const cx_A = baseX + s_rA;
    const cy_A = baseY + s_total_h / 2;
    const cx_B = baseX + s_dA - s_overlap + s_rB;
    const cy_B = baseY + s_total_h / 2;

    // Dimension lines
    const textGap = 20;
    // Diameter A (top)
    const diaA_line_y = baseY - 15;
    const diaA_cap_y1 = diaA_line_y - 5;
    const diaA_cap_y2 = diaA_line_y + 5;
    const diaA_text_x = cx_A;

    // Diameter B (bottom)
    const diaB_line_y = baseY + s_total_h + 15;
    const diaB_cap_y1 = diaB_line_y - 5;
    const diaB_cap_y2 = diaB_line_y + 5;
    const diaB_text_x = cx_B;

    return `
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <mask id="figure8-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                <circle cx="${cx_B}" cy="${cy_B}" r="${s_rB}" fill="black"/>
            </mask>
        </defs>
        <circle cx="${cx_A}" cy="${cy_A}" r="${s_rA}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2" mask="url(#figure8-mask)"/>
        <circle cx="${cx_B}" cy="${cy_B}" r="${s_rB}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
        
        <!-- Inner shape -->
        <circle cx="${cx_A}" cy="${cy_A}" r="${s_rA * 0.9}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1" mask="url(#figure8-mask)"/>
        <circle cx="${cx_B}" cy="${cy_B}" r="${s_rB * 0.9}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>

        <!-- Dimension: Diameter A -->
        <line id="figure8-diameterA-cap1" x1="${baseX}" y1="${diaA_cap_y1}" x2="${baseX}" y2="${diaA_cap_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="figure8-diameterA-line1" x1="${baseX}" y1="${diaA_line_y}" x2="${diaA_text_x - textGap}" y2="${diaA_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <text id="figure8-diameterA-text" x="${diaA_text_x}" y="${diaA_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Diameter A</text>
        <line id="figure8-diameterA-line2" x1="${diaA_text_x + textGap}" y1="${diaA_line_y}" x2="${baseX + s_dA}" y2="${diaA_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="figure8-diameterA-cap2" x1="${baseX + s_dA}" y1="${diaA_cap_y1}" x2="${baseX + s_dA}" y2="${diaA_cap_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

        <!-- Dimension: Diameter B -->
        <line id="figure8-diameterB-cap1" x1="${baseX + s_dA - s_overlap}" y1="${diaB_cap_y1}" x2="${baseX + s_dA - s_overlap}" y2="${diaB_cap_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="figure8-diameterB-line1" x1="${baseX + s_dA - s_overlap}" y1="${diaB_line_y}" x2="${diaB_text_x - textGap}" y2="${diaB_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <text id="figure8-diameterB-text" x="${diaB_text_x}" y="${diaB_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Diameter B</text>
        <line id="figure8-diameterB-line2" x1="${diaB_text_x + textGap}" y1="${diaB_line_y}" x2="${baseX + s_total_w}" y2="${diaB_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        <line id="figure8-diameterB-cap2" x1="${baseX + s_total_w}" y1="${diaB_cap_y1}" x2="${baseX + s_total_w}" y2="${diaB_cap_y2}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
    </svg>`;
    },
tShape: (rotation = 0, dims = {}) => {
    // Using same dimension names as TrueL for simplicity (lenA, widA, lenB, widB)
    const L_A = !isNaN(parseFloat(dims.lenA)) && parseFloat(dims.lenA) > 0 ? parseFloat(dims.lenA) : DEFAULT_L_SHAPE_INPUTS.lenA; // Top bar length
    const W_A = !isNaN(parseFloat(dims.widA)) && parseFloat(dims.widA) > 0 ? parseFloat(dims.widA) : DEFAULT_L_SHAPE_INPUTS.widA; // Top bar width
    const L_B = !isNaN(parseFloat(dims.lenB)) && parseFloat(dims.lenB) > 0 ? parseFloat(dims.lenB) : DEFAULT_L_SHAPE_INPUTS.lenB; // Stem length
    const W_B = !isNaN(parseFloat(dims.widB)) && parseFloat(dims.widB) > 0 ? parseFloat(dims.widB) : DEFAULT_L_SHAPE_INPUTS.widB; // Stem width

    // Overall dimensions for scaling
    const totalInputWidthSpan = L_A;
    const totalInputHeightSpan = W_A + L_B;

    let scale = 1;
    if (totalInputWidthSpan > 0 && totalInputHeightSpan > 0) {
        const scaleX = MAX_SVG_L_EXTENT_WIDTH / totalInputWidthSpan;
        const scaleY = MAX_SVG_L_EXTENT_HEIGHT / totalInputHeightSpan;
        scale = Math.min(scaleX, scaleY);
    }

    // Scaled dimensions
    const r1w = L_A * scale; // Top bar
    const r1h = W_A * scale;
    const r2w = W_B * scale; // Stem
    const r2h = L_B * scale;

    // Positioning
    const r1x = SVG_L_BASE_X;
    const r1y = SVG_L_BASE_Y;
    // Center the stem horizontally on the top bar
    const r2x = r1x + (r1w / 2) - (r2w / 2);
    const r2y = r1y + r1h;

    // Inner decorative rectangles
    const inner_r1w = Math.max(0, r1w - 2 * INNER_L_RECT_PADDING);
    const inner_r1h = Math.max(0, r1h - 2 * INNER_L_RECT_PADDING);
    const inner_r2w = Math.max(0, r2w - 2 * INNER_L_RECT_PADDING);
    const inner_r2h = Math.max(0, r2h - 2 * INNER_L_RECT_PADDING);

    // Dimension line positions
    const la_line_y = r1y - DIM_L_LINE_OFFSET;
    const la_text_x = r1x + r1w / 2;
    const wa_line_x = r1x + r1w + DIM_L_LINE_OFFSET;
    const wa_text_y = r1y + r1h / 2;
    const lb_line_x = r2x - DIM_L_LINE_OFFSET;
    const lb_text_y = r2y + r2h / 2;
    const wb_line_y = r2y + r2h + DIM_L_LINE_OFFSET;
    const wb_text_x = r2x + r2w / 2;

    const rotationCenterX = SVG_L_BASE_X + totalInputWidthSpan * scale / 2;
    const rotationCenterY = SVG_L_BASE_Y + totalInputHeightSpan * scale / 2;

    return `
    <svg viewBox="-10 -10 240 210" xmlns="http://www.w3.org/2000/svg">
        <g id="tShape-group" transform="rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})">
            <!-- Top Bar Rectangle (Section A) -->
            <rect x="${r1x}" y="${r1y}" width="${r1w}" height="${r1h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
            <rect x="${r1x + INNER_L_RECT_PADDING}" y="${r1y + INNER_L_RECT_PADDING}" width="${inner_r1w}" height="${inner_r1h}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>

            <!-- Stem Rectangle (Section B) -->
            <rect x="${r2x}" y="${r2y}" width="${r2w}" height="${r2h}" fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>
            <rect x="${r2x + INNER_L_RECT_PADDING}" y="${r2y + INNER_L_RECT_PADDING}" width="${inner_r2w}" height="${inner_r2h}" fill="#22d3ee" stroke="#06b6d4" stroke-width="1"/>

            <!-- Dimension: Length A (Top Bar Length) -->
            <line id="tShape-lengthA-cap1" x1="${r1x}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${r1x}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-lengthA-line1" x1="${r1x}" y1="${la_line_y}" x2="${la_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <text id="tShape-lengthA-text" x="${la_text_x}" y="${la_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Top Bar Length</text>
            <line id="tShape-lengthA-line2" x1="${la_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${la_line_y}" x2="${r1x + r1w}" y2="${la_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-lengthA-cap2" x1="${r1x + r1w}" y1="${la_line_y - DIM_L_CAP_SIZE}" x2="${r1x + r1w}" y2="${la_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

            <!-- Dimension: Width A (Top Bar Width) -->
            <line id="tShape-widthA-cap1" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${r1y}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${r1y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-widthA-line1" x1="${wa_line_x}" y1="${r1y}" x2="${wa_line_x}" y2="${wa_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <text id="tShape-widthA-text" x="${wa_line_x}" y="${wa_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(90, ${wa_line_x}, ${wa_text_y})">Top Bar Width</text>
            <line id="tShape-widthA-line2" x1="${wa_line_x}" y1="${wa_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${wa_line_x}" y2="${r1y + r1h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-widthA-cap2" x1="${wa_line_x - DIM_L_CAP_SIZE}" y1="${r1y + r1h}" x2="${wa_line_x + DIM_L_CAP_SIZE}" y2="${r1y + r1h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

            <!-- Dimension: Length B (Stem Length) -->
            <line id="tShape-lengthB-cap1" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${r2y}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${r2y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-lengthB-line1" x1="${lb_line_x}" y1="${r2y}" x2="${lb_line_x}" y2="${lb_text_y - DIM_L_TEXT_APPROX_HALF_WIDTH}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <text id="tShape-lengthB-text" x="${lb_line_x}" y="${lb_text_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, ${lb_line_x}, ${lb_text_y})">Stem Length</text>
            <line id="tShape-lengthB-line2" x1="${lb_line_x}" y1="${lb_text_y + DIM_L_TEXT_APPROX_HALF_WIDTH}" x2="${lb_line_x}" y2="${r2y + r2h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-lengthB-cap2" x1="${lb_line_x - DIM_L_CAP_SIZE}" y1="${r2y + r2h}" x2="${lb_line_x + DIM_L_CAP_SIZE}" y2="${r2y + r2h}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

            <!-- Dimension: Width B (Stem Width) -->
            <line id="tShape-widthB-cap1" x1="${r2x}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${r2x}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-widthB-line1" x1="${r2x}" y1="${wb_line_y}" x2="${wb_text_x - DIM_L_TEXT_APPROX_HALF_WIDTH}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <text id="tShape-widthB-text" x="${wb_text_x}" y="${wb_line_y}" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Stem Width</text>
            <line id="tShape-widthB-line2" x1="${wb_text_x + DIM_L_TEXT_APPROX_HALF_WIDTH}" y1="${wb_line_y}" x2="${r2x + r2w}" y2="${wb_line_y}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
            <line id="tShape-widthB-cap2" x1="${r2x + r2w}" y1="${wb_line_y - DIM_L_CAP_SIZE}" x2="${r2x + r2w}" y2="${wb_line_y + DIM_L_CAP_SIZE}" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
        </g>
    </svg>`;
},
kidney: `
<svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
<!-- Kidney shape path -->
<path d="M65,130 C30,110 35,40 100,35 C165,30 210,60 210,90 C210,120 170,140 140,135 C110,130 100,120 65,130Z" 
fill="#a5f3fc" stroke="#0284c7" stroke-width="2"/>

<!-- Overall Length Dimension (L) -->
<line id="kidney-length-cap1" x1="50" y1="155" x2="50" y2="165" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="kidney-length-line1" x1="50" y1="160" x2="120" y2="160" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="kidney-length-text" x="130" y="160" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}">Length</text>
<line id="kidney-length-line2" x1="140" y1="160" x2="210" y2="160" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="kidney-length-cap2" x1="210" y1="155" x2="210" y2="165" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

<!-- --- Width A Dimension (Corrected) --- -->
<!-- Dashed lines to indicate measurement points -->
<line x1="45" y1="40" x2="80" y2="40" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1" stroke-dasharray="2,2"/>
<line x1="65" y1="125" x2="80" y2="125" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1" stroke-dasharray="2,2"/>
<!-- Vertical dimension line inside the shape -->
<line id="kidney-widthA-cap1" x1="75" y1="40" x2="85" y2="40" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<line id="kidney-widthA-line1" x1="80" y1="40" x2="80" y2="70" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="kidney-widthA-text" x="80" y="82.5" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, 80, 82.5)">Width A</text>
<line id="kidney-widthA-line2" x1="80" y1="95" x2="80" y2="125" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/> 
<line id="kidney-widthA-cap2" x1="75" y1="125" x2="85" y2="125" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>

<!-- --- Width B Dimension (Corrected) --- -->
<!-- Dashed lines to indicate measurement points -->
<line x1="180" y1="55" x2="205" y2="55" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1" stroke-dasharray="2,2"/>
<line x1="180" y1="135" x2="195" y2="135" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1" stroke-dasharray="2,2"/>
<!-- Vertical dimension line inside the shape -->
<line id="kidney-widthB-cap1" x1="175" y1="55" x2="185" y2="55" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/> 
<line id="kidney-widthB-line1" x1="180" y1="55" x2="180" y2="85" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
<text id="kidney-widthB-text" x="180" y="95" font-family="sans-serif" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${DIAGRAM_TEXT_COLOR_NORMAL}" transform="rotate(-90, 180, 95)">Width B</text>
<line id="kidney-widthB-line2" x1="180" y1="105" x2="180" y2="135" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/> 
<line id="kidney-widthB-cap2" x1="175" y1="135" x2="185" y2="135" stroke="${DIAGRAM_LINE_COLOR_NORMAL}" stroke-width="1.5"/>
</svg>`
}

    
    function collectRomanDimensions() {
        return {
            length: document.getElementById('length')?.value,
            width: document.getElementById('width')?.value
        };
    }

    function collectFigure8Dimensions() {
        return {
            diameterA: document.getElementById('diameterA')?.value,
            diameterB: document.getElementById('diameterB')?.value
        };
    }

    function collectDoubleGrecianDimensions() {
        return {
            overallLength: document.getElementById('overallLength')?.value,
            overallWidth: document.getElementById('overallWidth')?.value,
            endWidth: document.getElementById('endWidth')?.value
        };
    }

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
    function collectOffsetRectangleDimensions() {
        return {
            lenA: document.getElementById('lengthA')?.value,
            widA: document.getElementById('widthA')?.value,
            lenB: document.getElementById('lengthB')?.value,
            widB: document.getElementById('widthB')?.value,
            offsetX: document.getElementById('offsetX')?.value
        };
    }
    function collectLazyL2Dimensions() {
        const orientation = document.querySelector('#lazyL2-orientation-buttons .btn-active')?.dataset.orientation || 'right';
        return { 
            length1: document.getElementById('length1')?.value, 
            width1: document.getElementById('width1')?.value, 
            length2: document.getElementById('length2')?.value,
            width2: document.getElementById('width2')?.value,
            length3: document.getElementById('length3')?.value, 
            length4: document.getElementById('length4')?.value,
            orientation: orientation
        };
    }
    function collectCustomFreeformDimensions() {
        const widths = [];
        const widthInputs = document.querySelectorAll('input[id^="width_"]');
        widthInputs.forEach(input => {
            widths.push(input.value);
        });
        return {
            length: document.getElementById('length')?.value,
            widths: widths
        };
    }
    function collectKidneyDimensions() { // Shared function for Kidney and Mountain Lake
        return {
            length: document.getElementById('length')?.value,
            widthA: document.getElementById('widthA')?.value,
            widthB: document.getElementById('widthB')?.value
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
            svgContent = svgDiagrams.lazyL2(rotation, dimsToUse, dimsToUse.orientation);
            rotateButtonContainer.style.display = 'block';
        } else if (shape === 'tShape') { // New T-Shape
            const dimsToUse = dynamicDims || collectTrueLDimensions(); // Re-uses TrueL's dimension collection
            svgContent = svgDiagrams.tShape(rotation, dimsToUse);
            rotateButtonContainer.style.display = 'block';
        } else if (shape === 'offsetRectangle') {
            const dimsToUse = dynamicDims || collectOffsetRectangleDimensions();
            svgContent = svgDiagrams.offsetRectangle(rotation, dimsToUse);
            rotateButtonContainer.style.display = 'block';
        } else if (shape === 'roman') {
            const dimsToUse = dynamicDims || collectRomanDimensions();
            svgContent = svgDiagrams.roman(dimsToUse);
            rotateButtonContainer.style.display = 'none'; // No rotation for Roman shape
        } else if (shape === 'mountainLake') {
            const dimsToUse = dynamicDims || collectKidneyDimensions(); // Reuses kidney collection logic
            svgContent = svgDiagrams.mountainLake(dimsToUse);
            rotateButtonContainer.style.display = 'none';
        } else if (shape === 'customFreeform') {
            const dimsToUse = dynamicDims || collectCustomFreeformDimensions();
            svgContent = svgDiagrams.customFreeform(dimsToUse);
            rotateButtonContainer.style.display = 'none';
        } else if (shape === 'figure8') { // New Figure 8 shape
            const dimsToUse = dynamicDims || collectFigure8Dimensions();
            svgContent = svgDiagrams.figure8(dimsToUse);
            rotateButtonContainer.style.display = 'none';
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
        if (selectedShape === 'trueL' || selectedShape === 'lazyL' || selectedShape === 'lazyL2' || selectedShape === 'tShape' || selectedShape ==='offsetRectangle') {  // Added lazyL2
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
    if (/customFreeform-width\d+-text/.test(diagramTextId)) {
        const match = diagramTextId.match(/width(\d+)/);
        if (match) return `W${match[1]}`;
    }
    if (diagramTextId.includes('figure8-diameterA-text')) return 'Diameter A';
    if (diagramTextId.includes('figure8-diameterB-text')) return 'Diameter B';
    if (diagramTextId.includes('mountainLake-length-text')) return 'Length';
    if (diagramTextId.includes('mountainLake-widthA-text')) return 'Width A';
    if (diagramTextId.includes('mountainLake-widthB-text')) return 'Width B';
    if (diagramTextId.includes('roman-length-text')) return 'Length';
    if (diagramTextId.includes('roman-width-text')) return 'Width';
    if (diagramTextId.includes('doubleGrecian-overallLength-text')) return 'Overall Length';
    if (diagramTextId.includes('doubleGrecian-overallWidth-text')) return 'Overall Width';
    if (diagramTextId.includes('doubleGrecian-endWidth-text')) return 'End Width';
    if (diagramTextId.includes('lazyL2-length1-text')) return 'Top Width';
    if (diagramTextId.includes('lazyL2-width1-text')) return 'Right Side';
    if (diagramTextId.includes('lazyL2-length2-text')) return 'Right Angled';
    if (diagramTextId.includes('lazyL2-width2-text')) return 'Bottom Width';
    if (diagramTextId.includes('lazyL2-length3-text')) return 'Left Angled';
    if (diagramTextId.includes('lazyL2-length4-text')) return 'Left Side';
    if (diagramTextId.includes('tShape-lengthA-text')) return 'Top';
    if (diagramTextId.includes('tShape-widthA-text')) return 'TWidth';
    if (diagramTextId.includes('tShape-lengthB-text')) return 'Stem L';
    if (diagramTextId.includes('tShape-widthB-text')) return 'Stem W';
    if (diagramTextId.includes('trueL-lengthA')) return 'Length A'; 
    if (diagramTextId.includes('offsetRectangle-lengthA-text')) return 'Length A';
    if (diagramTextId.includes('offsetRectangle-widthA-text')) return 'Width A';
    if (diagramTextId.includes('offsetRectangle-lengthB-text')) return 'Length B';
    if (diagramTextId.includes('offsetRectangle-widthB-text')) return 'Width B';
    if (diagramTextId.includes('offsetRectangle-offsetX-text')) return 'Offset X';
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
            case 'roman':
                diagramIdPrefix = 'roman-';
                inputsContainer.appendChild(createInputElement('length', 'Length of Straight Section', 'e.g., 30', diagramIdPrefix + 'length-text'));
                inputsContainer.appendChild(createInputElement('width', 'Width (Diameter of Ends)', 'e.g., 15', diagramIdPrefix + 'width-text'));
            
                ['length', 'width'].forEach(id => {
                    const inputEl = document.getElementById(id);
                    if (inputEl) {
                           inputEl.addEventListener('input', () => {
                            if (selectedShape === 'roman') {
                                const currentDims = collectRomanDimensions();
                                updateShapeDiagram('roman', 0, currentDims);
                                }
                            });
                        }
                    });
                    break;
                    case 'figure8':
                        diagramIdPrefix = 'figure8-';
                        const instructionDivF8 = document.createElement('div');
                        instructionDivF8.className = 'instruction-card';
                        instructionDivF8.innerHTML = `
                        <h4>How to Measure a Figure 8 Pool</h4>
                        <ul>
                            <li><strong>Diameter A:</strong> Measure the diameter of the larger circle.</li>
                            <li><strong>Diameter B:</strong> Measure the diameter of the smaller circle.</li>
                        </ul>
                        `;
                        inputsContainer.appendChild(instructionDivF8);
                
                        inputsContainer.appendChild(createInputElement('diameterA', 'Diameter A', 'e.g., 20', diagramIdPrefix + 'diameterA-text'));
                        inputsContainer.appendChild(createInputElement('diameterB', 'Diameter B', 'e.g., 15', diagramIdPrefix + 'diameterB-text'));
                
                        ['diameterA', 'diameterB'].forEach(id => {
                            const inputEl = document.getElementById(id);
                            if (inputEl) {
                                inputEl.addEventListener('input', () => {
                                    if (selectedShape === 'figure8') {
                                        const currentDims = collectFigure8Dimensions();
                                        updateShapeDiagram('figure8', 0, currentDims);
                                    }
                                });
                            }
                        });
                        break;


                    case 'mountainLake':
                        diagramIdPrefix = 'mountainLake-';
                        const instructionDivML = document.createElement('div');
                        instructionDivML.className = 'instruction-card';
                        instructionDivML.innerHTML = `
                            <h4>How to Measure a Mountain Lake Pool</h4>
                            <ul>
                                <li><strong>Length (L):</strong> Measure the longest distance across the pool from end to end.</li>
                                <li><strong>Width A & B:</strong> Measure the width at the widest point of each of the two lobes.</li>
                            </ul>
                        `;
                        inputsContainer.appendChild(instructionDivML);
                
                        inputsContainer.appendChild(createInputElement('length', 'Overall Length (L)', 'e.g., 35', diagramIdPrefix + 'length-text'));
                        inputsContainer.appendChild(createInputElement('widthA', 'Width A', 'e.g., 18', diagramIdPrefix + 'widthA-text'));
                        inputsContainer.appendChild(createInputElement('widthB', 'Width B', 'e.g., 12', diagramIdPrefix + 'widthB-text'));
                        
                        ['length', 'widthA', 'widthB'].forEach(id => {
                            const inputEl = document.getElementById(id);
                            if (inputEl) {
                                inputEl.addEventListener('input', () => {
                                    if (selectedShape === 'mountainLake') {
                                        const currentDims = collectKidneyDimensions(); // Reuses kidney collection logic
                                        updateShapeDiagram('mountainLake', 0, currentDims);
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
                case 'lazyL2':
                    diagramIdPrefix = 'lazyL2-';
                    // Add orientation buttons
                    const orientationDiv = document.createElement('div');
                    orientationDiv.id = 'lazyL2-orientation-container';
                    orientationDiv.className = 'mb-4';
                    orientationDiv.innerHTML = `
                        <label class="block text-sm font-medium text-gray-700 mb-2">Cutout Orientation</label>
                        <div id="lazyL2-orientation-buttons" class="grid grid-cols-2 gap-2">
                            <button type="button" data-orientation="right" class="py-2 px-4 rounded-lg text-sm font-medium transition-colors btn-active">Right Cutout</button>
                            <button type="button" data-orientation="left" class="py-2 px-4 rounded-lg text-sm font-medium transition-colors btn-inactive">Left Cutout</button>
                        </div>
                    `;
                    inputsContainer.appendChild(orientationDiv);
                
                    // Add dimension inputs for the 6 perimeter sides
                    inputsContainer.appendChild(createInputElement('length1', 'Top Width', 'e.g., 36', diagramIdPrefix + 'length1-text'));
    inputsContainer.appendChild(createInputElement('length4', 'Left Vertical Side', 'e.g., 15', diagramIdPrefix + 'length4-text'));
    inputsContainer.appendChild(createInputElement('width1', 'Right Vertical Side', 'e.g., 15', diagramIdPrefix + 'width1-text'));
    inputsContainer.appendChild(createInputElement('width2', 'Bottom Width', 'e.g., 20', diagramIdPrefix + 'width2-text'));
    inputsContainer.appendChild(createInputElement('length3', 'Left Angled Side', 'e.g., 10', diagramIdPrefix + 'length3-text'));
    inputsContainer.appendChild(createInputElement('length2', 'Right Angled Side', 'e.g., 10', diagramIdPrefix + 'length2-text'));
    
                    // Add event listeners for orientation buttons
                    document.querySelectorAll('#lazyL2-orientation-buttons button').forEach(button => {
                        button.addEventListener('click', () => {
                            document.querySelectorAll('#lazyL2-orientation-buttons button').forEach(btn => {
                                btn.classList.remove('btn-active');
                                btn.classList.add('btn-inactive');
                            });
                            button.classList.add('btn-active');
                            button.classList.remove('btn-inactive');
                            if (selectedShape === 'lazyL2') {
                                const currentDims = collectLazyL2Dimensions();
                                updateShapeDiagram('lazyL2', currentLazyLRotation, currentDims);
                            }
                        });
                    });
                
                    // Add event listeners for dynamic diagram updates
                    ['length1', 'width1', 'length2', 'width2', 'length3', 'length4'].forEach(id => {
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
                    case 'customFreeform':
        diagramIdPrefix = 'customFreeform-';
        const instructionDivCF = document.createElement('div');
        instructionDivCF.className = 'instruction-card';
        instructionDivCF.innerHTML = `
            <h4>How to Measure a Freeform Pool</h4>
            <ul>
                <li><strong>Overall Length:</strong> Measure the longest point of the pool.</li>
                <li><strong>Widths:</strong> Measure the width at regular intervals. Add or remove measurements for better accuracy.</li>
            </ul>
        `;
        inputsContainer.appendChild(instructionDivCF);
        inputsContainer.appendChild(createInputElement('length', 'Overall Length', 'e.g., 40', diagramIdPrefix + 'length-text'));
        
        const widthsContainer = document.createElement('div');
        widthsContainer.id = 'widths-container';
        inputsContainer.appendChild(widthsContainer);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'flex gap-2 mt-2';
        
        const addWidthBtn = document.createElement('button');
        addWidthBtn.textContent = 'Add Width';
        addWidthBtn.className = 'py-2 px-3 rounded-md text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600 transition-colors';
        addWidthBtn.type = 'button';

        const removeWidthBtn = document.createElement('button');
        removeWidthBtn.textContent = 'Remove Width';
        removeWidthBtn.type = 'button';
        // Initial styling is handled in redrawWidthInputs

        buttonsContainer.appendChild(addWidthBtn);
        buttonsContainer.appendChild(removeWidthBtn);
        inputsContainer.appendChild(buttonsContainer);

        // This function now handles all rendering of width inputs
        const redrawWidthInputs = (widthsToRender) => {
            widthsContainer.innerHTML = ''; // Clear previous inputs
            const widthCount = widthsToRender.length;

            widthsToRender.forEach((widthValue, i) => {
                const inputId = `width_${i + 1}`;
                const textId = `${diagramIdPrefix}width${i + 1}-text`;
                const inputGroup = createInputElement(inputId, `Width ${i + 1}`, `W${i+1}`, textId, widthValue);
                widthsContainer.appendChild(inputGroup);
            });
            
            // Re-attach listeners to all relevant inputs
            document.querySelectorAll('input[id^="width_"], input#length').forEach(el => {
                el.addEventListener('input', () => {
                    const currentDims = collectCustomFreeformDimensions();
                    updateShapeDiagram('customFreeform', 0, currentDims);
                });
            });

            // Update button state and style
            const canRemove = widthCount > 2;
            removeWidthBtn.disabled = !canRemove;
            removeWidthBtn.className = `py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                canRemove 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-300 text-gray-800 opacity-50 cursor-not-allowed'
            }`;
        };

        addWidthBtn.onclick = () => {
            const dims = collectCustomFreeformDimensions();
            dims.widths.push(10); // Add a new width with a default value
            redrawWidthInputs(dims.widths.map(w => w || '')); // Re-render inputs
            updateShapeDiagram('customFreeform', 0, collectCustomFreeformDimensions());
        };

        removeWidthBtn.onclick = () => {
            const dims = collectCustomFreeformDimensions();
            if (dims.widths.length > 2) {
                dims.widths.pop();
                redrawWidthInputs(dims.widths);
                updateShapeDiagram('customFreeform', 0, collectCustomFreeformDimensions());
            }
        };
        
        // Initial setup with default values
        redrawWidthInputs(DEFAULT_CUSTOM_FREEFORM_INPUTS.widths);
        break;
                    case 'offsetRectangle':
                    diagramIdPrefix = 'offsetRectangle-';
                    inputsContainer.appendChild(createInputElement('lengthA', 'Main Length (A)', 'e.g., 40', diagramIdPrefix + 'lengthA-text'));
                    inputsContainer.appendChild(createInputElement('widthA', 'Main Width (A)', 'e.g., 20', diagramIdPrefix + 'widthA-text'));       
                    inputsContainer.appendChild(createInputElement('lengthB', 'Offset Length (B)', 'e.g., 15', diagramIdPrefix + 'lengthB-text'));
                    inputsContainer.appendChild(createInputElement('widthB', 'Offset Width (B)', 'e.g., 10', diagramIdPrefix + 'widthB-text'));
                    inputsContainer.appendChild(createInputElement('offsetX', 'Horizontal Offset (X)', 'e.g., 5', diagramIdPrefix + 'offsetX-text'));

                    ['lengthA', 'widthA', 'lengthB', 'widthB', 'offsetX'].forEach(id => {
                    const inputEl = document.getElementById(id);
                    if (inputEl) {
                    inputEl.addEventListener('input', () => {
                    if (selectedShape === 'offsetRectangle') {
                        const currentDims = collectOffsetRectangleDimensions();
                        updateShapeDiagram('offsetRectangle', currentLazyLRotation, currentDims);
                    }
                });
            }
        });
        break;
        case 'doubleGrecian':
        diagramIdPrefix = 'doubleGrecian-';
        const instructionDivDG = document.createElement('div');
        instructionDivDG.className = 'instruction-card';
        instructionDivDG.innerHTML = `
            <h4>How to Measure a Double Grecian Pool</h4>
            <ul>
                <li><strong>Overall Length:</strong> Measure the longest distance from tip to tip.</li>
                <li><strong>Overall Width:</strong> Measure the widest distance from side to side.</li>
                <li><strong>End Width:</strong> Measure the width of the flat section at one of the ends.</li>
            </ul>
        `;
        inputsContainer.appendChild(instructionDivDG);

        inputsContainer.appendChild(createInputElement('overallLength', 'Overall Length', 'e.g., 40', diagramIdPrefix + 'overallLength-text'));
        inputsContainer.appendChild(createInputElement('overallWidth', 'Overall Width', 'e.g., 20', diagramIdPrefix + 'overallWidth-text'));
        inputsContainer.appendChild(createInputElement('endWidth', 'End Width', 'e.g., 12', diagramIdPrefix + 'endWidth-text'));

        ['overallLength', 'overallWidth', 'endWidth'].forEach(id => {
            const inputEl = document.getElementById(id);
            if (inputEl) {
                inputEl.addEventListener('input', () => {
                    if (selectedShape === 'doubleGrecian') {
                        const currentDims = collectDoubleGrecianDimensions();
                        updateShapeDiagram('doubleGrecian', 0, currentDims);
                    }
                });
            }
        });
        break;
                    case 'tShape':
                        diagramIdPrefix = 'tShape-';
                        inputsContainer.appendChild(createInputElement('lengthA', 'Top Bar Length (A)', 'e.g., 40', diagramIdPrefix + 'lengthA-text'));
                        inputsContainer.appendChild(createInputElement('widthA', 'Top Bar Width (A)', 'e.g., 15', diagramIdPrefix + 'widthA-text'));
                        inputsContainer.appendChild(createInputElement('lengthB', 'Stem Length (B)', 'e.g., 25', diagramIdPrefix + 'lengthB-text'));
                        inputsContainer.appendChild(createInputElement('widthB', 'Stem Width (B)', 'e.g., 15', diagramIdPrefix + 'widthB-text'));
                        
                        // Re-use the same dynamic update logic as TrueL
                        ['lengthA', 'widthA', 'lengthB', 'widthB'].forEach(id => {
                            const inputEl = document.getElementById(id);
                            if (inputEl) {
                                inputEl.addEventListener('input', () => {
                                    if (selectedShape === 'tShape') {
                                        const currentDims = collectTrueLDimensions(); // Re-uses TrueL's dimension collection
                                        updateShapeDiagram('tShape', currentLazyLRotation, currentDims);
                                    }
                                });
                            }
                        });
                        break;
                    
            case 'kidney':
            case 'mountainLake':
                const instructionDiv = document.createElement('div');
    instructionDiv.className = 'instruction-card';
    instructionDiv.innerHTML = `
        <h4>How to Measure a Kidney Pool</h4>
        <ul>
            <li><strong>Length (L):</strong> Measure the longest distance across the pool from end to end.</li>
            <li><strong>Width A & B:</strong> Measure the width at the widest point of each of the two lobes of the kidney shape.</li>
        </ul>
    `;
    inputsContainer.appendChild(instructionDiv);
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
                        const areaA = lengthA_TL * widthA_TL;
                        const areaB = lengthB_TL * widthB_TL;
                        volumeCubicFeet = (areaA + areaB) * avgDepth;
                    }
                    break;
                case 'roman':
                    const lengthRoman = parseFloat(document.getElementById('length').value);
                    const widthRoman = parseFloat(document.getElementById('width').value);
                    if (isNaN(lengthRoman) || lengthRoman <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length'); }
                    if (isNaN(widthRoman) || widthRoman <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('width'); }
                    if (dimensionsValid) {
                        const rectArea = lengthRoman * widthRoman;
                        const circleArea = Math.PI * Math.pow(widthRoman / 2, 2);
                        volumeCubicFeet = (rectArea + circleArea) * avgDepth;
                    }
                    break;
                case 'figure8':
                    const diameterA = parseFloat(document.getElementById('diameterA').value);
                    const diameterB = parseFloat(document.getElementById('diameterB').value);
                    if (isNaN(diameterA) || diameterA <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('diameterA'); }
                    if (isNaN(diameterB) || diameterB <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('diameterB'); }
                    if (dimensionsValid) {
                        const radiusA = diameterA / 2;
                        const radiusB = diameterB / 2;
                        const area = (Math.PI * Math.pow(radiusA, 2)) + (Math.PI * Math.pow(radiusB, 2));
                        volumeCubicFeet = area * avgDepth;
                    }
                    break;
                    case 'customFreeform':
        const length = parseFloat(document.getElementById('length').value);
        const widthInputs = document.querySelectorAll('input[id^="width_"]');
        let totalWidth = 0;
        let validWidthCount = 0;
        let allWidthsValid = true;

        if (isNaN(length) || length <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length'); }
        
        widthInputs.forEach(input => {
            const widthVal = parseFloat(input.value);
            if (isNaN(widthVal) || widthVal <= 0) {
                allWidthsValid = false;
                firstInvalidInput = firstInvalidInput || input;
            } else {
                totalWidth += widthVal;
                validWidthCount++;
            }
        });

        if (!allWidthsValid || validWidthCount === 0) {
            dimensionsValid = false;
        }

        if (dimensionsValid) {
            const averageWidth = totalWidth / validWidthCount;
            const surfaceArea = length * averageWidth;
            volumeCubicFeet = surfaceArea * avgDepth;
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
                case 'lazyL2':
                        // Calculation for a 6-sided Grecian L-shape.
                    const L1 = parseFloat(document.getElementById('length1')?.value); // Top Width
                    const L2 = parseFloat(document.getElementById('width1')?.value);  // Right Vertical Side
                    const L3 = parseFloat(document.getElementById('length2')?.value); // Right Angled Side
                    const L4 = parseFloat(document.getElementById('width2')?.value);  // Bottom Width
                    const L5 = parseFloat(document.getElementById('length3')?.value); // Left Angled Side
                    const L6 = parseFloat(document.getElementById('length4')?.value); // Left Vertical Side
                    
                    if (isNaN(L1) || L1 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length1');}
                    if (isNaN(L2) || L2 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('width1');}
                    if (isNaN(L3) || L3 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length2');}
                    if (isNaN(L4) || L4 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('width2');}
                    if (isNaN(L5) || L5 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length3');}
                    if (isNaN(L6) || L6 <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('length4');}
                    
                if (dimensionsValid) {
                            // Re-calculate geometric parameters to find area.
                            // This ensures consistency between the diagram and the calculation.
                            const A = L1 - L4;
                            const B = L2 - L6;
                            const C = A * A + B * B + L5 * L5 - L3 * L3;
                            let dx_left = 0, dy_left = 0, dx_right = 0, dy_right = 0, H = 0, W = L1;
                            let area = 0;
                    
                            // Use same solver as diagram to find component dimensions
                            if (Math.abs(A) > 1e-6) {
                                const qa = 4 * (A * A + B * B);
                                const qb = -4 * B * C;
                                const qc = C * C - 4 * A * A * L5 * L5;
                                const discriminant = qb * qb - 4 * qa * qc;
                                if (discriminant >= 0) {
                                    dy_left = (-qb + Math.sqrt(discriminant)) / (2 * qa);
                                    dx_left = (C - 2 * B * dy_left) / (2 * A);
                                }
                            } else {
                                dy_left = C / (2 * B);
                                const dx_left_sq = L5 * L5 - dy_left * dy_left;
                                if (dx_left_sq >= 0) dx_left = Math.sqrt(dx_left_sq);
                            }
                            
                            dx_right = A - dx_left;
                            dy_right = dy_left - B;
                            H = L6 + dy_left;
                    
                            // Area is the bounding rectangle minus the two corner triangles.
                            const area_bounding_box = W * H;
                            const area_triangle_left = 0.5 * dx_left * dy_left;
                            const area_triangle_right = 0.5 * dx_right * dy_right;
                            
                            area = area_bounding_box - area_triangle_left - area_triangle_right;
                            
                            if (area > 0) {
                                volumeCubicFeet = area * avgDepth;
                            } else {
                                dimensionsValid = false;
                                alert("The entered dimensions do not form a valid pool shape. Please check your measurements.");
                            }
                        }
                        break;
                case 'offsetRectangle':
                            const lenA_OR = parseFloat(document.getElementById('lengthA').value);
                            const widA_OR = parseFloat(document.getElementById('widthA').value);
                            const lenB_OR = parseFloat(document.getElementById('lengthB').value);
                            const widB_OR = parseFloat(document.getElementById('widthB').value);
                            const offX_OR = parseFloat(document.getElementById('offsetX').value);
                    
                            if (isNaN(lenA_OR) || lenA_OR <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthA');}
                            if (isNaN(widA_OR) || widA_OR <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthA');}
                            if (isNaN(lenB_OR) || lenB_OR <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthB');}
                            if (isNaN(widB_OR) || widB_OR <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthB');}
                            if (isNaN(offX_OR) || offX_OR < 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('offsetX');}
                    
                            // Validate that the offset section does not extend beyond the main section
                            if (dimensionsValid && (offX_OR + widB_OR > lenA_OR)) {
                                alert('The sum of Offset X and Offset Width (B) cannot be greater than Main Length (A).');
                                dimensionsValid = false;
                                firstInvalidInput = firstInvalidInput || document.getElementById('offsetX');
                            }
                    
                            if (dimensionsValid) {
                                const areaA = lenA_OR * widA_OR;
                                const areaB = lenB_OR * widB_OR;
                                volumeCubicFeet = (areaA + areaB) * avgDepth;
                            }
                            break;
                case 'doubleGrecian':
                                const L_DG = parseFloat(document.getElementById('overallLength').value);
                                const W_DG = parseFloat(document.getElementById('overallWidth').value);
                                const EW_DG = parseFloat(document.getElementById('endWidth').value);
                        
                                if (isNaN(L_DG) || L_DG <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('overallLength');}
                                if (isNaN(W_DG) || W_DG <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('overallWidth');}
                                if (isNaN(EW_DG) || EW_DG <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('endWidth');}
                        
                                if (dimensionsValid && EW_DG >= W_DG) {
                                    alert('End Width must be less than Overall Width.');
                                    dimensionsValid = false;
                                    firstInvalidInput = firstInvalidInput || document.getElementById('endWidth');
                                }
                                
                                if (dimensionsValid && L_DG <= (W_DG - EW_DG)) {
                                    alert('Overall Length is too short for the given widths, causing the angled corners to overlap.');
                                    dimensionsValid = false;
                                    firstInvalidInput = firstInvalidInput || document.getElementById('overallLength');
                                }
                        
                                if (dimensionsValid) {
                                    // Area is the bounding rectangle minus the four corner triangles (assuming 45-degree angles).
                                    const dx = (W_DG - EW_DG) / 2.0;
                                    const area_bounding_box = L_DG * W_DG;
                                    const area_four_triangles = 2 * dx * dx;
                                    const totalArea = area_bounding_box - area_four_triangles;
                                    
                                    volumeCubicFeet = totalArea * avgDepth;
                                }
                                break;

                case 'tShape':
                    const lengthA_TS = parseFloat(document.getElementById('lengthA').value); // TS for T-Shape
                    const widthA_TS = parseFloat(document.getElementById('widthA').value);
                    const lengthB_TS = parseFloat(document.getElementById('lengthB').value);
                    const widthB_TS = parseFloat(document.getElementById('widthB').value);
                            
                    if (isNaN(lengthA_TS) || lengthA_TS <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthA');}
                    if (isNaN(widthA_TS) || widthA_TS <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthA');}
                    if (isNaN(lengthB_TS) || lengthB_TS <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('lengthB');}
                    if (isNaN(widthB_TS) || widthB_TS <= 0) { dimensionsValid = false; firstInvalidInput = firstInvalidInput || document.getElementById('widthB');}
                            
                            // The stem width cannot be greater than the top bar length
                    if (dimensionsValid && widthB_TS > lengthA_TS) {
                        alert('Stem Width (B) cannot be greater than Top Bar Length (A).');
                        dimensionsValid = false;
                        firstInvalidInput = firstInvalidInput || document.getElementById('widthB');
                    }
                    
                    if (dimensionsValid) {
                        const areaA = lengthA_TS * widthA_TS;
                        const areaB = lengthB_TS * widthB_TS;
                        volumeCubicFeet = (areaA + areaB) * avgDepth;
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