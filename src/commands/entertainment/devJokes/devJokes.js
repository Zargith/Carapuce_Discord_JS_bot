const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = async function(message) {
	await fetch("https://readme-jokes.vercel.app/api")
		.then(function(response) {
			// if good answer from the API call, then go to the next function. Else throw an error
			if (response.status == 200)
				return response.text();
			throw response.statusText;
		})
		.then(function(svgTxt) {
			// Extract the joke from the svg text
			const joke = getJokeFromSVGText(svgTxt);
			// Send the joke as an Embed with a meme
			const husky = new Discord.MessageAttachment("./src/husky_happy_meme.jpeg");
			message.channel.send({
				files: [husky],
				embed: {
					color: 3447003,
					title: "Dev joke",
					thumbnail: "attachment://husky_happy_meme.jpeg",
					description: joke,
					url: "https://github.com/ABSphreak/readme-jokes"
				}
			});
		}).catch(error => {
			throw error;
		});
};

function getJokeFromSVGText(svgTxt) {
	let res = "";
	const arr = svgTxt.split("\n");

	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].trim();
		if (arr[i].includes("<p class=\"quote\">"))
			res = arr[i].substring("<p class=\"quote\">".length, arr[i].length - 5);
		else if (arr[i].includes("<p class=\"question\">"))
			res += `**Q:** ${arr[i].substring(("<p class=\"question\"><b>Q.</b>".length), (arr[i].length - 5))}\n`;
		else if (arr[i].includes("<p class=\"answer\">"))
			res += `**A:** ${arr[i].substring(("<p class=\"answer\"><b>A.</b>".length), (arr[i].length - 5))}\n`;
		else if (arr[i].includes("<p class=\"answer\"> "))
			res += `${arr[i].substring(("<p class=\"answer\"> ".length), (arr[i].length - 5))}\n`;
	}

	return (res);
}