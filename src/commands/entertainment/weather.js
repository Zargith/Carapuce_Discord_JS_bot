const fetch = require("node-fetch");

module.exports = async function(message) {
	if (!bot.config.apiKeys.openWeatherMap || bot.config.apiKeys.openWeatherMap == "")
		throw Error("Missing OpenWeatherMap API Key");

	let city = "";
	if (message.content.startsWith(`${bot.config.prefix}météo `) || message.content.startsWith(`${bot.config.prefix}meteo `))
		city = encodeURI(message.content.trim().substring(`${bot.config.prefix}météo `.length));
	else
		city = encodeURI(message.content.trim().substring(`${bot.config.prefix}weather `.length));

	await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&lang=fr&appid=${bot.config.apiKeys.openWeatherMap}`)
		.then(function(response) {
			// if good answer from the API call, then go to the next function. Else throw an error
			if (response.status === 200)
				return response.json();
			else if (response.status === 404 || response.statusText === "Not Found") {
				message.channel.send("Lieu non trouvé");
				return;
			}
			throw response.statusText;
		})
		.then(async function(json) {
			const lat = json["0"].lat;
			const lon = json["0"].lon;
			const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&appid=${bot.config.apiKeys.openWeatherMap}`);

			if (weatherRes.status === 404 || weatherRes.statusText === "Not Found") {
				message.channel.send("Lieu non trouvé");
				return;
			}

			const weatherJson = await weatherRes.json();
			console.log(weatherJson);

			if (weatherJson && weatherJson.weather[0])
				message.channel.send(`Actuellement à *${weatherJson.name}*, il fait *${weatherJson.weather[0].description}*`);
		}).catch(error => {
			throw error;
		});
};