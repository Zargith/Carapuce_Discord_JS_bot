module.exports = async function(message, bot) {
	const args = message.content.split(" ");

	try {
		const number = message.guild.roles.cache.get(args[1]).members.size;
		number === 1 ? message.channel.send(`Il y a ${number} personne avec le rôle <@&${args[1]}>`) : message.channel.send(`Il y a ${number} personnes avec le rôle <@&${args[1]}>`);
	} catch (error) {
		message.channel.send("Il y a un problème avec l'id du rôle.");
		console.error(error);
	}
};
