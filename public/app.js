const btn = document.getElementById('btn');
const cityInput = document.getElementById('cityInput');

let map;
let marker;

btn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert('Enter city name');

    try {
        //WEATHER 
        const weatherRes = await fetch(`/api/weather?city=${city}`);
        const weather = await weatherRes.json();

        if (!weatherRes.ok) {
            return alert(weather.error);
        }

        document.getElementById('weather').innerHTML = `
            <h2>${weather.city}, ${weather.country}</h2>
            <p> Temperature: ${weather.temperature} °C</p>
            <p> Feels like: ${weather.feels_like} °C</p>
            <p> ${weather.description}</p>
            <p> Humidity: ${weather.humidity}%</p>
            <p> Wind: ${weather.wind_speed} m/s</p>
        `;

        //MAP
        const { lat, lon } = weather.coordinates;

        if (!map) {
            map = L.map('map').setView([lat, lon], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            marker = L.marker([lat, lon]).addTo(map);
        } else {
            map.setView([lat, lon], 10);
            marker.setLatLng([lat, lon]);
        }

        //NEWS
        const newsRes = await fetch(`/api/news?city=${city}`);
        const news = await newsRes.json();

        document.getElementById('news').innerHTML =
            news.length
                ? news.map(n => `<p><a href="${n.url}" target="_blank">${n.title}</a></p>`).join('')
                : '<p>No news found</p>';

        //CURRENCY
        const currencyRes = await fetch(`/api/currency?country=${weather.country}`);
        const currency = await currencyRes.json();

        document.getElementById('news').innerHTML += `
            <h3>Currency Rates</h3>
            <p>USD: ${currency.rates.USD}</p>
            <p>EUR: ${currency.rates.EUR}</p>
            <p>KZT: ${currency.rates.KZT}</p>
        `;

    } catch (error) {
        alert('Error loading data');
    }
});
