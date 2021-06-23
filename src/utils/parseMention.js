module.exports = function(mention) {
	if (!mention)
		return;

	let res = "";

	if ((mention.startsWith("<@") || mention.startsWith("<#")) && mention.endsWith(">")) {
		res = mention.slice(2, -1);

		if (res.startsWith("!") || res.startsWith("&"))
			res = res.slice(1);
	}

	return res;
};