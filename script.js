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
    const chemCardsDiv = document.getElementById('chem-cards');
    const detailedTableDiv = document.getElementById('detailed-table');

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
                chemCardsDiv.innerHTML = '';
                detailedTableDiv.innerHTML = '';
                return;
            }

            // Summary
            resultsDiv.innerHTML = result.summary;

            // Chem Cards
            chemCardsDiv.innerHTML = result.chemCards.map(card => `
                <div class="chem-card">
                    <div class="chem-title">${card.title}</div>
                    <div class="chem-value">${card.value}</div>
                    <div class="chem-advice">${card.advice}</div>
                </div>
            `).join('');

            // Detailed Table
            detailedTableDiv.innerHTML = `
                <table>
                    <tbody>
                        ${result.detailedTable.map(row => `
                            <tr>
                                <td>${row.label}</td>
                                <td>${row.value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(err => {
            resultsDiv.innerHTML = `<p class="error">Error: ${err.message}</p>`;
            chemCardsDiv.innerHTML = '';
            detailedTableDiv.innerHTML = '';
        });
    });
});