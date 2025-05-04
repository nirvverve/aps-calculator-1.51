document.addEventListener('DOMContentLoaded', function() {
    // Set default values for temperature and TDS if empty
    const tempInput = document.getElementById('temperature');
    if (tempInput && (tempInput.value === "" || tempInput.value === undefined)) {
        tempInput.value = 86;
    }
    const tdsInput = document.getElementById('tds');
    if (tdsInput && (tdsInput.value === "" || tdsInput.value === undefined)) {
        tdsInput.value = 1600;
    }

    const form = document.getElementById('pool-form');
    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Gather form data
        const data = {
            capacity: parseFloat(document.getElementById('capacity').value),
            temperature: parseFloat(document.getElementById('temperature').value),
            freeChlorine: parseFloat(document.getElementById('freechlorine').value),
            cyanuric: parseFloat(document.getElementById('cyanuric').value),
            ph: parseFloat(document.getElementById('ph').value),
            alkalinity: parseFloat(document.getElementById('alkalinity').value),
            calcium: parseFloat(document.getElementById('calcium').value),
            tds: parseFloat(document.getElementById('tds').value),
            saltCurrent: parseFloat(document.getElementById('salt-current').value),
            saltDesired: parseFloat(document.getElementById('salt-desired').value),
            state: document.getElementById('state').value
        };

        // Send data to backend
        fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result.error) {
                resultsDiv.innerHTML = `<p class="error">Error: ${result.error}</p>`;
                return;
            }
            // Display result (customize as needed)
            resultsDiv.innerHTML = `
                <h3>Results</h3>
                <p><strong>LSI:</strong> ${result.lsi} (${result.lsiStatus})</p>
                <ul>
                    <li><strong>pH Dosing:</strong> ${result.dosing.ph || 'No adjustment needed.'}</li>
                    <li><strong>Alkalinity Dosing:</strong> ${result.dosing.alkalinity || 'No adjustment needed.'}</li>
                    <li><strong>Calcium Dosing:</strong> ${result.dosing.calcium || 'No adjustment needed.'}</li>
                    <li><strong>CYA Dosing:</strong> ${result.dosing.cya || 'No adjustment needed.'}</li>
                    <li><strong>Salt Dosing:</strong> ${result.saltDose ? 
                        `Add ${result.saltDose.lbsNeeded.toFixed(2)} lbs of pool salt (${result.saltDose.bags} x 40 lb bags) to reach your desired salt level.` : 'No adjustment needed.'}</li>
                    <li><strong>Sanitizer Dosing:</strong> ${result.sanitizer || 'No adjustment needed.'}</li>
                </ul>
            `;
        })
        .catch(err => {
            resultsDiv.innerHTML = `<p class="error">Error: ${err.message}</p>`;
        });
    });
});