const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// --- Calculation logic moved from script.js ---

// All your helper functions and constants here:
const GOLDEN_NUMBERS = {
    arizona: { alkalinity: 120, calcium: 400, ph: 7.5, cya: 80, salt: 3200 },
    texas:   { alkalinity: 120, calcium: 400, ph: 7.5, cya: 80, salt: 3200 },
    florida: { alkalinity: 80, calcium: 300, ph: 7.6, cya: 50, salt: 3200 }
};

const FL_THRESHOLDS = { alkalinity: 60, calcium: 200, cya: 30 };

const ALKALINITY_FACTORS = [
    { ppm: 5, factor: 0.7 }, { ppm: 25, factor: 1.4 }, { ppm: 50, factor: 1.7 },
    { ppm: 75, factor: 1.9 }, { ppm: 100, factor: 2.0 }, { ppm: 125, factor: 2.1 },
    { ppm: 150, factor: 2.2 }, { ppm: 200, factor: 2.3 }, { ppm: 250, factor: 2.4 },
    { ppm: 300, factor: 2.5 }, { ppm: 400, factor: 2.6 }, { ppm: 800, factor: 2.9 },
    { ppm: 1000, factor: 3.0 }
];

const CALCIUM_FACTORS = [
    { ppm: 5, factor: 0.3 }, { ppm: 25, factor: 1.0 }, { ppm: 50, factor: 1.3 },
    { ppm: 75, factor: 1.5 }, { ppm: 100, factor: 1.6 }, { ppm: 125, factor: 1.7 },
    { ppm: 150, factor: 1.8 }, { ppm: 200, factor: 1.9 }, { ppm: 250, factor: 2.0 },
    { ppm: 300, factor: 2.1 }, { ppm: 400, factor: 2.2 }, { ppm: 800, factor: 2.5 },
    { ppm: 1000, factor: 2.6 }
];

const TEMP_FACTORS = [
    { temp: 32, factor: 0.1 }, { temp: 37, factor: 0.1 }, { temp: 46, factor: 0.2 },
    { temp: 53, factor: 0.3 }, { temp: 60, factor: 0.4 }, { temp: 66, factor: 0.5 },
    { temp: 76, factor: 0.6 }, { temp: 84, factor: 0.7 }, { temp: 94, factor: 0.8 },
    { temp: 104, factor: 0.9 }, { temp: 128, factor: 1.0 }
];

function getTDSFactor(tds) {
    if (tds <= 800) return 12.1;
    if (tds <= 1500) return 12.2;
    if (tds <= 2900) return 12.3;
    if (tds <= 5500) return 12.4;
    return 12.5;
}

function getFactor(value, table, key = 'ppm') {
    for (let i = 0; i < table.length; i++) {
        if (value <= table[i][key]) return table[i].factor;
    }
    return table[table.length - 1].factor;
}

function formatAmountOzLb(amountOz) {
    if (amountOz > 16) {
        return `${(amountOz / 16).toFixed(2)} lbs`;
    } else {
        return `${amountOz.toFixed(2)} oz`;
    }
}

function formatLbsOz(ounces) {
    const lbs = Math.floor(ounces / 16);
    const oz = ounces % 16;
    let result = '';
    if (lbs > 0) result += `${lbs} lb${lbs > 1 ? 's' : ''}`;
    if (oz > 0 || lbs === 0) {
        if (result) result += ' ';
        result += `${oz.toFixed(2)} oz`;
    }
    return result;
}

function acidDoseFlOzGallons(currentPh, targetPh, poolGallons, alkalinity) {
    if (currentPh <= targetPh) return null;
    const poolFactor = 76 * (poolGallons / 10000);
    const alkFactor = alkalinity / 100;
    const acidFlOz = (currentPh - targetPh) * poolFactor * alkFactor;
    if (acidFlOz <= 0) return null;
    if (acidFlOz < 128) {
        return `${acidFlOz.toFixed(1)} fl oz of 31.45% muriatic acid`;
    } else {
        return `${(acidFlOz / 128).toFixed(2)} gallons (${acidFlOz.toFixed(1)} fl oz) of 31.45% muriatic acid`;
    }
}

function getChlorinePPMDose(freeChlorine, cya) {
    const minFC = cya * 0.05;
    const month = new Date().getMonth();
    let lossFactor;
    if ([10, 11, 0].includes(month)) { // Nov, Dec, Jan
        lossFactor = 1.5;
    } else if ([1, 2].includes(month)) { // Feb, Mar
        lossFactor = 2.0;
    } else if ([3, 4, 8, 9].includes(month)) { // Apr, May, Sep, Oct
        lossFactor = 2.5;
    } else { // Jun, Jul, Aug
        lossFactor = 3.0;
    }
    const uvLoss = lossFactor * 6;
    const calculatedDose = minFC + uvLoss;
    let toBeDosed = calculatedDose - freeChlorine;
    if (toBeDosed < 0) toBeDosed = 0;
    return {
        minFC: minFC,
        lossFactor: lossFactor,
        uvLoss: uvLoss,
        calculatedDose: calculatedDose,
        toBeDosed: toBeDosed
    };
}

function getLiquidChlorineDose(chlorinePPM, poolGallons) {
    const gallons = (chlorinePPM * poolGallons) / (12 * 10000);
    const flOz = gallons * 128;
    return { gallons, flOz };
}

function getCalHypoOunces(chlorinePPM, poolGallons) {
    return chlorinePPM * 2.0 * (poolGallons / 10000);
}

function boldQuantity(sentence) {
    return sentence.replace(/(Add\s+)([\d.,\s\(\)a-zA-Z%]+)(\s+of)/i, function(match, p1, p2, p3) {
        return p1 + '<strong>' + p2.trim() + '</strong>' + p3;
    });
}

function getSaltDose(current, desired, poolGallons) {
    if (desired <= current) return null;
    const ppmNeeded = desired - current;
    const lbsNeeded = (ppmNeeded * poolGallons * 183) / (1000 * 10000);
    const bags = Math.ceil(lbsNeeded / 40);
    return { lbsNeeded, bags };
}

function getDosingAdvice(userValue, targetValue, poolGallons, chemType, alkalinity, state) {
    let advice = "";
    let amount = 0;
    let diff = targetValue - userValue;

    if (state === "florida") {
        if (chemType === "alkalinity" && userValue < FL_THRESHOLDS.alkalinity) {
            amount = ((targetValue - userValue) / 10) * 1.5 * (poolGallons / 10000);
            advice = `Add ${amount.toFixed(2)} lbs of sodium bicarbonate to raise alkalinity to ${targetValue} ppm.`;
        }
        if (chemType === "calcium" && userValue < FL_THRESHOLDS.calcium) {
            amount = ((targetValue - userValue) / 10) * 1.25 * (poolGallons / 10000);
            advice = `Add ${amount.toFixed(2)} lbs of calcium chloride to raise calcium hardness to ${targetValue} ppm.`;
        }
        if (chemType === "ph" && Math.abs(diff) >= 0.01) {
            if (diff > 0) {
                amount = (diff / 0.2) * 6 * (poolGallons / 10000);
                advice = `Add ${formatAmountOzLb(amount)} of soda ash to raise pH to ${targetValue}.`;
            } else if (diff < 0) {
                const acidDose = acidDoseFlOzGallons(userValue, targetValue, poolGallons, alkalinity);
                if (acidDose) {
                    advice = `Add ${acidDose} to lower pH to ${targetValue}.`;
                }
            }
        }
        if (chemType === "cya" && userValue <= FL_THRESHOLDS.cya) {
            amount = ((targetValue - userValue) / 10) * 13 * (poolGallons / 10000);
            advice = `Add ${formatAmountOzLb(amount)} of cyanuric acid (stabilizer) to raise CYA to ${targetValue} ppm.`;
        }
        return advice;
    }

    if (chemType === "alkalinity" && diff > 0) {
        amount = (diff / 10) * 1.5 * (poolGallons / 10000);
        advice = `Add ${amount.toFixed(2)} lbs of sodium bicarbonate to raise alkalinity to ${targetValue} ppm.`;
    }
    if (chemType === "calcium" && diff > 0) {
        amount = (diff / 10) * 1.25 * (poolGallons / 10000);
        advice = `Add ${amount.toFixed(2)} lbs of calcium chloride to raise calcium hardness to ${targetValue} ppm.`;
    }
    if (chemType === "ph") {
        if (diff > 0) {
            amount = (diff / 0.2) * 6 * (poolGallons / 10000);
            advice = `Add ${formatAmountOzLb(amount)} of soda ash to raise pH to ${targetValue}.`;
        } else if (diff < 0) {
            const acidDose = acidDoseFlOzGallons(userValue, targetValue, poolGallons, alkalinity);
            if (acidDose) {
                advice = `Add ${acidDose} to lower pH to ${targetValue}.`;
            }
        }
    }
    if (chemType === "cya" && diff > 0) {
        amount = (diff / 10) * 13 * (poolGallons / 10000);
        advice = `Add ${formatAmountOzLb(amount)} of cyanuric acid (stabilizer) to raise CYA to ${targetValue} ppm.`;
    }
    return advice;
}

// --- API endpoint for calculation ---
app.post('/api/calculate', (req, res) => {
    try {
        const {
            capacity, temperature, freeChlorine, cyanuric, ph, alkalinity, calcium, tds,
            saltCurrent, saltDesired, state
        } = req.body;

        let correctedAlkalinity = alkalinity - (cyanuric / 3);
        if (correctedAlkalinity < 0) correctedAlkalinity = 0;

        const alkalinityFactor = getFactor(correctedAlkalinity, ALKALINITY_FACTORS);
        const calciumFactor = getFactor(calcium, CALCIUM_FACTORS);
        const tempFactor = getFactor(temperature, TEMP_FACTORS, 'temp');
        const tdsFactor = getTDSFactor(tds);

        const lsi = ph + calciumFactor + alkalinityFactor + tempFactor - tdsFactor;

        let golden = GOLDEN_NUMBERS[state];

        const dosing = {
            ph: getDosingAdvice(ph, golden.ph, capacity, "ph", alkalinity, state),
            alkalinity: getDosingAdvice(correctedAlkalinity, golden.alkalinity, capacity, "alkalinity", alkalinity, state),
            cya: getDosingAdvice(cyanuric, golden.cya, capacity, "cya", alkalinity, state),
            calcium: getDosingAdvice(calcium, golden.calcium, capacity, "calcium", alkalinity, state)
        };

        let lsiStatus;
        if (lsi < -0.5) {
            lsiStatus = "Very Corrosive";
        } else if (lsi >= -0.5 && lsi < -0.2) {
            lsiStatus = "Corrosive";
        } else if (lsi >= -0.2 && lsi < -0.05) {
            lsiStatus = "Slightly Corrosive";
        } else if (lsi >= -0.05 && lsi <= 0.3) {
            lsiStatus = "Balanced";
        } else if (lsi > 0.3 && lsi <= 0.5) {
            lsiStatus = "Slightly Scale Forming";
        } else {
            lsiStatus = "Scale Forming";
        }

        // Salt dosing
        let saltDose = null;
        if (saltDesired > 0 && saltCurrent >= 0 && saltDesired > saltCurrent) {
            saltDose = getSaltDose(saltCurrent, saltDesired, capacity);
        }

        // Chlorine dosing
        const chlorineInfo = getChlorinePPMDose(freeChlorine, cyanuric);
        let sanitizer = "";
        if (state === "florida") {
            const liquidChlorine = getLiquidChlorineDose(chlorineInfo.toBeDosed, capacity);
            if (chlorineInfo.toBeDosed > 0.01) {
                sanitizer = `Add ${liquidChlorine.gallons.toFixed(2)} gal (${liquidChlorine.flOz.toFixed(0)} fl oz) of 12.5% liquid chlorine.`;
            }
        } else {
            const calHypoOunces = getCalHypoOunces(chlorineInfo.toBeDosed, capacity);
            if (chlorineInfo.toBeDosed > 0.01) {
                sanitizer = `Add ${formatLbsOz(calHypoOunces)} of calcium hypochlorite (73%).`;
            }
        }

        // Return all results needed for display
        res.json({
            lsi: lsi.toFixed(2),
            lsiStatus,
            dosing,
            saltDose,
            sanitizer,
            summary: `LSI: ${lsi.toFixed(2)} (${lsiStatus})`
        });
    } catch (err) {
        res.status(500).json({ error: 'Calculation error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});