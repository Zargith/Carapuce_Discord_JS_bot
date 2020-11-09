module.exports = function(message, bot) {
	const args = message.content.split(" ");
	let id = args[1];

	try {
		id = id.substring(3);
		id = id.substring(0, id.length - 1);
		const number = message.guild.roles.cache.get(id).members.size;
		number === 1 ? message.channel.send(`Il y a ${number} personne avec le rôle ${args[1]}`) : message.channel.send(`Il y a ${number} personnes avec le rôle ${args[1]}`);
	} catch (error) {
		message.channel.send("Il y a un problème avec le ping du rôle.");
		console.error(error);
	}
};
