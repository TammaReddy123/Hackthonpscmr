

const API_BASE_URL = 'http://your-backend-api-url.com';  

document.getElementById('uploadButton').addEventListener('click', async function() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload an image.');
        return;
    }

    
    document.getElementById('loading').style.display = 'block';

    
    const formData = new FormData();
    formData.append('image', file);

    try {
        
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error in fetching prediction');
        }

        const result = await response.json();
        
        
        const resultHTML = `
            <h3>Disease: ${result.disease}</h3>
            <p>Recommended Treatment: ${result.treatment}</p>
        `;
        document.getElementById('results').innerHTML = resultHTML;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = `<p style="color:red;">Failed to get prediction. Please try again.</p>`;
    } finally {
        document.getElementById('loading').style.display = 'none';
    }

    try {
        
        const weatherResponse = await fetch(`${API_BASE_URL}/weather`, {
            method: 'GET',
        });

        if (!weatherResponse.ok) {
            throw new Error('Error in fetching weather data');
        }

        const weatherData = await weatherResponse.json();
        
        
        const weatherDataHTML = `
            <h3>Current Weather</h3>
            <p>Temperature: ${weatherData.temperature}°C</p>
            <p>Humidity: ${weatherData.humidity}%</p>
        `;
        document.getElementById('weatherData').innerHTML = weatherDataHTML;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('weatherData').innerHTML = `<p style="color:red;">Failed to get weather data. Please try again.</p>`;
    }
});
