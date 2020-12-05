const commonHelp = require("./commonHelp.js");
const adminHelp = require("./adminHelp.js");
const musicHelp = require("./musicHelp.js");
const dataBaseHelp = require("./dataBaseHelp.js");

module.exports.printCommonHelp = function(message) {
	commonHelp(message);
};

module.exports.printAdminHelp = function(message) {
	adminHelp(message);
};

module.exports.printMusicHelp = function(message) {
	musicHelp(message);
};

module.exports.printDataBaseHelp = function(message) {
	dataBaseHelp(message);
};