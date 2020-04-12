module.exports = function (message) {
	if (message.guild === null) {
		message.reply("Tu ne peux pas utiliser cette commande en privé.");
		return;
	}

	let members = message.channel.guild.members;
	if (!members.delete(`${message.author.id}`))
		throw(`Impossible de supprimer l'élément ${message.author.id} car l'element est introuvable dans la Map() de la commande Las Vegas`);
	let pos = Math.floor(Math.random() * members.size + 1);
	members = members.entries();
	for (let i = 0; i < pos - 1; i++) {
		members.next();
	}
	message.channel.send(`<@${message.author.id}> tu es maintenant marié à <@${members.next().value[1].user.id}> grâce aux divines lois de Las Vegas !`);
};