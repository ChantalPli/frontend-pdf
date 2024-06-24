document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('upload-form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/upload', {

                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const result = await response.json();
                displayResult(result)

                if (result.fileId) {
                    document.getElementById('result-container').classList.add('has-content');
                } else {
                    document.getElementById('result-container').classList.remove('has-content');
                }

            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }

        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while uploading the file.');
        }
    });
    function displayResult(result) {
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = `
            <div>
                <h2>Result of document processing</h2>
                <p>FILE ID: ${result.fileId}</p>
                <p>REPRESENTANTE LEGAL: ${result.legalRepresentative}</p>
                <p>REPRESENTANTE LEGAL SUPLENTE: ${result.alternateLegalRepresentative}
                <p>ACTIVIDAD DE LA SOCIEDAD: ${result.societyActivity}</p>
                <p>${result.ciiuCode}</p>
            </div>
        `;
    }
});
