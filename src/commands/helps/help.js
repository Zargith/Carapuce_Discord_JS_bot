const commonHelp = require("./commonHelp.js");
const adminHelp = require("./adminHelp.js");
const musicHelp = require("./musicHelp.js");
const dataBaseHelp = require("./dataBaseHelp.js");
const whitelistHelp = require("./whitelistHelp.js");

module.exports.printCommonHelp = function(message) {
	commonHelp(message);
};

module.exports.printAdminHelp = function(message) {
	adminHelp(message);
};

module.exports.printWhitelistHelp = function(message) {
	whitelistHelp(message);
};

module.exports.printMusicHelp = function(message) {
	musicHelp(message);
};

module.exports.printDataBaseHelp = function(message) {
	dataBaseHelp(message);
};