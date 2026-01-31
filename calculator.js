// Add the 'fs' module for file system operations and 'path' for constructing file paths
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path'); 

// Define the path for the log file (outside the served directory for security)
const LOG_DIR = path.join(__dirname, '..', 'aps_logs');
const LOG_FILE_PATH = path.join(LOG_DIR, 'user_activity.log');
const ensureLogDir = fsPromises.mkdir(LOG_DIR, { recursive: true }).catch((err) => {
    console.error('Failed to create log directory:', err);
});

// Function to log data
function logUserData(dataToLog) {
    const logEntry = {
        timestamp: new Date().toISOString(), // Add a timestamp to the log
        data: dataToLog
    };
    const logString = JSON.stringify(logEntry) + '\n'; // Convert to JSON string and add a newline

    // Append to the log file
    ensureLogDir
        .then(() => fsPromises.appendFile(LOG_FILE_PATH, logString))
        .catch((err) => {
            // Log an error to the console if writing to the file fails
            // In a production app, you might use a more robust error logging mechanism
            console.error('Failed to write to user activity log:', err);
        });
} 
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
        waitNote: "Wait at least 10 minutes and circulate water before adding any other chemicals.",
        detailsTitle: "Detailed Explanation",
        currentLabel: "Current:",
        targetLabel: "Target:",
        waterChemistryTitle: "Water Chemistry Parameters",
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
        notesNextVisit: "Remaining Steps to Balance Water:",
        noImmediate: "No immediate adjustments needed.",
        nextVisitNote: "These changes should be made at the next service visit(s). Retest the water before making adjustments.",
        errorRequired: "Please fill in all required fields.",
        serverError: "Server error. Please try again later.",
        addAfterTesting: "Add immediately after adding bicarbonate (if applicable). Otherwise, add after testing.",
        errorRangeCapacity: "Pool capacity must be between 500 and 50,000 gallons.",
        errorRangePh: "pH must be between 6.5 and 8.5.",
        errorRangeAlkalinity: "Alkalinity must be between 10 and 300 ppm.",
        alkalinityZeroNote: "Note: The calculator requires a minimum alkalinity entry of 10 ppm. If your manual test shows 0 ppm, enter 10 ppm in the calculator.",
        errorRangeCalcium: "Calcium hardness must be between 0 and 1,000 ppm.",
        errorRangeCyanuric: "Cyanuric acid must be between 0 and 300 ppm.",
        errorRangeTds: "TDS must be between 0 and 10,000 ppm.",
        errorRangeSalt: "Salt levels must be between 0 and 10,000 ppm.",
        errorRangeTemperature: "Temperature must be between 33°F and 104°F.",
        errorRangeFreeChlorine: "Free chlorine must be between 0 and 30 ppm.",
        units: {
            lbs: "lbs",
            oz: "oz",
            gallons: "gallons",
            flOz: "fl oz"
        },
        acidDoseFlOz: "{amount} fl oz of muriatic acid ",
        acidDoseGallons: "{gallons} gallons ({flOz} fl oz) of muriatic acid ",
        dosing: {
            alkRaise: "Add {amount} lbs of sodium bicarbonate to raise alkalinity to {target} ppm.",
            calciumRaise: "Add {amount} lbs of calcium chloride to raise calcium hardness to {target} ppm.",
            phRaise: "Add {amount} of soda ash to raise pH to {target}.",
            phLower: "Add {amount} to lower pH to {target}.",
            cyaRaise: "Add {amount} of cyanuric acid (stabilizer) to raise CYA to {target} ppm.",
            salt: "Add {amount} lbs of pool salt ({bags} x 40 lb bags) to reach your desired salt level.",
            alkLower: "Add {amount} to lower alkalinity from {current} ppm to {target} ppm.",
            alkNoAction: "Alkalinity at {current} ppm is within acceptable range (120-140 ppm). No adjustment needed.",
            alkHighWarning: "Alkalinity is unusually high. Please retest to confirm the result, especially if there was a significant change from the previous visit. Report this high alkalinity reading to your area manager or assistant director before dosing."
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
            calHypoDose: "Add {amount} of granular calcium hypochlorite (73%).",
            lowChlorineSaltWarning: "Free chlorine is very low. Verify the salt system is working properly. Add the supplemental chlorine dose below to prevent algae. This is in addition to any salt that is also needed.",
            saltChlorineHigh: "No supplemental free chlorine dose is necessary today. Consider reducing salt system output.",
            saltChlorineInRange: "Tested free chlorine is within target range, no supplemental chlorine dose is necessary today.",
            chlorineDetailsSalt: "Salt Pools - Supplemental Chlorine",
            targetFCSalt: "Target Free Chlorine",
            saltChlorineBelowTarget: "Tested free chlorine is below target. In addition to any required salt dose, turn up the salt generator output to keep the water clear and algae-free.",
            supplementalDoseSalt: "Chlorine to Add"
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
        waitNote: "Espere al menos 10 minutos y circule el agua antes de añadir otros productos químicos.",
        detailsTitle: "Explicación Detallada",
        currentLabel: "Actual:",
        targetLabel: "Objetivo:",
        waterChemistryTitle: "Parámetros de Química del Agua",
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
        addAfterTesting: "Agregar inmediatamente después de añadir bicarbonato (si aplica). De lo contrario, agregar después de la prueba.",
        errorRangeCapacity: "La capacidad de la piscina debe estar entre 500 y 50,000 galones.",
        errorRangePh: "El pH debe estar entre 6.5 y 8.5.",
        errorRangeAlkalinity: "La alcalinidad debe estar entre 10 y 300 ppm.",
        alkalinityZeroNote: "Nota: La calculadora requiere un mínimo de 10 ppm de alcalinidad. Si la prueba manual marca 0 ppm, ingrese 10 ppm en la calculadora.",
        errorRangeCalcium: "La dureza de calcio debe estar entre 0 y 1,000 ppm.",
        errorRangeCyanuric: "El ácido cianúrico debe estar entre 0 y 300 ppm.",
        errorRangeTds: "Los TDS deben estar entre 0 y 10,000 ppm.",
        errorRangeSalt: "Los niveles de sal deben estar entre 0 y 10,000 ppm.",
        errorRangeTemperature: "La temperatura debe estar entre 33°F y 104°F.",
        errorRangeFreeChlorine: "El cloro libre debe estar entre 0 y 30 ppm.",
        units: { 
            lbs: "libras",
            oz: "oz",
            gallons: "galones",
            flOz: "fl oz"
        },
        acidDoseFlOz: "{amount} fl oz de ácido muriático",
        acidDoseGallons: "{gallons} galones ({flOz} fl oz) de ácido muriático",
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
            calHypoDose: "Agregue {amount} de hipoclorito de calcio granular (73%).",
            lowChlorineSaltWarning: "El cloro libre está críticamente bajo. Verifique que el sistema de sal funcione correctamente. Agregue la dosis de cloro suplementaria que se muestra a continuación para prevenir algas. Esto es adicional a cualquier sal que también se necesite.",
            saltChlorineBelowTarget: "El cloro libre medido está por debajo del objetivo. Además de cualquier dosis de sal requerida, aumente la producción del generador de sal para mantener el agua clara y libre de algas.",
            saltChlorineHigh: "No es necesaria una dosis suplementaria de cloro libre. Considere reducir la producción del sistema de sal.",
            saltChlorineInRange: "El cloro libre medido está dentro del rango objetivo, no es necesaria una dosis suplementaria de cloro.",
            chlorineDetailsSalt: "Recomendación de Cloro para Piscina de Sal",
            targetFCSalt: "Cloro Libre Objetivo (basado en CYA)",
            supplementalDoseSalt: "Cloro Suplementario a Añadir (ppm)"
        },
        dosing: {
            alkRaise: "Agregue {amount} libras de bicarbonato de sodio para aumentar la alcalinidad a {target} ppm.",
            calciumRaise: "Agregue {amount} libras de cloruro de calcio para aumentar la dureza de calcio a {target} ppm.",
            phRaise: "Agregue {amount} de carbonato de sodio para aumentar el pH a {target}.",
            phLower: "Agregue {amount} para bajar el pH a {target}.",
            cyaRaise: "Agregue {amount} de ácido cianúrico (estabilizador) para aumentar el CYA a {target} ppm.",
            salt: "Agregue {amount} libras de sal para piscina ({bags} bolsas de 40 lb) para alcanzar el nivel de sal deseado.",
            alkLower: "Agregue {amount} para bajar la alcalinidad de {current} ppm a {target} ppm.",
            alkNoAction: "La alcalinidad a {current} ppm está dentro del rango aceptable (120-140 ppm). No se necesita ajuste.",
            alkHighWarning: "La alcalinidad es inusualmente alta. Vuelva a realizar la prueba para confirmar el resultado, especialmente si hubo un cambio significativo desde la visita anterior. Informe esta lectura alta de alcalinidad a su gerente de área o director asistente antes de aplicar la dosis."
    
        },

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
        waitNote: "Attendere almeno 10 minuti e far circolare l'acqua prima di aggiungere altri prodotti chimici.",
        detailsTitle: "Spiegazione Dettagliata",
        currentLabel: "Attuale:",
        targetLabel: "Obiettivo:",
        waterChemistryTitle: "Parametri della Chimica dell'Acqua",
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
        addAfterTesting: "Aggiungere immediatamente dopo aver aggiunto bicarbonato (se applicabile). Altrimenti aggiungere dopo il test.",
        errorRangeCapacity: "La capacità della piscina deve essere compresa tra 500 e 50.000 galloni.",
        errorRangePh: "Il pH deve essere compreso tra 6,5 e 8,5.",
        errorRangeAlkalinity: "L'alcalinità deve essere compresa tra 10 e 300 ppm.",
        alkalinityZeroNote: "Nota: Il calcolatore richiede un minimo di 10 ppm di alcalinità. Se il test manuale mostra 0 ppm, inserisci 10 ppm nel calcolatore.",
        errorRangeCalcium: "La durezza del calcio deve essere compresa tra 0 e 1.000 ppm.",
        errorRangeCyanuric: "L'acido cianurico deve essere compreso tra 0 e 300 ppm.",
        errorRangeTds: "I TDS devono essere compresi tra 0 e 10.000 ppm.",
        errorRangeSalt: "I livelli di sale devono essere compresi tra 0 e 10.000 ppm.",
        errorRangeTemperature: "La temperatura deve essere compresa tra 33°F e 104°F.",
        errorRangeFreeChlorine: "Il cloro libero deve essere compreso tra 0 e 30 ppm.",
        units: {
            lbs: "libbre",
            oz: "oz",
            gallons: "galloni",
            flOz: "fl oz"
        },
        acidDoseFlOz: "{amount} fl oz di acido muriatico",
        acidDoseGallons: "{gallons} galloni ({flOz} fl oz) di acido muriatico",
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
            calHypoDose: "Aggiungi {amount} di ipoclorito di calcio granulare (73%).",
            lowChlorineSaltWarning: "Il cloro libero è a un livello critico. Verificare che il sistema a sale funzioni correttamente. Aggiungere la dose di cloro supplementare indicata di seguito per prevenire le alghe. Questo in aggiunta a qualsiasi sale che sia anche necessario.",
            saltChlorineHigh: "Non è necessaria alcuna dose supplementare di cloro libero oggi. Considerare la possibilità di ridurre la produzione del sistema a sale.",
            saltChlorineInRange: "Il cloro libero testato rientra nell'intervallo target, non è necessaria alcuna dose di cloro supplementare oggi.",
            chlorineDetailsSalt: "Raccomandazione Cloro per Piscina a Sale",
            saltChlorineBelowTarget: "Il cloro è al di sotto dell'obiettivo. Oltre a qualsiasi dose di sale richiesta, aumentare la produzione del generatore di sale per mantenere l'acqua limpida e senza alghe.",
            targetFCSalt: "Cloro Libero Target (in base al CYA)",
            supplementalDoseSalt: "Cloro Supplementare da Aggiungere (ppm)"
        },
        dosing: {
            alkRaise: "Aggiungi {amount} libbre di bicarbonato di sodio per aumentare l'alcalinità a {target} ppm.",
            calciumRaise: "Aggiungi {amount} libbre di cloruro di calcio per aumentare la durezza del calcio a {target} ppm.",
            phRaise: "Aggiungi {amount} di carbonato di sodio per aumentare il pH a {target}.",
            phLower: "Aggiungi {amount} per abbassare il pH a {target}.",
            cyaRaise: "Aggiungi {amount} di acido cianurico (stabilizzatore) per aumentare il CYA a {target} ppm.",
            salt: "Aggiungi {amount} libbre di sale per piscina ({bags} sacchi da 40 lb) per raggiungere il livello di sale desiderato.",
            alkLower: "Aggiungi {amount} per abbassare l'alcalinità da {current} ppm a {target} ppm.",
            alkNoAction: "L'alcalinità a {current} ppm è nel range accettabile (120-140 ppm). Non è necessaria alcuna regolazione.",
            alkHighWarning: "L'alcalinità è insolitamente alta. Si prega di ripetere il test per confermare il risultato, specialmente se c'è stato un cambiamento significativo rispetto alla visita precedente. Segnalare questa lettura di alcalinità elevata al proprio responsabile di zona o vicedirettore prima del dosaggio."
    
        },
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
    logUserData(formData);

    const rawLang = typeof formData.lang === 'string' ? formData.lang.toLowerCase() : '';
    const lang = translations[rawLang] ? rawLang : 'en';
    const t = translations[lang];
    const keywords = cardKeywords[lang];
    if (!translations[rawLang] || !cardKeywords[rawLang]) {
        return { html: `<p class="error">${t.errorRequired}</p>` };
    }

    const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== '';
   
// State-specific "golden numbers"
const GOLDEN_NUMBERS = {
    arizona: { alkalinity: 120, calcium: 400, ph: 7.5, cya: 80},
    texas:   { alkalinity: 120, calcium: 400, ph: 7.5, cya: 80},
    florida: { alkalinity: 80, calcium: 300, ph: 7.6, cya: 50},
    jacksonville: { alkalinity: 80, calcium: 300, ph: 7.6, cya: 50},
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

// Helper to bold the quantity and units in a dosing sentence (supports en/es/it)
function boldQuantity(sentence) {
    // Match "Add/Agregue/Aggiungi <quantity and units> of/de/di/para/per"
    return sentence.replace(/((?:Add|Agregue|Aggiungi)\s+)([\d.,\s\(\)a-zA-Z%]+?)(\s+(?:of|de|di|para|per)\b)/i, function(match, p1, p2, p3) {
        return p1 + '<strong>' + p2.trim() + '</strong>' + p3;
    });
}
/**
 * Estimate new pH after raising alkalinity using the Henderson-Hasselbalch equation.
 * @param {number} currentPh - The current pH of the pool.
 * @param {number} currentAlk - The current alkalinity (ppm as CaCO3).
 * @param {number} targetAlk - The target alkalinity after bicarb addition (ppm as CaCO3).
 * @returns {number} The estimated new pH after bicarb addition.
 */
function estimatePhAfterBicarb(currentPh, currentAlk, targetAlk) {
    if (currentAlk <= 0 || targetAlk <= 0) return currentPh; // avoid division by zero
    // ΔpH = log10(targetAlk / currentAlk)
    return currentPh + Math.log10(targetAlk / currentAlk);
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

// ... rest of code remains same

function getDosingAdvice(userValue, targetValue, poolGallons, chemType, alkalinity, state, t, ph, saltDesired) {
    let advice = "";
    let amount = 0;
    let diff = targetValue - userValue;

    // Handle high alkalinity for all states first, as it's a special case that overrides other dosing
    if (chemType === "alkalinity" && alkalinity > 150) {
        let highAlkAdvice = "";
        // Add warning if alkalinity is 160 ppm or higher
        if (alkalinity >= 160) {
            highAlkAdvice += `<div class="warning-text">${t.dosing.alkHighWarning}</div>`;
        }
        
        // Recommend lowering to 120 ppm, but only display 50% of the required acid dose
        const targetAlk = 120;
        const alkDiff = alkalinity - targetAlk;
        const fullAcidOz = (alkDiff / 10) * 25.64 * (poolGallons / 10000);
        const acidOz = fullAcidOz / 2; // Display 50% of the dose
        
        let acidDoseText;
        if (acidOz < 128) {
            acidDoseText = t.acidDoseFlOz.replace("{amount}", acidOz.toFixed(1));
        } else {
            acidDoseText = t.acidDoseGallons
                .replace("{gallons}", (acidOz / 128).toFixed(2))
                .replace("{flOz}", acidOz.toFixed(1));
        }
        if (acidDoseText) {
            highAlkAdvice += t.dosing.alkLower
                .replace("{amount}", acidDoseText)
                .replace("{current}", alkalinity)
                .replace("{target}", targetAlk);
        }
        return highAlkAdvice;
    }

    // Skip pH adjustment if we're already lowering alkalinity (since that also lowers pH)
    if (chemType === "ph" && alkalinity > 150) {
        return "";
    }

    // --- Alkalinity Dosing Logic ---
    if (chemType === "alkalinity") {
        // Case 1: Florida & Jacksonville Salt Pool
        if ((state === "florida" || state === "jacksonville") && saltDesired > 0) {
        if (alkalinity < 90) { // Dose if below 90 ppm
        const targetAlk = 120; // Target is 120 ppm
        amount = ((targetAlk - alkalinity) / 10) * 1.5 * (poolGallons / 10000);
        const bicarbText = t.dosing.alkRaise
        .replace("{amount}", amount.toFixed(2))
        .replace("{target}", targetAlk);
    
        let acidText = null;
        if (ph !== undefined && alkalinity > 0) {
        const estimatedPh = estimatePhAfterBicarb(ph, alkalinity, targetAlk);
        const targetPh = state === 'jacksonville' ? 7.4 : 7.6; // Use 7.4 for JAX salt pools, 7.6 for FL
        if (estimatedPh > targetPh) { 
        const acidDose = acidDoseFlOzGallons(estimatedPh, targetPh, poolGallons, targetAlk, t);
        if (acidDose) {
        acidText = t.dosing.phLower
        .replace("{amount}", acidDose)
        .replace("{target}", targetPh);
        }
        }
        }
        return { bicarb: bicarbText, acid: acidText };
        }
        return ""; // Alkalinity is fine (>= 90 ppm)
        }

        // Case 2: Florida Non-Salt Pool
        if (state === "florida" || state === "jacksonville") {
            if (alkalinity <= FL_THRESHOLDS.alkalinity) { // Dose if <= 60 ppm
            const targetAlk = 80; // Target is 80 ppm
            amount = ((targetAlk - alkalinity) / 10) * 1.5 * (poolGallons / 10000);
                const bicarbText = t.dosing.alkRaise
                    .replace("{amount}", amount.toFixed(2))
                    .replace("{target}", targetAlk);

                let acidText = null;
                if (ph !== undefined && alkalinity > 0) {
                    const estimatedPh = estimatePhAfterBicarb(ph, alkalinity, targetAlk);
                    if (estimatedPh > 7.6) { // Florida pH target
                        const acidDose = acidDoseFlOzGallons(estimatedPh, 7.6, poolGallons, targetAlk, t);
                        if (acidDose) {
                            acidText = t.dosing.phLower
                                .replace("{amount}", acidDose)
                                .replace("{target}", 7.6);
                        }
                    }
                }
                return { bicarb: bicarbText, acid: acidText };
            }
            return ""; // Alkalinity is fine (> 60 ppm)
        }

        // Case 3: AZ/TX Pools (Salt or Non-Salt)
        if ((state === "arizona" || state === "texas")) {
            if (alkalinity < 100) { // Dose if below 100 ppm
                const targetAlk = 120; // Target is 120 ppm
                amount = ((targetAlk - alkalinity) / 10) * 1.5 * (poolGallons / 10000);
                const bicarbText = t.dosing.alkRaise
                    .replace("{amount}", amount.toFixed(2))
                    .replace("{target}", targetAlk);

                let acidText = null;
                if (ph !== undefined && alkalinity > 0) {
                    const estimatedPh = estimatePhAfterBicarb(ph, alkalinity, targetAlk);
                    if (estimatedPh > 7.5) { // AZ/TX pH target
                        const acidDose = acidDoseFlOzGallons(estimatedPh, 7.5, poolGallons, targetAlk, t);
                        if (acidDose) {
                            acidText = t.dosing.phLower
                                .replace("{amount}", acidDose)
                                .replace("{target}", 7.5);
                        }
                    }
                }
                return { bicarb: bicarbText, acid: acidText };
            }
            return ""; // Alkalinity is fine (>= 100 ppm)
        }
        
        return ""; // Fallback for safety
    }

    // --- Other Chemical Dosing Logic ---

    // Florida-specific logic for non-alkalinity chems
    if (state === "florida" || state === "jacksonville") {
        if (chemType === "calcium" && userValue < FL_THRESHOLDS.calcium) {
            amount = ((targetValue - userValue) / 10) * 1.25 * (poolGallons / 10000);
            advice = t.dosing.calciumRaise
                .replace("{amount}", amount.toFixed(2))
                .replace("{target}", targetValue);
        }
        if (chemType === "ph" && Math.abs(diff) >= 0.01) {
            if (diff > 0) { // pH too low
                amount = (diff / 0.2) * 6 * (poolGallons / 10000);
                advice = t.dosing.phRaise
                    .replace("{amount}", formatAmountOzLb(amount, t))
                    .replace("{target}", targetValue);
            } else if (diff < 0) { // pH too high
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

    // Default logic for other states (AZ/TX) for non-alkalinity chems
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


// ... rest of code remains same
// Main backend calculation function

    // Parse all values from formData (all should be numbers except state)
    const rawState = typeof formData.state === 'string' ? formData.state.toLowerCase() : '';
    if (!Object.prototype.hasOwnProperty.call(GOLDEN_NUMBERS, rawState)) {
        return { html: `<p class="error">${t.errorRequired}</p>` };
    }

    const state = rawState;
    let golden = { ...GOLDEN_NUMBERS[state] };
    const poolGallons = parseFloat(formData.capacity);
    const ph = parseFloat(formData.ph);
    const alkalinity = parseFloat(formData.alkalinity);
    const calcium = parseFloat(formData.calcium);
    const cyanuric = parseFloat(formData.cyanuric);
    const freeChlorine = parseFloat(formData.freechlorine);
    const temperatureInput = formData.temperature;
    const tdsInput = formData.tds;
    const saltCurrentInput = formData['salt-current'];
    const saltDesiredInput = formData['salt-desired'];
    const temperature = hasValue(temperatureInput) ? parseFloat(temperatureInput) : 86;
    const tds = hasValue(tdsInput) ? parseFloat(tdsInput) : 1000;
    const saltCurrent = hasValue(saltCurrentInput) ? parseFloat(saltCurrentInput) : 0;
    const saltDesired = hasValue(saltDesiredInput) ? parseFloat(saltDesiredInput) : 0;

    if (
        [poolGallons, ph, alkalinity, calcium, cyanuric, freeChlorine].some(Number.isNaN) ||
        (hasValue(temperatureInput) && Number.isNaN(temperature)) ||
        (hasValue(tdsInput) && Number.isNaN(tds)) ||
        (hasValue(saltCurrentInput) && Number.isNaN(saltCurrent)) ||
        (hasValue(saltDesiredInput) && Number.isNaN(saltDesired))
    ) {
        return { html: `<p class="error">${t.errorRequired}</p>` };
    }


    if (saltDesired > 0) {
        golden.alkalinity = 120;
        if (state === 'jacksonville') {
        golden.ph = 7.4; // Specific pH target for Jacksonville salt pools
        }
        }    
    if (poolGallons < 500 || poolGallons > 50000) {
        return { html: `<p class="error">${t.errorRangeCapacity}</p>` };
    }
    
    if (ph < 6.5 || ph > 8.5) {
        return { html: `<p class="error">${t.errorRangePh}</p>` };
    }
    
    if (alkalinity === 0) {
        return { html: `<p class="error">${t.alkalinityZeroNote}</p>` };
    }

    if (alkalinity < 10 || alkalinity > 300) {
        return { html: `<p class="error">${t.errorRangeAlkalinity}</p>` };
    }
    
    if (calcium < 0 || calcium > 1000) {
        return { html: `<p class="error">${t.errorRangeCalcium}</p>` };
    }
    
    if (cyanuric < 0 || cyanuric > 300) {
        return { html: `<p class="error">${t.errorRangeCyanuric}</p>` };
    }

    if (freeChlorine < 0 || freeChlorine > 30) {
        return { html: `<p class="error">${t.errorRangeFreeChlorine}</p>` };
    }

    if (tds < 0 || tds > 10000) {
        return { html: `<p class="error">${t.errorRangeTds}</p>` };
    }
    
    if (saltCurrent < 0 || saltCurrent > 10000 || saltDesired < 0 || saltDesired > 10000) {
        return { html: `<p class="error">${t.errorRangeSalt}</p>` };
    }

    if (temperature < 33 || temperature > 104) {
        return { html: `<p class="error">${t.errorRangeTemperature}</p>` };
    }

    let lsiTdsValue = tds;
    if (saltDesired > 0) {
        lsiTdsValue = Math.max(tds, saltCurrent);
    }

    let correctedAlkalinity = alkalinity - (cyanuric / 3);
    if (correctedAlkalinity < 0) correctedAlkalinity = 0;

    const alkalinityFactor = getFactor(correctedAlkalinity, ALKALINITY_FACTORS);
    const calciumFactor = getFactor(calcium, CALCIUM_FACTORS);
    const tempFactor = getFactor(temperature, TEMP_FACTORS, 'temp');
    const tdsFactor = getTDSFactor(lsiTdsValue);

    const lsi = ph + calciumFactor + alkalinityFactor + tempFactor - tdsFactor;

    const dosing = {
        ph: getDosingAdvice(ph, golden.ph, poolGallons, "ph", alkalinity, state, t),
        alkalinity: getDosingAdvice(correctedAlkalinity, golden.alkalinity, poolGallons, "alkalinity", alkalinity, state, t, ph, saltDesired),
        cya: getDosingAdvice(cyanuric, golden.cya, poolGallons, "cya", alkalinity, state, t),
        calcium: getDosingAdvice(calcium, golden.calcium, poolGallons, "calcium", alkalinity, state, t)
    };

    // --- Priority logic for balancing chems ---
    let balancingToAddNow = null;
    let balancingToAddNext = [];

    // Helper to check if a dose is needed (returns true if a string or object with a non-empty property)
    function isDoseNeeded(dose) {
        if (!dose) return false;
        if (typeof dose === "string") return dose.trim() !== "";
        if (typeof dose === "object" && dose !== null) {
            return (dose.bicarb && dose.bicarb.trim() !== "") || (dose.acid && dose.acid.trim() !== "");
        }
        return false;
    }

    // Priority: alkalinity > cya > calcium
    if (isDoseNeeded(dosing.alkalinity)) {
        balancingToAddNow = { type: "alkalinity", dose: dosing.alkalinity };
        if (isDoseNeeded(dosing.cya)) balancingToAddNext.push({ type: "cya", dose: dosing.cya });
        if (isDoseNeeded(dosing.calcium)) balancingToAddNext.push({ type: "calcium", dose: dosing.calcium });
    } else if (isDoseNeeded(dosing.cya)) {
        balancingToAddNow = { type: "cya", dose: dosing.cya };
        if (isDoseNeeded(dosing.calcium)) balancingToAddNext.push({ type: "calcium", dose: dosing.calcium });
    } else if (isDoseNeeded(dosing.calcium)) {
        balancingToAddNow = { type: "calcium", dose: dosing.calcium };
    }

// --- Build summary of chemicals to add now ---
let bicarbList = [];  // New: separate list for sodium bicarbonate
let acidList = [];
let otherList = [];

// Handle balancing chemical for this visit
if (balancingToAddNow) {
    if (balancingToAddNow.type === "alkalinity") {
        let bicarbDose = null;
        let acidDose = null;
        if (typeof balancingToAddNow.dose === "object" && balancingToAddNow.dose !== null) {
            bicarbDose = balancingToAddNow.dose.bicarb;
            acidDose = balancingToAddNow.dose.acid;
        } else if (typeof balancingToAddNow.dose === "string" && balancingToAddNow.dose) {
            if (balancingToAddNow.dose.toLowerCase().includes("muriatic acid")) {
                acidList.push(`<div class="chem-card acid">${boldQuantity(balancingToAddNow.dose)}</div>`);
            } else {
                // Check if it's sodium bicarbonate
                if (balancingToAddNow.dose.toLowerCase().includes("sodium bicarbonate")) {
                    bicarbList.push(`<div class="chem-card alk">${boldQuantity(balancingToAddNow.dose)}</div>`);
                } else {
                    otherList.push(boldQuantity(balancingToAddNow.dose));
                }
            }
        }
        if (bicarbDose) {
            bicarbList.push(`<div class="chem-card alk">${boldQuantity(bicarbDose)}</div>`);
        }
        if (acidDose) {
            acidList.push(`<div class="chem-card acid">${boldQuantity(acidDose)} <em>${t.addAfterTesting}</em></div>`);
        }
        
    } else if (balancingToAddNow.type === "cya") {
        if (typeof balancingToAddNow.dose === "string" && balancingToAddNow.dose) {
            otherList.push(`<div class="chem-card cya">${boldQuantity(balancingToAddNow.dose)}</div>`);
        }
        // Allow pH adjustment for CYA
        if (dosing.ph && typeof dosing.ph === "string" && dosing.ph.trim() !== "" && !dosing.ph.toLowerCase().includes("muriatic acid")) {
            otherList.push(`<div class="chem-card ph">${boldQuantity(dosing.ph)}</div>`);
        } else if (dosing.ph && typeof dosing.ph === "string" && dosing.ph.toLowerCase().includes("muriatic acid")) {
            acidList.push(`<div class="chem-card acid">${boldQuantity(dosing.ph)} <em>${t.addAfterTesting}</em></div>`);
        }
    } else if (balancingToAddNow.type === "calcium") {
        if (typeof balancingToAddNow.dose === "string" && balancingToAddNow.dose) {
            if (balancingToAddNow.type === "calcium") {
                otherList.push(`<div class="chem-card ch">${boldQuantity(balancingToAddNow.dose)}</div>`);
            } else if (balancingToAddNow.dose.toLowerCase().includes("muriatic acid")) {
                acidList.push(`<div class="chem-card acid">${boldQuantity(balancingToAddNow.dose)} <em>${t.addAfterTesting}</em></div>`);
            } else {
                otherList.push(boldQuantity(balancingToAddNow.dose));
            }
        }
        // Allow pH adjustment for calcium
        if (dosing.ph && typeof dosing.ph === "string" && dosing.ph.trim() !== "" && !dosing.ph.toLowerCase().includes("muriatic acid")) {
            otherList.push(`<div class="chem-card ph">${boldQuantity(dosing.ph)}</div>`);
        } else if (dosing.ph && typeof dosing.ph === "string" && dosing.ph.toLowerCase().includes("muriatic acid")) {
            acidList.push(`<div class="chem-card acid">${boldQuantity(dosing.ph)} <em>${t.addAfterTesting}</em></div>`);
        }
    }
} else {
    // If no balancing chemical is being dosed, allow pH adjustment as usual
    if (dosing.ph && typeof dosing.ph === "string" && dosing.ph.trim() !== "" && !dosing.ph.toLowerCase().includes("muriatic acid")) {
        otherList.push(`<div class="chem-card ph">${boldQuantity(dosing.ph)}</div>`);
    } else if (dosing.ph && typeof dosing.ph === "string" && dosing.ph.toLowerCase().includes("muriatic acid")) {
        acidList.push(`<div class="chem-card acid">${boldQuantity(dosing.ph)} <em>${t.addAfterTesting}</em></div>`);
    }
}

// Salt dosing (can always be added)
let saltDose = null;
if (saltDesired > 0 && saltCurrent >= 0) { // Simplified this condition. The getSaltDose function handles the check for saltDesired > saltCurrent.
    saltDose = getSaltDose(saltCurrent, saltDesired, poolGallons);
    if (saltDose && saltDose.lbsNeeded > 0.01) {
        otherList.push(
            `<div class="chem-card salt">${boldQuantity(t.dosing.salt
                .replace("{amount}", saltDose.lbsNeeded.toFixed(2))
                .replace("{bags}", saltDose.bags)
                )}</div>`
                );
                }
            }
let chlorineList = [];
let chlorineInfo; // Will hold the chlorine calculation results
let chlorineHTML = ''; // Initialize HTML string for chlorine details

if (saltDesired > 0) {
    // --- New Salt Pool Chlorine Logic ---
    const targetFC = cyanuric * 0.05;
    let ppmToBeDosed = 0;
    let saltChlorineMessage = "";
    let saltChlorineWarning = "";
    let saltChlorineAdvice = "";

    if (freeChlorine <= 0.6) {
        // Rule #1: FAC is near zero
        const doseToLevel = targetFC * 3;
        ppmToBeDosed = doseToLevel - freeChlorine;
        saltChlorineWarning = `<div class="warning-text">${t.sanitizer.lowChlorineSaltWarning}</div>`;
    } else if (freeChlorine > 0.6 && freeChlorine < targetFC) {
        // Rule #2: FAC is low but not critical
        const doseToLevel = targetFC * 2;
        ppmToBeDosed = doseToLevel - freeChlorine;
        saltChlorineAdvice = `<div class="advice-text">${t.sanitizer.saltChlorineBelowTarget}</div>`;
    } else if (freeChlorine > (targetFC + 2)) {
        // Rule #3: FAC is too high
        saltChlorineMessage = `<div class="chem-card fac">${t.sanitizer.saltChlorineHigh}</div>`;
    } else { // Covers Rule #4: FAC is in range (targetFC to targetFC + 2)
        saltChlorineMessage = `<div class="chem-card fac">${t.sanitizer.saltChlorineInRange}</div>`;
    }

    if (ppmToBeDosed < 0) ppmToBeDosed = 0;

    // Build the summary list for chlorine
    if (saltChlorineWarning) {
        chlorineList.push(saltChlorineWarning);
    }
    if (saltChlorineAdvice) {
        chlorineList.push(saltChlorineAdvice);
        }

    if (ppmToBeDosed > 0.01) {
        if (state === "florida") {
            const liquidChlorine = getLiquidChlorineDose(ppmToBeDosed, poolGallons);
            chlorineList.push(
                `<div class="chem-card fac">${boldQuantity(
                    t.sanitizer.liquidChlorineDose
                    .replace("{gallons}", liquidChlorine.gallons.toFixed(2))
                    .replace("{flOz}", liquidChlorine.flOz.toFixed(0))
                )}</div>`
            );
        } else {
            const calHypoOunces = getCalHypoOunces(ppmToBeDosed, poolGallons);
            chlorineList.push(
                `<div class="chem-card fac">${boldQuantity(
                    t.sanitizer.calHypoDose.replace("{amount}", formatLbsOz(calHypoOunces, t))
                )}</div>`
            );
        }
    } else if (saltChlorineMessage) {
        chlorineList.push(saltChlorineMessage);
    }

    // --- Build Salt-Specific Chlorine Details HTML ---
    chlorineHTML = `
    <div class="info-card chlorine-details">
        <h4>${t.sanitizer.chlorineDetailsSalt}</h4>
        <div class="chlorine-grid">
            <div class="chlorine-item">
                <span class="chlorine-label">${t.sanitizer.targetFCSalt}:</span>
                <span class="chlorine-value">${targetFC.toFixed(2)} ppm</span>
            </div>
            <div class="chlorine-item">
                <span class="chlorine-label">${t.testedFreeChlorine}:</span>
                <span class="chlorine-value">${freeChlorine.toFixed(2)} ppm</span>
            </div>
            <div class="chlorine-item highlight">
                <span class="chlorine-label">${t.sanitizer.supplementalDoseSalt}:</span>
                <span class="chlorine-value">${ppmToBeDosed.toFixed(2)} ppm</span>
            </div>
        </div>
    </div>
    `;

} else {
    // --- Existing Non-Salt Pool Logic ---
    chlorineInfo = getChlorinePPMDose(freeChlorine, cyanuric);
    if (state === "florida") {
        const liquidChlorine = getLiquidChlorineDose(chlorineInfo.toBeDosed, poolGallons);
        if (chlorineInfo.toBeDosed > 0.01) {
            chlorineList.push(
                `<div class="chem-card fac">${boldQuantity(
                    t.sanitizer.liquidChlorineDose
                    .replace("{gallons}", liquidChlorine.gallons.toFixed(2))
                    .replace("{flOz}", liquidChlorine.flOz.toFixed(0))
                )}</div>`
            );
        }
    } else {
        const calHypoOunces = getCalHypoOunces(chlorineInfo.toBeDosed, poolGallons);
        if (chlorineInfo.toBeDosed > 0.01) {
            chlorineList.push(
                `<div class="chem-card fac">${boldQuantity(
                    t.sanitizer.calHypoDose.replace("{amount}", formatLbsOz(calHypoOunces, t))
                )}</div>`
            );
        }
    }
     // --- Build Standard Chlorine Details HTML for non-salt pools ---
     chlorineHTML = `
     <div class="info-card chlorine-details">
     <h4>${state === "florida" ? t.chlorineDetailsFL : t.chlorineDetailsAZTX}</h4>
     <div class="chlorine-grid">
     <div class="chlorine-item">
     <span class="chlorine-label">${t.minFC}:</span>
     <span class="chlorine-value">${chlorineInfo.minFC.toFixed(2)} ppm</span>
     </div>
     <div class="chlorine-item">
     <span class="chlorine-label">${t.uvLossFactor}:</span>
     <span class="chlorine-value">${chlorineInfo.lossFactor} ppm/day</span>
     </div>
     <div class="chlorine-item">
     <span class="chlorine-label">${t.uvLossForWeek}:</span>
     <span class="chlorine-value">${chlorineInfo.uvLoss.toFixed(2)} ppm</span>
     </div>
     <div class="chlorine-item">
     <span class="chlorine-label">${t.calculatedChlorineDose}:</span>
     <span class="chlorine-value">${chlorineInfo.calculatedDose.toFixed(2)} ppm</span>
     </div>
     <div class="chlorine-item">
     <span class="chlorine-label">${t.testedFreeChlorine}:</span>
     <span class="chlorine-value">${freeChlorine.toFixed(2)} ppm</span>
     </div>
     <div class="chlorine-item highlight">
     <span class="chlorine-label">${t.chlorineToBeDosed}:</span>
     <span class="chlorine-value">${chlorineInfo.toBeDosed.toFixed(2)} ppm</span>
     </div>
     </div>
     </div>
 `;
 }


    // --- Build comparison chart as styled cards ---
function createParameterCard(label, current, golden, isInRange, cardClass, t) {
    const statusClass = isInRange ? 'in-range' : 'out-of-range';
    return `
        <div class="param-card ${cardClass} ${statusClass}">
            <div class="param-header">${label}</div>
            <div class="param-values">
                <div class="current-value">
                    <span class="label">${t.currentLabel}</span>
                    <span class="value">${current}</span>
                </div>
                <div class="target-value">
                    <span class="label">${t.targetLabel}</span>
                    <span class="value">${golden}</span>
                </div>
            </div>
        </div>
    `;
}

// Check if parameters are in acceptable ranges
const phInRange = Math.abs(ph - golden.ph) <= 0.1;
const alkInRange = Math.abs(alkalinity - golden.alkalinity) <= 20;
const calciumInRange = Math.abs(calcium - golden.calcium) <= 50;
const cyaInRange = Math.abs(cyanuric - golden.cya) <= 10;

let comparisonCards = `
    <div class="parameters-grid">
        ${createParameterCard(t.ph, ph, golden.ph, phInRange, 'ph', t)}
        ${createParameterCard(t.alkalinity, alkalinity, golden.alkalinity, alkInRange, 'alk', t)}
        ${createParameterCard(t.calcium, calcium, golden.calcium, calciumInRange, 'ch', t)}
        ${createParameterCard(t.cyanuric, cyanuric, golden.cya, cyaInRange, 'cya', t)}
    </div>
`;

    // --- LSI status ---
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

    let lsiHTML = `
<div class="info-card lsi-card ${lsi >= -0.05 && lsi <= 0.3 ? 'balanced' : (lsi < -0.05 ? 'corrosive' : 'scale-forming')}">
    <h4>${t.isBalanced}</h4>
    <div class="lsi-status">
        <div class="lsi-value">${lsi.toFixed(2)}</div>
        <div class="lsi-description">${lsiStatus}</div>
    </div>
</div>
`;
    // --- Build the final HTML string ---
   
const html = `
<h3 class="results-heading">${t.summaryTitle}</h3>
${bicarbList.join('')}
${acidList.join('')}
${(acidList.length > 0 || bicarbList.length > 0) ? `<div style="margin-bottom:0.5em;"><em>${t.waitNote}</em></div>` : ''}
${chlorineList.join('')}
${otherList.join('')}
    
<h3 class="results-heading">${t.detailsTitle}</h3>

<h4>${t.waterChemistryTitle}</h4>
${comparisonCards}

${chlorineHTML}

${lsiHTML}

${balancingToAddNext.length > 0 ? `
<div class="info-card next-visit">
    <h4>${t.notesNextVisit}</h4>
    <p><em>${t.nextVisitNote}</em></p>
    <ul>
    ${balancingToAddNext.map(item => {
        if (typeof item.dose === "string") {
            return `<li>${boldQuantity(item.dose)}</li>`;
        } else if (typeof item.dose === "object" && item.dose !== null) {
            let out = "";
            if (item.dose.bicarb) out += `<li>${boldQuantity(item.dose.bicarb)}</li>`;
            if (item.dose.acid) out += `<li>${boldQuantity(item.dose.acid)}</li>`;
            return out;
        }
        return "";
    }).join('')}
    </ul>
</div>
` : ""}
`;
return {html};
}


module.exports = { calculateLSIAndAdvice, translations };
