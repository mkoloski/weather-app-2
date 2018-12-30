const request = require('request');
const argv = require('yargs').argv;

let apiKey = '005dcbba38e9096469b3204134ec1826';
let city = argv.c || 'norfolk';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

request(url, (err, response, body) => {
	if(err) {
		console.log('error:', error);
	} else {
		//console.log('body:', body);
		let weather = JSON.parse(body);
		let msg = `It's ${weather.main.temp} degrees in ${weather.name}!`;
		console.log(msg);
		console.log(body);
	}
});