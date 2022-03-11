const commonCommands = require("../commands/helps/commonHelp.js");
const musicCommands = require("../commands/helps/musicHelp.js");
const adminCommands = require("../commands/helps/adminHelp.js");
const whitelistCommands = require("../commands/helps/whitelistHelp.js");

module.exports = function() {
	return ([].concat(commonCommands.getSlashCommands(), musicCommands.getSlashCommands()));/*, adminCommands.getSlashCommands(), whitelistCommands.getSlashCommands());*/
};
