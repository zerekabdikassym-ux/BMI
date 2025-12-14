const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// чтобы читать данные из form (POST)
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем папку public (CSS)
app.use(express.static('public'));

// главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// обработка BMI
app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    // проверка данных
    if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        return res.send(`
            <h2>Invalid input</h2>
            <a href="/">Go back</a>
        `);
    }

    const bmi = weight / (height * height);
    let category = '';
    let cssClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        cssClass = 'result-underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
        cssClass = 'result-normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        cssClass = 'result-overweight';
    } else {
        category = 'Obese';
        cssClass = 'result-obese';
    }

    res.send(`
        <html>
        <head>
            <title>BMI Result</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="container">
                <h2>Your BMI Result</h2>
                <p class="${cssClass}">
                    BMI: ${bmi.toFixed(2)} <br>
                    Category: ${category}
                </p>
                <a href="/">Calculate again</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
