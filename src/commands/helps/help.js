const commonHelp = require("./commonHelp.js");
const adminHelp = require("./adminHelp.js");
const musicHelp = require("./musicHelp.js");

module.exports.printCommonHelp = commonHelp(message);

module.exports.printAdminHelp = adminHelp(message);

module.exports.printMusicHelp = musicHelp(message);