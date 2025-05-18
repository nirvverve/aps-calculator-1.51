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
        serverError: "Server error. Please try again later."
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
        serverError: "Error del servidor. Por favor, inténtelo de nuevo más tarde."
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
        serverError: "Errore del server. Riprova più tardi."
    }
};
// Set default values for temperature and TDS on load
document.addEventListener('DOMContentLoaded', function() {
    // Language selection logic
const languageButtons = document.querySelectorAll('#language-buttons button');
const savedLang = localStorage.getItem('selectedLanguage') || 'en';

// Set initial language button state
languageButtons.forEach(btn => {
    if (btn.dataset.lang === savedLang) {
        btn.classList.add('active');
    }
});

// Handle language button clicks
languageButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        languageButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('selectedLanguage', btn.dataset.lang);
        setLanguage(btn.dataset.lang);
    });
});

// Function to update UI text (stub for now)
function setLanguage(lang) {
   // Header
   document.querySelector('h1').textContent = translations[lang].title;
   // Language section
   document.querySelector('#language-section h2').textContent = translations[lang].selectLanguage;
   // State section
   document.querySelector('#state-buttons').previousElementSibling.textContent = translations[lang].selectState;
   // Pool capacity
   document.querySelectorAll('.section')[1].querySelector('h2').textContent = translations[lang].poolCapacity;
   document.querySelector('#capacity').parentElement.childNodes[0].textContent = translations[lang].poolCapacityLabel;
   // Sanitize section
   document.querySelectorAll('.section')[2].querySelector('h2').textContent = translations[lang].sanitize;
   document.querySelector('#freechlorine').parentElement.childNodes[0].textContent = translations[lang].freeChlorine;
   document.querySelector('#cyanuric').parentElement.childNodes[0].textContent = translations[lang].cyanuric;
   // Balance section
   document.querySelectorAll('.section')[3].querySelector('h2').textContent = translations[lang].balance;
   document.querySelector('#ph').parentElement.childNodes[0].textContent = translations[lang].ph;
   document.querySelector('#alkalinity').parentElement.childNodes[0].textContent = translations[lang].alkalinity;
   document.querySelector('#calcium').parentElement.childNodes[0].textContent = translations[lang].calcium;
   // Optional section
   document.querySelectorAll('.section')[4].querySelector('h2').textContent = translations[lang].optional;
   document.querySelector('#tds').parentElement.childNodes[0].textContent = translations[lang].tds;
   document.querySelector('#tds').parentElement.querySelector('.note em').textContent = translations[lang].tdsNote;
   document.querySelector('#temperature').parentElement.childNodes[0].textContent = translations[lang].temperature;
   document.querySelector('#temperature').parentElement.querySelector('.note em').textContent = translations[lang].tempNote;
   // Salt section
   document.querySelectorAll('.section')[5].querySelector('h2').textContent = translations[lang].salt;
   document.querySelector('#salt-current').parentElement.childNodes[0].textContent = translations[lang].saltCurrent;
   document.querySelector('#salt-current').parentElement.querySelector('.note em').textContent = translations[lang].saltCurrentNote;
   document.querySelector('#salt-desired').parentElement.childNodes[0].textContent = translations[lang].saltDesired;
   // Calculate button
   document.querySelector('button[type="submit"]').textContent = translations[lang].calculate;
}
    // Set default values for temperature and TDS if empty
    const tempInput = document.getElementById('temperature');
    if (tempInput && (tempInput.value === "" || tempInput.value === undefined)) {
        tempInput.value = 86;
    }
    const tdsInput = document.getElementById('tds');
    if (tdsInput && (tdsInput.value === "" || tdsInput.value === undefined)) {
        tdsInput.value = 1600;
    }
    const stateButtons = document.querySelectorAll('#state-buttons button');
    const stateInput = document.getElementById('state');
    const savedState = localStorage.getItem('selectedState');
  
    // Restore previous selection if available
    if (savedState) {
      stateInput.value = savedState;
      stateButtons.forEach(btn => {
        if (btn.dataset.state === savedState) {
          btn.classList.add('active');
        }
      });
    }
  
    stateButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        stateButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        stateInput.value = btn.dataset.state;
        localStorage.setItem('selectedState', btn.dataset.state);
      });
    });
    setLanguage(savedLang);
    const form = document.getElementById('pool-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Gather all form data into an object
            const formData = {
                state: document.getElementById('state').value,
                capacity: document.getElementById('capacity').value,
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

            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = 'Calculating...';

            try {
                const response = await fetch('/api/calculate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.html) {
                    resultsElement.innerHTML = data.html;
                } else if (data.error) {
                    resultsElement.innerHTML = `<p class="error">${data.error}</p>`;
                }
            } catch (err) {
                resultsElement.innerHTML = '<p class="error">Server error. Please try again later.</p>';
            }
        });
    }
});