const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '005dcbba38e9096469b3204134ec1826';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

	request(url, (err, response, body) => {
		if (err) {
			res.render('index', {weather: null, error: 'Error, please try again'});
		} else {
			let weather = JSON.parse(body);
			if (weather.main == undefined) {
				res.render('index', {weather: null, error: `"${city}" is not a city, please try again`});
			} else {
				let condition = '';
				if (weather.weather[0].main == 'Snow') {
					condition = ' and snowing';
				} else if (weather.weather[0].main == 'Rain'){
					condition = ' and raining';
				}
				let msg = `It's ${weather.main.temp} degrees${condition} in ${weather.name}, ${weather.sys.country}!`;
				res.render('index', {weather: msg, error: null});
			}
		}
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})