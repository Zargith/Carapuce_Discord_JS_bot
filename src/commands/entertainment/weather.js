const fetch = require("node-fetch");

module.exports = async function(message) {
	if (!bot.config.openweathermapAPIKey || bot.config.openweathermapAPIKey == "")
		throw Error("Missing openweathermap API Key");

	let city = "";
	if (message.content.startsWith(`${bot.prefix}météo`))
		city = message.content.trim().substring(`${bot.prefix}météo`.length, arr[i].length - 5);
	else
		city = message.content.trim().substring(`${bot.prefix}weather`.length, arr[i].length - 5);

	await fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${bot.config.openweathermapAPIKey}`)
		.then(function(response) {
			// if good answer from the API call, then go to the next function. Else throw an error
			if (response.status == 200)
				return response.json();
			throw response.statusText;
		})
		.then(function(json) {
			message.channel.send(`Actuellement à ${json.name}, il fait ${json.weather.description}`);
		}).catch(error => {
			throw error;
		});
};