module.exports = function(message) {
	if (message.guild === null) {
		message.reply("Tu ne peux pas utiliser cette commande en privé.");
		return;
	}
	const splittedMessage = message.content.split(" ");

	if (splittedMessage.length === 2) {
		if (splittedMessage[1].startsWith("<@") && splittedMessage[1].endsWith(">"))
			message.channel.send(`<@${message.author.id}> tu es maintenant marié à ${splittedMessage[1]} grâce aux divines lois de Las Vegas !`);
		else {
			message.channel.send("Mentionne la personne à qui tu veux te marrier (ex: \@Carapuce)");
			return;
		}
	} else if (splittedMessage.length === 1) {
		let members = message.channel.guild.members.cache;
		if (!members.delete(`${message.author.id}`))
			throw new Error(`Impossible de supprimer l'élément ${message.author.id} car l'element est introuvable dans la Map() de la commande Las Vegas`);
		const pos = Math.floor(Math.random() * members.size + 1);
		members = members.entries();
		for (let i = 0; i < pos - 1; i++) {
			members.next();
		}
		message.channel.send(`<@${message.author.id}> tu es maintenant marié à <@${members.next().value[1].user.id}> grâce aux divines lois de Las Vegas !`);
	} else {
		message.channel.send("Pour uiliser la commande LasVegas, tu peux juste écrire la commande sans arguments ou mentionner la personne à qui tu veux te marier.");
	}
};