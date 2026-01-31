const translations = {
    en: { 
        title: "Pool Chemistry Calculator for Residential Pools",
        selectLanguage: "Select a Language",
        clearForm: "🔄 Clear Form for New Pool",
        trainingVideo: "Watch Training Video",
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
        errorRangeCapacity: "Pool capacity must be between 100 and 50,000 gallons.",
        errorRangePh: "pH must be between 6.5 and 8.5.",
        errorRangeAlkalinity: "Alkalinity must be between 0 and 300 ppm.",
        errorRangeCalcium: "Calcium hardness must be between 0 and 1,000 ppm.",
        errorRangeCyanuric: "Cyanuric acid must be between 0 and 300 ppm.",
        errorRangeTds: "TDS must be between 0 and 10,000 ppm.",
        errorRangeSalt: "Salt levels must be between 0 and 10,000 ppm.",
        errorRangeTemperature: "Temperature must be between 32°F and 104°F."
    },
    es: {
        title: "Calculadora de Química para Piscinas Residenciales",
        selectLanguage: "Seleccione un Idioma",
        clearForm: "🔄 Borrar Formulario para Nueva Piscina",
        trainingVideo: "Ver Video de Entrenamiento",
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
        errorRangeCapacity: "La capacidad de la piscina debe estar entre 100 y 50,000 galones.",
        errorRangePh: "El pH debe estar entre 6.5 y 8.5.",
        errorRangeAlkalinity: "La alcalinidad debe estar entre 0 y 300 ppm.",
        errorRangeCalcium: "La dureza de calcio debe estar entre 0 y 1,000 ppm.",
        errorRangeCyanuric: "El ácido cianúrico debe estar entre 0 y 300 ppm.",
        errorRangeTds: "Los TDS deben estar entre 0 y 10,000 ppm.",
        errorRangeSalt: "Los niveles de sal deben estar entre 0 y 10,000 ppm.",
        errorRangeTemperature: "La temperatura debe estar entre 32°F y 104°F."
    },
    it: {
        title: "Calcolatrice Chimica per Piscine Residenziali",
        selectLanguage: "Seleziona una Lingua",
        clearForm: "🔄 Cancella Modulo per Nuova Piscina",
        trainingVideo: "Guarda il Video di Formazione",
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
        errorRangeCapacity: "La capacità della piscina deve essere compresa tra 100 e 50.000 galloni.",
        errorRangePh: "Il pH deve essere compreso tra 6,5 e 8,5.",
        errorRangeAlkalinity: "L'alcalinità deve essere compresa tra 0 e 300 ppm.",
        errorRangeCalcium: "La durezza del calcio deve essere compresa tra 0 e 1.000 ppm.",
        errorRangeCyanuric: "L'acido cianurico deve essere compreso tra 0 e 300 ppm.",
        errorRangeTds: "I TDS devono essere compresi tra 0 e 10.000 ppm.",
        errorRangeSalt: "I livelli di sale devono essere compresi tra 0 e 10.000 ppm.",
        errorRangeTemperature: "La temperatura deve essere compresa tra 32°F e 104°F."
    }
};
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to remove commas from string
function removeCommas(str) {
    return str.replace(/,/g, "");
} 
function applyUrlParameters() {
    const params = new URLSearchParams(window.location.search);

    // Helper to set value for a standard input/select field
    const setValue = (paramName, elementId) => {
        if (params.has(paramName)) {
            const element = document.getElementById(elementId);
            if (element) {
                let value = params.get(paramName);
                // The capacity input has special formatting logic (commas)
                if (elementId === 'capacity' && value.trim() !== '') {
                    const numValue = parseInt(removeCommas(value), 10);
                    if (!isNaN(numValue)) {
                        // Use existing formatting function from this script
                        element.value = formatNumberWithCommas(numValue);
                    }
                } else {
                    element.value = value;
                }
            }
        }
    };

    // Populate all standard inputs
    setValue('capacity', 'capacity');
    setValue('freechlorine', 'freechlorine');
    setValue('cyanuric', 'cyanuric');
    setValue('ph', 'ph');
    setValue('alkalinity', 'alkalinity');
    setValue('calcium', 'calcium');
    setValue('tds', 'tds');
    setValue('temperature', 'temperature');
    setValue('salt-current', 'salt-current');
    setValue('salt-desired', 'salt-desired');

    // Handle State button group by simulating a click
    // This ensures all related logic (UI update, localStorage) is triggered
    if (params.has('state')) {
        const stateValue = params.get('state').toLowerCase();
        const stateButton = document.querySelector(`#state-buttons button[data-state="${stateValue}"]`);
        if (stateButton) {
            stateButton.click();
        }
    }

    // Handle Language button group similarly
    if (params.has('lang')) {
        const langValue = params.get('lang').toLowerCase();
        const langButton = document.querySelector(`#language-buttons button[data-lang="${langValue}"]`);
        if (langButton) {
            langButton.click();
        }
    }
}




document.addEventListener('DOMContentLoaded', function() {
    // Language selection logic
    const autoPopulateVolume = localStorage.getItem('calculatedPoolVolumeGallons');
    if (autoPopulateVolume) {
        const capacityInputOnIndexPage = document.getElementById('capacity'); // ID of the capacity input on index.html
        if (capacityInputOnIndexPage) {
            capacityInputOnIndexPage.value = autoPopulateVolume;
        }
        localStorage.removeItem('calculatedPoolVolumeGallons'); // Important: Clear the item after using it
    }

    const languageButtons = document.querySelectorAll('#language-buttons button');
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Clear form functionality
    const clearFormBtn = document.getElementById('clear-form-btn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            clearAllFormData();
        });
    }
    
    // Set initial language button state
    languageButtons.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.remove('btn-inactive');
            btn.classList.add('btn-active');
        } else {
            btn.classList.remove('btn-active');
            btn.classList.add('btn-inactive');
        }
    });

    // Handle language button clicks
    languageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            languageButtons.forEach(b => {
                b.classList.remove('btn-active');
                b.classList.add('btn-inactive');
            });
            btn.classList.remove('btn-inactive');
            btn.classList.add('btn-active');
            localStorage.setItem('selectedLanguage', btn.dataset.lang);
            setLanguage(btn.dataset.lang);
        });
    });

    // Function to update UI text - FIXED VERSION
    function setLanguage(lang) {
        const t = translations[lang];
        
        // Header
        const headerTitle = document.querySelector('h1');
        if (headerTitle) headerTitle.textContent = t.title;
        
        // Language section
        const langSectionH2 = document.querySelector('section h2');
        if (langSectionH2) langSectionH2.textContent = t.selectLanguage;
        
        // Clear button
        const clearBtn = document.getElementById('clear-form-btn');
        if (clearBtn) clearBtn.textContent = t.clearForm;

        // Training video link - updates the link text based on selected language
        const trainingLink = document.getElementById('training-video-link');
        if (trainingLink) {
        trainingLink.innerHTML = `<span class="material-icons inline-block align-middle mr-1" style="font-size: 1.25em; vertical-align: text-bottom;">ondemand_video</span> ${t.trainingVideo}`;
        }
        
        // Pool capacity
        const capacityLabel = document.querySelector('label[for="capacity"]');
        if (capacityLabel) capacityLabel.childNodes[0].textContent = t.poolCapacityLabel;
        
        // Sanitize section
        const sanitizeH3 = document.querySelector('h3');
        if (sanitizeH3) sanitizeH3.textContent = t.sanitize;
        
        const fcLabel = document.querySelector('label[for="freechlorine"]');
        if (fcLabel) fcLabel.childNodes[0].textContent = t.freeChlorine;
        
        const cyaLabel = document.querySelector('label[for="cyanuric"]');
        if (cyaLabel) cyaLabel.childNodes[0].textContent = t.cyanuric;
        
        // Balance section
        const balanceH3 = document.querySelectorAll('h3')[1];
        if (balanceH3) balanceH3.textContent = t.balance;
        
        const phLabel = document.querySelector('label[for="ph"]');
        if (phLabel) phLabel.childNodes[0].textContent = t.ph;
        
        const alkLabel = document.querySelector('label[for="alkalinity"]');
        if (alkLabel) alkLabel.childNodes[0].textContent = t.alkalinity;
        
        const caLabel = document.querySelector('label[for="calcium"]');
        if (caLabel) caLabel.childNodes[0].textContent = t.calcium;
        
        // Optional section
        const optionalH3 = document.querySelectorAll('h3')[2];
        if (optionalH3) optionalH3.textContent = t.optional;
        
        const tdsLabel = document.querySelector('label[for="tds"]');
        if (tdsLabel) tdsLabel.childNodes[0].textContent = t.tds;
        
        const tdsNote = document.querySelector('label[for="tds"] + p');
        if (tdsNote) tdsNote.textContent = t.tdsNote;
        
        const tempLabel = document.querySelector('label[for="temperature"]');
        if (tempLabel) tempLabel.childNodes[0].textContent = t.temperature;
        
        const tempNote = document.querySelector('label[for="temperature"]').parentElement.querySelector('p');
        if (tempNote) tempNote.textContent = t.tempNote;
        
        // Salt section
        const saltH3 = document.querySelectorAll('h3')[3];
        if (saltH3) saltH3.textContent = t.salt;
        
        const saltCurrentLabel = document.querySelector('label[for="salt-current"]');
        if (saltCurrentLabel) saltCurrentLabel.childNodes[0].textContent = t.saltCurrent;
        
        const saltCurrentNote = document.querySelector('label[for="salt-current"] + p');
        if (saltCurrentNote) saltCurrentNote.textContent = t.saltCurrentNote;
        
        const saltDesiredLabel = document.querySelector('label[for="salt-desired"]');
        if (saltDesiredLabel) saltDesiredLabel.childNodes[0].textContent = t.saltDesired;
        
        // State section
        const stateH2 = document.querySelectorAll('h2')[1];
        if (stateH2) stateH2.textContent = t.selectState;
        
        // Calculate button
        const calculateBtn = document.querySelector('button[type="submit"]');
        if (calculateBtn) {
            // Keep the icon and update the text
            calculateBtn.innerHTML = `<span class="material-icons mr-2">calculate</span> ${t.calculate}`;
        }
    }

    // Set default values for temperature and TDS if empty
    const tempInput = document.getElementById('temperature');
    if (tempInput && (tempInput.value === "" || tempInput.value === undefined)) {
        tempInput.value = 86;
    }
    const tdsInput = document.getElementById('tds');
    if (tdsInput && (tdsInput.value === "" || tdsInput.value === undefined)) {
        tdsInput.value = 1000;
    }

    // State button logic
    const stateButtons = document.querySelectorAll('#state-buttons button');
    const stateInput = document.getElementById('state');
    const savedState = localStorage.getItem('selectedState');


    // Restore previous selection if available
    if (savedState) {
        stateInput.value = savedState;
        stateButtons.forEach(btn => {
            if (btn.dataset.state === savedState) {
                btn.classList.remove('btn-inactive');
                btn.classList.add('btn-active');
            } else {
                btn.classList.remove('btn-active');
                btn.classList.add('btn-inactive');
            }
        });
    } else {
        // Make sure all state buttons start as inactive if no saved state
        stateButtons.forEach(btn => {
            btn.classList.remove('btn-active');
            btn.classList.add('btn-inactive');
        });
    }

    stateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            stateButtons.forEach(b => {
                b.classList.remove('btn-active');
                b.classList.add('btn-inactive');
            });
            btn.classList.remove('btn-inactive');
            btn.classList.add('btn-active');
            stateInput.value = btn.dataset.state;
            localStorage.setItem('selectedState', btn.dataset.state);
        });
    });

    setLanguage(savedLang);

    // Form submission handler - IMPROVED VERSION
    const capacityInput = document.getElementById('capacity');
    if (capacityInput) {
        // Only allow digits during input
        capacityInput.addEventListener('input', function(e) {
            let value = e.target.value;
            // Remove all non-digit characters
            let cleanValue = value.replace(/[^\d]/g, '');
            e.target.value = cleanValue;
        });
        
        // Format with commas when user finishes typing (on blur)
        capacityInput.addEventListener('blur', function(e) {
            let value = e.target.value;
            if (value && value.trim() !== '') {
                const numValue = parseInt(value, 10);
                if (!isNaN(numValue) && numValue > 0) {
                    e.target.value = formatNumberWithCommas(numValue);
                }
            }
        });
        
        // Remove commas when user starts typing again (on focus)
        capacityInput.addEventListener('focus', function(e) {
            let value = e.target.value;
            if (value) {
                e.target.value = removeCommas(value);
            }
        });
    }

    // Form submission handler - IMPROVED VERSION
    const form = document.getElementById('pool-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // CRITICAL: Clean capacity field BEFORE getting its value
            const capacityField = document.getElementById('capacity');
            if (capacityField) {
                capacityField.value = removeCommas(capacityField.value);
            }
        
        // Now get the cleaned values
        const formData = {
            state: document.getElementById('state').value,
            capacity: document.getElementById('capacity').value, // Now guaranteed to be clean
            ph: document.getElementById('ph').value,
            alkalinity: document.getElementById('alkalinity').value,
            calcium: document.getElementById('calcium').value,
            temperature: document.getElementById('temperature').value,
            tds: document.getElementById('tds').value,
            cyanuric: document.getElementById('cyanuric').value,
            freechlorine: document.getElementById('freechlorine').value,
            'salt-current': document.getElementById('salt-current').value,
            'salt-desired': document.getElementById('salt-desired').value,
            lang: localStorage.getItem('selectedLanguage') || 'en'
        };
        
        console.log('Form data being submitted:', formData);
        console.log('Capacity value:', formData.capacity);
        
        const resultsElement = document.getElementById('results');
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        const t = translations[lang];
        
        // Check if all required fields are filled
        if (!formData.state || !formData.capacity || !formData.ph || 
            !formData.alkalinity || !formData.calcium || !formData.temperature || 
            !formData.tds || !formData.cyanuric || !formData.freechlorine) {
            resultsElement.innerHTML = `<p class="error">${t.errorRequired}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        // Parse values for validation
        const capacity = parseFloat(formData.capacity);
        const ph = parseFloat(formData.ph);
        const alkalinity = parseFloat(formData.alkalinity);
        const calcium = parseFloat(formData.calcium);
        const cyanuric = parseFloat(formData.cyanuric);
        const tds = parseFloat(formData.tds);
        const saltCurrent = parseFloat(formData['salt-current']);
        const temperature = parseFloat(formData.temperature);
        
        console.log('Parsed capacity:', capacity);
        
        // Validate ranges
        if (isNaN(capacity) || capacity < 100 || capacity > 50000) {
            console.log('Capacity validation failed:', capacity);
            resultsElement.innerHTML = `<p class="error">${t.errorRangeCapacity}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (ph < 6.5 || ph > 8.5) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangePh}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (alkalinity < 0 || alkalinity > 300) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangeAlkalinity}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (calcium < 0 || calcium > 1000) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangeCalcium}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (cyanuric < 0 || cyanuric > 300) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangeCyanuric}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (tds < 0 || tds > 10000) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangeTds}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (saltCurrent < 0 || saltCurrent > 10000) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangeSalt}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        if (temperature < 50 || temperature > 104) {
            resultsElement.innerHTML = `<p class="error">${t.errorRangeTemperature}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        // Show calculating message
        resultsElement.innerHTML = '<div style="text-align: center; padding: 2em; color: #1e759d; font-size: 1.2em;">Calculating...</div>';
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Server response received:', data);
            
            if (data.html) {
                resultsElement.innerHTML = data.html;
                // Ensure we scroll to results after they're displayed
                setTimeout(() => {
                    resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else if (data.error) {
                const errorLang = data.lang || localStorage.getItem('selectedLanguage') || 'en';
                const t = translations[errorLang];
                resultsElement.innerHTML = `<p class="error">${t.serverError}</p>`;
                resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                resultsElement.innerHTML = `<p class="error">No results returned from server.</p>`;
                resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } catch (err) {
            console.error('Fetch error:', err);
            const lang = localStorage.getItem('selectedLanguage') || 'en';
            const t = translations[lang];
            resultsElement.innerHTML = `<p class="error">${t.serverError}</p>`;
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}
applyUrlParameters();
});



// Clear form function - moved outside of DOMContentLoaded
function clearAllFormData() {
    const form = document.getElementById('pool-form');
    if (form) {
        form.reset();
        
        setTimeout(() => {
            document.getElementById('temperature').value = 86;
            document.getElementById('tds').value = 1000;
            document.getElementById('salt-current').value = 0;
            document.getElementById('salt-desired').value = 0;
            
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            const languageButtons = document.querySelectorAll('#language-buttons button');
            languageButtons.forEach(btn => {
                if (btn.dataset.lang === currentLang) {
                    btn.classList.remove('btn-inactive');
                    btn.classList.add('btn-active');
                } else {
                    btn.classList.remove('btn-active');
                    btn.classList.add('btn-inactive');
                }
            });
            
            const currentState = localStorage.getItem('selectedState');
            if (currentState) {
                document.getElementById('state').value = currentState;
                const stateButtons = document.querySelectorAll('#state-buttons button');
                stateButtons.forEach(btn => {
                    if (btn.dataset.state === currentState) {
                        btn.classList.remove('btn-inactive');
                        btn.classList.add('btn-active');
                    } else {
                        btn.classList.remove('btn-active');
                        btn.classList.add('btn-inactive');
                    }
                });
            } else {
                const stateButtons = document.querySelectorAll('#state-buttons button');
                stateButtons.forEach(btn => {
                    btn.classList.remove('btn-active');
                    btn.classList.add('btn-inactive');
                });
                document.getElementById('state').value = '';
            }
            
            const resultsElement = document.getElementById('results');
            if (resultsElement) {
                resultsElement.innerHTML = '';
            }
            
            const firstInput = document.getElementById('capacity');
            if (firstInput) {
                firstInput.focus();
            }
        }, 50);
    }
}
