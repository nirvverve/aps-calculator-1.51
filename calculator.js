const translations = {
    en: {
        title: "Pool Chemistry Calculator for Residential Pools",
        selectLanguage: "Select a Language",
        selectState: "Select Your State",
        poolCapacity: "Pool Capacity",
        poolCapacityLabel: "Pool Capacity (in gallons):",
        sanitize: "Sanitize to Protect the Bathers",
        freeChlorine: "Free Chlorine (ppm):",
        cyanuric: "Cyanuric Acid (ppm):",
        balance: "Balance to Protect the Pool",
        ph: "pH:",
        alkalinity: "Total Alkalinity (ppm):",
        calcium: "Calcium Hardness (ppm):",
        optional: "Optional: Temperature & TDS Readings",
        tds: "Total Dissolved Solids (ppm):",
        tdsNote: "Note: Default is 1,000 ppm. If using TDS meter, enter actual result.",
        temperature: "Water Temperature (°F):",
        tempNote: "Note: Default is 86 F. Change temperature as as needed (spas, fresh fills, etc.)",
        salt: "Salt Dosing - for Pools Using Salt",
        saltCurrent: "Current Salt Level (ppm):",
        saltCurrentNote: "Note: If pool does not use salt, leave at 0 ppm.",
        saltDesired: "Desired Salt Level (ppm):",
        calculate: "Calculate Chemical Dose Amounts & LSI",
        summaryTitle: "Summary of Chemicals to Add at Today's Visit",
        waitNote: "Wait at least 15 minutes and circulate water before adding any other chemicals.",
        detailsTitle: "Detailed Explanation",
        parameter: "Parameter",
        testResult: "Test Result",
        goldenNumber: "Golden Number",
        chlorineDetailsFL: "Chlorine Dosing Recommendation Details (Florida)",
        chlorineDetailsAZTX: "Chlorine Dosing Recommendation Detail (Arizona / Texas)",
        minFC: "Minimum Free Chlorine Required",
        uvLossFactor: "UV Loss Factor",
        uvLossForWeek: "UV Loss for Week",
        calculatedChlorineDose: "Calculated Chlorine Dose",
        testedFreeChlorine: "Tested Free Chlorine",
        chlorineToBeDosed: "Chlorine to Be Dosed",
        liquidChlorineToAdd: "12.5% Liquid Chlorine to Add",
        calHypoToAdd: "Calcium Hypochlorite (73%) to Add",
        isBalanced: "Is Pool Water Balanced, Corrosive or Scale Forming ?",
        lsiValue: "Saturation Index (LSI) Value",
        adjustmentPlan: "Water Balance Adjustment Plan",
        adjustNow: "Adjust Now:",
        notesNextVisit: "Notes for Next Visit:",
        noImmediate: "No immediate adjustments needed.",
        nextVisitNote: "These changes should be made at the next service visit. Retest the water before making adjustments.",
        errorRequired: "Please fill in all required fields.",
        serverError: "Server error. Please try again later.",
        addAfterTesting: "(Add immediately after testing.)",
        errorRangeCapacity: "Pool capacity must be between 100 and 50,000 gallons.",
        errorRangePh: "pH must be between 6.5 and 8.5.",
        errorRangeAlkalinity: "Alkalinity must be between 0 and 300 ppm.",
        errorRangeCalcium: "Calcium hardness must be between 0 and 1,000 ppm.",
        errorRangeCyanuric: "Cyanuric acid must be between 0 and 300 ppm.",
        errorRangeTds: "TDS must be between 0 and 10,000 ppm.",
        errorRangeSalt: "Salt levels must be between 0 and 10,000 ppm.",
        errorRangeTemperature: "Temperature must be between 32°F and 104°F.",
        units: {
            lbs: "lbs",
            oz: "oz",
            gallons: "gallons",
            flOz: "fl oz"
        },
        acidDoseFlOz: "{amount} fl oz of muriatic acid (31.45%)",
        acidDoseGallons: "{gallons} gallons ({flOz} fl oz) of muriatic acid (31.45%)",
        dosing: {
            alkRaise: "Add {amount} lbs of sodium bicarbonate to raise alkalinity to {target} ppm.",
            calciumRaise: "Add {amount} lbs of calcium chloride to raise calcium hardness to {target} ppm.",
            phRaise: "Add {amount} of soda ash to raise pH to {target}.",
            phLower: "Add {amount} to lower pH to {target}.",
            cyaRaise: "Add {amount} of cyanuric acid (stabilizer) to raise CYA to {target} ppm.",
            salt: "Add {amount} lbs of pool salt ({bags} x 40 lb bags) to reach your desired salt level.",
            alkLower: "Add {amount} of muriatic acid to lower alkalinity from {current} ppm to {target} ppm.",
            alkNoAction: "Alkalinity at {current} ppm is within acceptable range (120-140 ppm). No adjustment needed."
        },
        lsiStatus: {
            veryCorrosive: "Very Corrosive",
            corrosive: "Corrosive",
            slightlyCorrosive: "Slightly Corrosive",
            balanced: "Balanced",
            slightlyScaleForming: "Slightly Scale Forming",
            scaleForming: "Scale Forming"
        },
        sanitizer: {
            liquidChlorineDose: "Add {gallons} gal ({flOz} fl oz) of liquid chlorine (12.5%).",
            calHypoDose: "Add {amount} of granular calcium hypochlorite (73%)."
        },
    },
    es: {
        title: "Calculadora de Química para Piscinas Residenciales",
        selectLanguage: "Seleccione un Idioma",
        selectState: "Seleccione su Estado",
        poolCapacity: "Capacidad de la Piscina",
        poolCapacityLabel: "Capacidad de la piscina (en galones):",
        sanitize: "Desinfectar para Proteger a los Bañistas",
        freeChlorine: "Cloro Libre (ppm):",
        cyanuric: "Ácido Cianúrico (ppm):",
        balance: "Balance para Proteger la Piscina",
        ph: "pH:",
        alkalinity: "Alcalinidad Total (ppm):",
        calcium: "Dureza de Calcio (ppm):",
        optional: "Opcional: Lecturas de Temperatura y TDS",
        tds: "Sólidos Disueltos Totales (ppm):",
        tdsNote: "Nota: El valor predeterminado es 1,000 ppm. Si usa un medidor de TDS, ingrese el resultado real.",
        temperature: "Temperatura del Agua (°F):",
        tempNote: "Nota: El valor predeterminado es 86 F. Cambie la temperatura según sea necesario (spas, llenados nuevos, etc.)",
        salt: "Dosis de Sal - para Piscinas con Sal",
        saltCurrent: "Nivel Actual de Sal (ppm):",
        saltCurrentNote: "Nota: Si la piscina no usa sal, deje en 0 ppm.",
        saltDesired: "Nivel Deseado de Sal (ppm):",
        calculate: "Calcular Dosis Química y LSI",
        summaryTitle: "Resumen de Químicos a Añadir en la Visita de Hoy",
        waitNote: "Espere al menos 15 minutos y circule el agua antes de añadir otros productos químicos.",
        detailsTitle: "Explicación Detallada",
        parameter: "Parámetro",
        testResult: "Resultado de la Prueba",
        goldenNumber: "Valor Ideal",
        chlorineDetailsFL: "Detalles de Dosificación de Cloro (Florida)",
        chlorineDetailsAZTX: "Detalle de Dosificación de Cloro (Arizona / Texas)",
        minFC: "Cloro Libre Mínimo Requerido",
        uvLossFactor: "Factor de Pérdida UV",
        uvLossForWeek: "Pérdida UV para la Semana",
        calculatedChlorineDose: "Dosis de Cloro Calculada",
        testedFreeChlorine: "Cloro Libre Medido",
        chlorineToBeDosed: "Cloro a Dosificar",
        liquidChlorineToAdd: "Cloro Líquido 12.5% a Añadir",
        calHypoToAdd: "Hipoclorito de Calcio (73%) a Añadir",
        isBalanced: "¿El Agua de la Piscina Está Balanceada, Corrosiva o Formadora de Sarro?",
        lsiValue: "Índice de Saturación (LSI)",
        adjustmentPlan: "Plan de Ajuste del Balance del Agua",
        adjustNow: "Ajustar Ahora:",
        notesNextVisit: "Notas para la Próxima Visita:",
        noImmediate: "No se necesitan ajustes inmediatos.",
        nextVisitNote: "Estos cambios deben realizarse en la próxima visita de servicio. Vuelva a analizar el agua antes de hacer ajustes.",
        errorRequired: "Por favor, complete todos los campos obligatorios.",
        serverError: "Error del servidor. Por favor, inténtelo de nuevo más tarde.",
        addAfterTesting: "(Agregue inmediatamente después de la prueba.)",
        errorRangeCapacity: "La capacidad de la piscina debe estar entre 100 y 50,000 galones.",
        errorRangePh: "El pH debe estar entre 6.5 y 8.5.",
        errorRangeAlkalinity: "La alcalinidad debe estar entre 0 y 300 ppm.",
        errorRangeCalcium: "La dureza de calcio debe estar entre 0 y 1,000 ppm.",
        errorRangeCyanuric: "El ácido cianúrico debe estar entre 0 y 300 ppm.",
        errorRangeTds: "Los TDS deben estar entre 0 y 10,000 ppm.",
        errorRangeSalt: "Los niveles de sal deben estar entre 0 y 10,000 ppm.",
        errorRangeTemperature: "La temperatura debe estar entre 32°F y 104°F.",
        units: {
            lbs: "libras",
            oz: "oz",
            gallons: "galones",
            flOz: "fl oz"
        },
        acidDoseFlOz: "{amount} fl oz de ácido muriático (31.45%)",
        acidDoseGallons: "{gallons} galones ({flOz} fl oz) de ácido muriático (31.45%)",
        lsiStatus: {
            veryCorrosive: "Muy corrosivo",
            corrosive: "Corrosivo",
            slightlyCorrosive: "Ligeramente corrosivo",
            balanced: "Balanceado",
            slightlyScaleForming: "Ligeramente formador de sarro",
            scaleForming: "Formador de sarro"
        },
        sanitizer: {
            liquidChlorineDose: "Agregue {gallons} gal ({flOz} fl oz) de cloro líquido (12.5%).",
            calHypoDose: "Agregue {amount} de hipoclorito de calcio granular (73%)."
        },
        dosing: {
            alkRaise: "Agregue {amount} libras de bicarbonato de sodio para aumentar la alcalinidad a {target} ppm.",
            calciumRaise: "Agregue {amount} libras de cloruro de calcio para aumentar la dureza de calcio a {target} ppm.",
            phRaise: "Agregue {amount} de carbonato de sodio para aumentar el pH a {target}.",
            phLower: "Agregue {amount} para bajar el pH a {target}.",
            cyaRaise: "Agregue {amount} de ácido cianúrico (estabilizador) para aumentar el CYA a {target} ppm.",
            salt: "Agregue {amount} libras de sal para piscina ({bags} bolsas de 40 lb) para alcanzar el nivel de sal deseado.",
            alkLower: "Agregue {amount} de ácido muriático para bajar la alcalinidad de {current} ppm a {target} ppm.",
            alkNoAction: "La alcalinidad a {current} ppm está dentro del rango aceptable (120-140 ppm). No se necesita ajuste."
        }
    },
    it: {
        title: "Calcolatrice Chimica per Piscine Residenziali",
        selectLanguage: "Seleziona una Lingua",
        selectState: "Seleziona il tuo Stato",
        poolCapacity: "Capacità della Piscina",
        poolCapacityLabel: "Capacità della piscina (in galloni):",
        sanitize: "Sanificare per Proteggere i Bagnanti",
        freeChlorine: "Cloro Libero (ppm):",
        cyanuric: "Acido Cianurico (ppm):",
        balance: "Bilancia per Proteggere la Piscina",
        ph: "pH:",
        alkalinity: "Alcalinità Totale (ppm):",
        calcium: "Durezza del Calcio (ppm):",
        optional: "Opzionale: Letture di Temperatura e TDS",
        tds: "Solidi Totali Disciolti (ppm):",
        tdsNote: "Nota: Il valore predefinito è 1.000 ppm. Se si utilizza un misuratore TDS, inserire il risultato effettivo.",
        temperature: "Temperatura dell'Acqua (°F):",
        tempNote: "Nota: Il valore predefinito è 86 F. Modificare la temperatura se necessario (spa, riempimenti freschi, ecc.)",
        salt: "Dosaggio del Sale - per Piscine con Sale",
        saltCurrent: "Livello Attuale di Sale (ppm):",
        saltCurrentNote: "Nota: Se la piscina non usa sale, lasciare a 0 ppm.",
        saltDesired: "Livello di Sale Desiderato (ppm):",
        calculate: "Calcola Dosaggio Chimico e LSI",
        summaryTitle: "Riepilogo dei Prodotti Chimici da Aggiungere Oggi",
        waitNote: "Attendere almeno 15 minuti e far circolare l'acqua prima di aggiungere altri prodotti chimici.",
        detailsTitle: "Spiegazione Dettagliata",
        parameter: "Parametro",
        testResult: "Risultato del Test",
        goldenNumber: "Valore Ideale",
        chlorineDetailsFL: "Dettagli Dosaggio Cloro (Florida)",
        chlorineDetailsAZTX: "Dettaglio Dosaggio Cloro (Arizona / Texas)",
        minFC: "Cloro Libero Minimo Richiesto",
        uvLossFactor: "Fattore di Perdita UV",
        uvLossForWeek: "Perdita UV per la Settimana",
        calculatedChlorineDose: "Dose di Cloro Calcolata",
        testedFreeChlorine: "Cloro Libero Misurato",
        chlorineToBeDosed: "Cloro da Dosare",
        liquidChlorineToAdd: "Cloro Liquido 12,5% da Aggiungere",
        calHypoToAdd: "Ipoclorito di Calcio (73%) da Aggiungere",
        isBalanced: "L'acqua della piscina è bilanciata, corrosiva o incrostante?",
        lsiValue: "Indice di Saturazione (LSI)",
        adjustmentPlan: "Piano di Regolazione dell'Equilibrio dell'Acqua",
        adjustNow: "Regola Ora:",
        notesNextVisit: "Note per la Prossima Visita:",
        noImmediate: "Nessuna regolazione immediata necessaria.",
        nextVisitNote: "Queste modifiche dovrebbero essere apportate alla prossima visita di servizio. Ritestare l'acqua prima di effettuare regolazioni.",
        errorRequired: "Si prega di compilare tutti i campi obbligatori.",
        serverError: "Errore del server. Riprova più tardi.",
        addAfterTesting: "(Aggiungere immediatamente dopo il test.)",
        errorRangeCapacity: "La capacità della piscina deve essere compresa tra 100 e 50.000 galloni.",
        errorRangePh: "Il pH deve essere compreso tra 6,5 e 8,5.",
        errorRangeAlkalinity: "L'alcalinità deve essere compresa tra 0 e 300 ppm.",
        errorRangeCalcium: "La durezza del calcio deve essere compresa tra 0 e 1.000 ppm.",
        errorRangeCyanuric: "L'acido cianurico deve essere compreso tra 0 e 300 ppm.",
        errorRangeTds: "I TDS devono essere compresi tra 0 e 10.000 ppm.",
        errorRangeSalt: "I livelli di sale devono essere compresi tra 0 e 10.000 ppm.",
        errorRangeTemperature: "La temperatura deve essere compresa tra 32°F e 104°F.",
        units: {
            lbs: "libbre",
            oz: "oz",
            gallons: "galloni",
            flOz: "fl oz"
        },
        acidDoseFlOz: "{amount} fl oz di acido muriatico (31,45%)",
        acidDoseGallons: "{gallons} galloni ({flOz} fl oz) di acido muriatico (31,45%)",
        lsiStatus: {
            veryCorrosive: "Molto corrosivo",
            corrosive: "Corrosivo",
            slightlyCorrosive: "Leggermente corrosivo",
            balanced: "Bilanciato",
            slightlyScaleForming: "Leggermente incrostante",
            scaleForming: "Incrostante"
        },
        sanitizer: {
            liquidChlorineDose: "Aggiungi {gallons} gal ({flOz} fl oz) di cloro liquido (12,5%).",
            calHypoDose: "Aggiungi {amount} di ipoclorito di calcio granulare (73%)."
        },
        dosing: {
            alkRaise: "Aggiungi {amount} libbre di bicarbonato di sodio per aumentare l'alcalinità a {target} ppm.",
            calciumRaise: "Aggiungi {amount} libbre di cloruro di calcio per aumentare la durezza del calcio a {target} ppm.",
            phRaise: "Aggiungi {amount} di carbonato di sodio per aumentare il pH a {target}.",
            phLower: "Aggiungi {amount} per abbassare il pH a {target}.",
            cyaRaise: "Aggiungi {amount} di acido cianurico (stabilizzatore) per aumentare il CYA a {target} ppm.",
            salt: "Aggiungi {amount} libbre di sale per piscina ({bags} sacchi da 40 lb) per raggiungere il livello di sale desiderato.",
            alkLower: "Aggiungi {amount} di acido muriatico per abbassare l'alcalinità da {current} ppm a {target} ppm.",
            alkNoAction: "L'alcalinità a {current} ppm è nel range accettabile (120-140 ppm). Non è necessaria alcuna regolazione."
        }
    }
};

const cardKeywords = {
    en: {
        ph: 'ph',
        alkalinity: 'alkalinity',
        calcium: 'calcium',
        chlorine: 'chlorine',
        cyanuric: 'cyanuric',
        salt: 'salt'
    },
    es: {
        ph: 'ph',
        alkalinity: 'alcalinidad',
        calcium: 'calcio',
        chlorine: 'cloro',
        cyanuric: 'cianúrico',
        salt: 'sal'
    },
    it: {
        ph: 'ph',
        alkalinity: 'alcalinità',
        calcium: 'calcio',
        chlorine: 'cloro',
        cyanuric: 'cianurico',
        salt: 'sale'
    }
};

function calculateLSIAndAdvice(formData) {
    const lang = formData.lang || 'en';
    const t = translations[lang];
    const keywords = cardKeywords[lang];
   


// State-specific "golden numbers"
const GOLDEN_NUMBERS = {
    arizona: { alkalinity: 120, calcium: 400, ph: 7.5, cya: 80},
    texas:   { alkalinity: 120, calcium: 400, ph: 7.5, cya: 80},
    florida: { alkalinity: 80, calcium: 300, ph: 7.6, cya: 50},
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

function formatAmountOzLb(amountOz, t) {
    if (amountOz > 16) {
        return `${(amountOz / 16).toFixed(2)} ${t.units.lbs}`;
    } else {
        return `${amountOz.toFixed(2)} ${t.units.oz}`;
    }
}

function formatLbsOz(ounces, t) {
    const lbs = Math.floor(ounces / 16);
    const oz = ounces % 16;
    let result = '';
    if (lbs > 0) result += `${lbs} ${t.units.lbs}`;
    if (oz > 0 || lbs === 0) {
        if (result) result += ' ';
        result += `${oz.toFixed(2)} ${t.units.oz}`;
    }
    return result;
}

function acidDoseFlOzGallons(currentPh, targetPh, poolGallons, alkalinity, t) {
    if (currentPh <= targetPh) return null;
    const poolFactor = 30 * (poolGallons / 10000);
    const alkFactor = alkalinity / 100;
    const acidFlOz = (currentPh - targetPh) * poolFactor * alkFactor;
    if (acidFlOz <= 0) return null;
    if (acidFlOz < 128) {
        return t.acidDoseFlOz.replace("{amount}", acidFlOz.toFixed(1));
    } else {
        return t.acidDoseGallons
            .replace("{gallons}", (acidFlOz / 128).toFixed(2))
            .replace("{flOz}", acidFlOz.toFixed(1));
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

// Helper to bold the quantity and units in a dosing sentence
function boldQuantity(sentence) {
    // This regex matches "Add <quantity and units> of"
    return sentence.replace(/(Add\s+)([\d.,\s\(\)a-zA-Z%]+)(\s+of)/i, function(match, p1, p2, p3) {
        return p1 + '<strong>' + p2.trim() + '</strong>' + p3;
    });
}

// Salt dosing calculation (183 lbs raises 1,000 ppm in 10,000 gallons)
function getSaltDose(current, desired, poolGallons) {
    if (desired <= current) return null;
    const ppmNeeded = desired - current;
    // 183 lbs per 1,000 ppm per 10,000 gal
    const lbsNeeded = (ppmNeeded * poolGallons * 183) / (1000 * 10000);
    const bags = Math.ceil(lbsNeeded / 40);
    return { lbsNeeded, bags };
}

function getDosingAdvice(userValue, targetValue, poolGallons, chemType, alkalinity, state, t) {
    console.log(`State: ${state}, ChemType: ${chemType}, Alkalinity: ${alkalinity}, UserValue: ${userValue}, TargetValue: ${targetValue}`);
    let advice = "";
    let amount = 0;
    let diff = targetValue - userValue;

     // Handle high alkalinity for all states
     if (chemType === "alkalinity") {
        if (alkalinity > 150) {
            // Recommend lowering to 120 ppm
            const targetAlk = 120;
            const alkDiff = alkalinity - targetAlk;
            const acidOz = (alkDiff / 10) * 25.64 * (poolGallons / 10000);
            let acidDoseText;
            if (acidOz < 128) {
                acidDoseText = t.acidDoseFlOz.replace("{amount}", acidOz.toFixed(1));
            } else {
                acidDoseText = t.acidDoseGallons
                    .replace("{gallons}", (acidOz / 128).toFixed(2))
                    .replace("{flOz}", acidOz.toFixed(1));
            }
            if (acidDoseText) {
                advice = t.dosing.alkLower
                    .replace("{amount}", acidDoseText)
                    .replace("{current}", alkalinity)
                    .replace("{target}", targetAlk);
            }
            return advice;
        } else {
            // No alkalinity adjustment below 150 ppm
            return "";
        }
    }

    // Skip pH adjustment if we're already lowering alkalinity
    // (since that will also lower pH)
    if (chemType === "ph" && alkalinity > 150) {
        return "";
    }

    // Florida-specific logic
    if (state === "florida") {
        if (chemType === "alkalinity" && userValue < FL_THRESHOLDS.alkalinity) {
            amount = ((targetValue - userValue) / 10) * 1.5 * (poolGallons / 10000);
            advice = t.dosing.alkRaise
                .replace("{amount}", amount.toFixed(2))
                .replace("{target}", targetValue);
        }
        if (chemType === "calcium" && userValue < FL_THRESHOLDS.calcium) {
            amount = ((targetValue - userValue) / 10) * 1.25 * (poolGallons / 10000);
            advice = t.dosing.calciumRaise
                .replace("{amount}", amount.toFixed(2))
                .replace("{target}", targetValue);
        }
        if (chemType === "ph" && Math.abs(diff) >= 0.01) {
            if (diff > 0) {
                amount = (diff / 0.2) * 6 * (poolGallons / 10000);
                advice = t.dosing.phRaise
                    .replace("{amount}", formatAmountOzLb(amount, t))
                    .replace("{target}", targetValue);
            } else if (diff < 0) {
                const acidDose = acidDoseFlOzGallons(userValue, targetValue, poolGallons, alkalinity, t);
                if (acidDose) {
                    advice = t.dosing.phLower
                        .replace("{amount}", acidDose)
                        .replace("{target}", targetValue);
                }
            }
        }
        if (chemType === "cya" && userValue <= FL_THRESHOLDS.cya) {
            amount = ((targetValue - userValue) / 10) * 13 * (poolGallons / 10000);
            advice = t.dosing.cyaRaise
                .replace("{amount}", formatAmountOzLb(amount, t))
                .replace("{target}", targetValue);
        }
        return advice;
    }

    // Default logic for other states
    if (chemType === "alkalinity" && diff > 0) {
        amount = (diff / 10) * 1.5 * (poolGallons / 10000);
        advice = t.dosing.alkRaise
            .replace("{amount}", amount.toFixed(2))
            .replace("{target}", targetValue);
    }
    if (chemType === "calcium" && diff > 0) {
        amount = (diff / 10) * 1.25 * (poolGallons / 10000);
        advice = t.dosing.calciumRaise
            .replace("{amount}", amount.toFixed(2))
            .replace("{target}", targetValue);
    }
    if (chemType === "ph") {
        if (diff > 0) {
            amount = (diff / 0.2) * 6 * (poolGallons / 10000);
            advice = t.dosing.phRaise
                .replace("{amount}", formatAmountOzLb(amount, t))
                .replace("{target}", targetValue);
        } else if (diff < 0) {
            const acidDose = acidDoseFlOzGallons(userValue, targetValue, poolGallons, alkalinity, t);
            if (acidDose) {
                advice = t.dosing.phLower
                    .replace("{amount}", acidDose)
                    .replace("{target}", targetValue);
            }
        }
    }
    if (chemType === "cya" && diff > 0) {
        amount = (diff / 10) * 13 * (poolGallons / 10000);
        advice = t.dosing.cyaRaise
            .replace("{amount}", formatAmountOzLb(amount, t))
            .replace("{target}", targetValue);
    }
    return advice;

}
// Main backend calculation function

    // Parse all values from formData (all should be numbers except state)
    const state = formData.state;
    const poolGallons = parseFloat(formData.capacity);
    const ph = parseFloat(formData.ph);
    const alkalinity = parseFloat(formData.alkalinity);
    const calcium = parseFloat(formData.calcium);
    const temperature = parseFloat(formData.temperature);
    const tds = parseFloat(formData.tds) || 0;
    const cyanuric = parseFloat(formData.cyanuric) || 0;
    const freeChlorine = parseFloat(formData.freechlorine);
    const saltCurrent = parseFloat(formData['salt-current']) || 0;
    const saltDesired = parseFloat(formData['salt-desired']) || 0;

    if (poolGallons < 500 || poolGallons > 50000) {
        return { html: `<p class="error">${t.errorRangeCapacity}</p>` };
    }
    
    if (ph < 6.5 || ph > 8.5) {
        return { html: `<p class="error">${t.errorRangePh}</p>` };
    }
    
    if (alkalinity < 0 || alkalinity > 300) {
        return { html: `<p class="error">${t.errorRangeAlkalinity}</p>` };
    }
    
    if (calcium < 0 || calcium > 1000) {
        return { html: `<p class="error">${t.errorRangeCalcium}</p>` };
    }
    
    if (cyanuric < 0 || cyanuric > 300) {
        return { html: `<p class="error">${t.errorRangeCyanuric}</p>` };
    }
    
    if (tds < 0 || tds > 10000) {
        return { html: `<p class="error">${t.errorRangeTds}</p>` };
    }
    
    if (saltCurrent < 0 || saltCurrent > 10000 || saltDesired < 0 || saltDesired > 10000) {
        return { html: `<p class="error">${t.errorRangeSalt}</p>` };
    }

    if (temperature < 50 || temperature > 104) {
        return { html: `<p class="error">${t.errorRangeTemperature}</p>` };
    }

    // Input validation
    if (
        isNaN(poolGallons) || isNaN(ph) || isNaN(alkalinity) || isNaN(calcium) ||
        isNaN(temperature) || isNaN(cyanuric) || isNaN(freeChlorine)
    ) {
        return { html: `<p class="error">${t.errorRequired}</p>` };
    }

    let correctedAlkalinity = alkalinity - (cyanuric / 3);
    if (correctedAlkalinity < 0) correctedAlkalinity = 0;

    const alkalinityFactor = getFactor(correctedAlkalinity, ALKALINITY_FACTORS);
    const calciumFactor = getFactor(calcium, CALCIUM_FACTORS);
    const tempFactor = getFactor(temperature, TEMP_FACTORS, 'temp');
    const tdsFactor = getTDSFactor(tds);

    const lsi = ph + calciumFactor + alkalinityFactor + tempFactor - tdsFactor;

    let golden = GOLDEN_NUMBERS[state];

    const dosing = {
        ph: getDosingAdvice(ph, golden.ph, poolGallons, "ph", alkalinity, state, t),
        alkalinity: getDosingAdvice(correctedAlkalinity, golden.alkalinity, poolGallons, "alkalinity", alkalinity, state, t),
        cya: getDosingAdvice(cyanuric, golden.cya, poolGallons, "cya", alkalinity, state, t),
        calcium: getDosingAdvice(calcium, golden.calcium, poolGallons, "calcium", alkalinity, state, t)
    };

    let weeks = [[], [], []];
    if (alkalinity > 150) {
        weeks[0].push('alkalinity');
    }
    if (ph < 7.5 && correctedAlkalinity <= 80 && dosing.alkalinity) {
        weeks[0].push('alkalinity');
        let nc = [];
        if (
            (state === "florida" && cyanuric <= FL_THRESHOLDS.cya) ||
            (state !== "florida" && cyanuric < golden.cya - 10)
        ) nc.push('cya');
        if (
            (state === "florida" && calcium < FL_THRESHOLDS.calcium) ||
            (state !== "florida" && calcium < 200)
        ) nc.push('calcium');
        if (nc[0]) weeks[1].push(nc[0]);
        if (nc[1]) weeks[2].push(nc[1]);
    } else {
        let nonCritical = [];
        if (
            (state === "florida" && correctedAlkalinity < FL_THRESHOLDS.alkalinity) ||
            (state !== "florida" && (correctedAlkalinity < 80 || correctedAlkalinity > 140))
        ) nonCritical.push('alkalinity');
        if (
            (state === "florida" && cyanuric <= FL_THRESHOLDS.cya) ||
            (state !== "florida" && cyanuric < golden.cya - 10)
        ) nonCritical.push('cya');
        if (
            (state === "florida" && calcium < FL_THRESHOLDS.calcium) ||
            (state !== "florida" && calcium < 200)
        ) nonCritical.push('calcium');
        if (ph < 7.2 || ph > 7.8) weeks[0].push('ph');
        if (nonCritical[0]) weeks[0].push(nonCritical[0]);
        if (nonCritical[1]) weeks[1].push(nonCritical[1]);
        if (nonCritical[2]) weeks[2].push(nonCritical[2]);
    }

    let adjustNow = [];
    let nextVisit = [];

    weeks.forEach((params, idx) => {
        if (idx === 0 && params.length > 0) {
            params.forEach(param => {
                if (dosing[param]) adjustNow.push(dosing[param]);
            });
        }
        if (idx > 0 && params.length > 0) {
            params.forEach(param => {
                if (dosing[param]) nextVisit.push(dosing[param]);
            });
        }
    });

    let lsiStatus;
    if (lsi < -0.5) {
        lsiStatus = t.lsiStatus.veryCorrosive;
    } else if (lsi >= -0.5 && lsi < -0.2) {
        lsiStatus = t.lsiStatus.corrosive;
    } else if (lsi >= -0.2 && lsi < -0.05) {
        lsiStatus = t.lsiStatus.slightlyCorrosive;
    } else if (lsi >= -0.05 && lsi <= 0.3) {
        lsiStatus = t.lsiStatus.balanced;
    } else if (lsi > 0.3 && lsi <= 0.5) {
        lsiStatus = t.lsiStatus.slightlyScaleForming;
    } else {
        lsiStatus = t.lsiStatus.scaleForming;
    }

    const chlorineInfo = getChlorinePPMDose(freeChlorine, cyanuric);

    // Salt dosing
    let saltDose = null;
    if (saltDesired > 0 && saltCurrent >= 0 && saltDesired > saltCurrent) {
        saltDose = getSaltDose(saltCurrent, saltDesired, poolGallons);
    }

    // --- Build summary of chemicals to add now ---
    let summaryList = [];
    let acidList = [];
    let otherList = [];

    // Add muriatic acid (for lowering pH) first, if present
    adjustNow.forEach(item => {
        if (item && item.toLowerCase().includes("muriatic acid")) {
            acidList.push(boldQuantity(item) + ` <em>${t.addAfterTesting}</em>`);
        }
    });

    // Add salt if needed
    if (saltDose && saltDose.lbsNeeded > 0.01) {
        otherList.push(
            boldQuantity(
                t.dosing.salt
                    .replace("{amount}", saltDose.lbsNeeded.toFixed(2))
                    .replace("{bags}", saltDose.bags)
            )
        );
    }

    // Add other balancing chems and sanitizer, but do not mix acid and chlorine
    adjustNow.forEach(item => {
        if (item && !item.toLowerCase().includes("muriatic acid")) {
            otherList.push(boldQuantity(item));
        }
    });

    // Add sanitizer (chlorine) if needed, but not in same group as acid
    if (state === "florida") {
        const liquidChlorine = getLiquidChlorineDose(chlorineInfo.toBeDosed, poolGallons);
        if (chlorineInfo.toBeDosed > 0.01) {
            otherList.push(
                boldQuantity(
                    t.sanitizer.liquidChlorineDose
                        .replace("{gallons}", liquidChlorine.gallons.toFixed(2))
                        .replace("{flOz}", liquidChlorine.flOz.toFixed(0))
                )
            );
        }
    } else {
        const calHypoOunces = getCalHypoOunces(chlorineInfo.toBeDosed, poolGallons);
        if (chlorineInfo.toBeDosed > 0.01) {
            otherList.push(
                boldQuantity(
                    t.sanitizer.calHypoDose.replace("{amount}", formatLbsOz(calHypoOunces, t))
                )
            );
        }
    }
    // --- Build comparison chart ---
    function chartRow(label, current, golden) {
        return `<tr><td>${label}</td><td>${current}</td><td>${golden}</td></tr>`;
    }
    let comparisonTable = `
    <table style="width:100%;max-width:500px;margin:1em auto;border-collapse:collapse;">
    <thead>
    <tr>
    <th style="border-bottom:1px solid #ccc;">${t.parameter}</th>
    <th style="border-bottom:1px solid #ccc;">${t.testResult}</th>
    <th style="border-bottom:1px solid #ccc;">${t.goldenNumber}</th>
    </tr>
    </thead>
    <tbody>
    ${chartRow(t.ph, ph, golden.ph)}
    ${chartRow(t.alkalinity, alkalinity, golden.alkalinity)}
    ${chartRow(t.calcium, calcium, golden.calcium)}
    ${chartRow(t.cyanuric, cyanuric, golden.cya)}
    </tbody>
    </table>
  `;

  let chlorineHTML = "";
  if (state === "florida") {
      const liquidChlorine = getLiquidChlorineDose(chlorineInfo.toBeDosed, poolGallons);
      chlorineHTML = `
      <h4>${t.chlorineDetailsFL}</h4>
      <ul>
          <li>${t.minFC}: ${chlorineInfo.minFC.toFixed(2)} ppm</li>
          <li>${t.uvLossFactor}: ${chlorineInfo.lossFactor} ppm/day</li>
          <li>${t.uvLossForWeek}: ${chlorineInfo.uvLoss.toFixed(2)} ppm</li>
          <li>${t.calculatedChlorineDose}: ${chlorineInfo.calculatedDose.toFixed(2)} ppm</li>
          <li>${t.testedFreeChlorine}: ${freeChlorine.toFixed(2)} ppm</li>
          <li><strong>${t.chlorineToBeDosed}: ${chlorineInfo.toBeDosed.toFixed(2)} ppm</strong></li>
          <li><strong>${t.liquidChlorineToAdd}: ${liquidChlorine.gallons.toFixed(2)} gal (${liquidChlorine.flOz.toFixed(0)} fl oz)</strong></li>
      </ul>
      `;
  } else {
      const calHypoOunces = getCalHypoOunces(chlorineInfo.toBeDosed, poolGallons);
      chlorineHTML = `
      <h4>${t.chlorineDetailsAZTX}</h4>
      <ul>
          <li>${t.minFC}: ${chlorineInfo.minFC.toFixed(2)} ppm</li>
          <li>${t.uvLossFactor}: ${chlorineInfo.lossFactor} ppm/day</li>
          <li>${t.uvLossForWeek}: ${chlorineInfo.uvLoss.toFixed(2)} ppm</li>
          <li>${t.calculatedChlorineDose}: ${chlorineInfo.calculatedDose.toFixed(2)} ppm</li>
          <li>${t.testedFreeChlorine}: ${freeChlorine.toFixed(2)} ppm</li>
          <li><strong>${t.chlorineToBeDosed}: ${chlorineInfo.toBeDosed.toFixed(2)} ppm</strong></li>
          <li><strong>${t.calHypoToAdd}: ${formatLbsOz(calHypoOunces, t)}</strong></li>
      </ul>
      `;
    }

    // --- Build the final HTML string ---
    const html = `
    <h3>${t.summaryTitle}</h3>
    ${acidList.length > 0 ? `
      <div class="chem-card acid">
      ${acidList.map(item => `<div>${item}</div>`).join('')}
      </div>
      <div style="margin-bottom:0.5em;"><em>${t.waitNote}</em></div>
    ` : ''}
${otherList.map(item => {
    let cardClass = '';
    if (item.toLowerCase().includes(keywords.ph)) cardClass = 'ph';
    else if (item.toLowerCase().includes(keywords.alkalinity)) cardClass = 'alk';
    else if (item.toLowerCase().includes(keywords.calcium)) cardClass = 'ch';
    else if (item.toLowerCase().includes(keywords.chlorine)) cardClass = 'fac';
    else if (item.toLowerCase().includes(keywords.cyanuric)) cardClass = 'cya';
    else if (item.toLowerCase().includes(keywords.salt)) cardClass = 'salt';
    return `<div class="chem-card ${cardClass}">${item}</div>`;
}).join('')}

<h3>${t.detailsTitle}</h3>
${comparisonTable}
${chlorineHTML}

<h3>${t.isBalanced}</h3>
<p>${lsiStatus}</p>

<h3>${t.lsiValue}</h3>
<p>${lsi.toFixed(2)}</p>

<h3>${t.adjustmentPlan}</h3>
<ul>
${adjustNow.length > 0
    ? `<li><strong>${t.adjustNow}</strong><ul>${adjustNow.map(item => `<li>${item}</li>`).join('')}</ul></li>`
    : `<li>${t.noImmediate}</li>`
  }
  ${nextVisit.length > 0
    ? `<li><strong>${t.notesNextVisit}</strong><ul>${nextVisit.map(item => `<li>${item}</li>`).join('')}<li><em>${t.nextVisitNote}</em></li></ul></li>`
    : ''
  }
</ul>
`;

    return { html };
}
module.exports = { calculateLSIAndAdvice };