module.exports = function(message, bot) {
	const args = message.content.split(" ");
	let id;

	try {
		message.guild.roles.cache.find(role => id = findId(role.name, role.id, args[1]));
		const number = message.guild.roles.cache.get(id).members.size;
		number === 1 ? message.channel.send(`Il y a ${number} personne avec le rôle <@&${id}>`) : message.channel.send(`Il y a ${number} personnes avec le rôle <@&${id}>`);
	} catch (error) {
		message.channel.send("Il y a un problème avec le nom du rôle.");
		console.error(error);
	}
};

function findId(name, id, args) {
	if (name.toUpperCase() === args.toUpperCase())
		return id;
	return;
}
