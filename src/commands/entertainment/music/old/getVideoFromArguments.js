const fetch = require("node-fetch");
const config = require("../../../../config.json");
const emojis = require("../../../utils/emojiCharacters.js");

module.exports = async function(message, keyWords) {
	// if there'is no Youtube API key defined in the bot cannot search a Youtube video with keywords so it throw an error
	if (!config.youtubeAPIKey)
		throw new Error("Config file missing Youtube API key.");

	// encode keywords to use them in the API call
	const encodedKeyWords = await encodeURIComponent(keyWords);
	const url = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedKeyWords}&maxResults=1&type=video&key=${config.youtubeAPIKey}`)
		.then(function(response) {
			// if good answer from the API call, then go to the next function. Else throw an error
			if (response.status == 200)
				return response.json();
			throw response.statusText;
		})
		.then(function(resjson) {
			// if there is no video found, send a message that it doens't found a video and return undefined
			if (resjson.totalResults == 0 || !resjson.items[0] || !resjson.items[0].id.videoId) {
				message.channel.send(`Pas de musique trouvé... Essaye avec d'autres mots clé ${emojis.shrug}`);
				return "Volunteer error: nothing found";
			}
			// return the url with the ID of the video found to complet it
			return (`https://www.youtube.com/watch?v=${resjson.items[0].id.videoId}`);
		}).catch(error => {
			throw error;
		});
	return (url);
};