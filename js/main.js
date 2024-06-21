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
                <h2>Resultados del Procesamiento del Documento</h2>
                <p>File ID: ${result.fileId}</p>
                <p>Legal Representative: ${result.legalRepresentative}</p>
                <p>Society Activity: ${result.societyActivity}</p>
                <p> ${result.ciiuCode}</p>
            </div>
        `;
    }
});
