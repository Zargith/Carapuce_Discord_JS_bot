const fetch = require("node-fetch");

module.exports = async function(message) {
	if (!bot.config.APIKeys.OpenWeatherMap || bot.config.APIKeys.OpenWeatherMap == "")
		throw Error("Missing OpenWeatherMap API Key");

	let city = "";
	if (message.content.startsWith(`${bot.config.prefix}météo `) || message.content.startsWith(`${bot.config.prefix}meteo `))
		city = encodeURI(message.content.trim().substring(`${bot.config.prefix}météo `.length));
	else
		city = encodeURI(message.content.trim().substring(`${bot.config.prefix}weather `.length));

	await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${bot.config.APIKeys.OpenWeatherMap}`)
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
		.then(function(json) {
			if (json && json.weather[0])
				message.channel.send(`Actuellement à *${json.name}*, il fait *${json.weather[0].description}*`);
		}).catch(error => {
			throw error;
		});
};