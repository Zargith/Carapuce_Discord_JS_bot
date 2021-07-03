const serverValidator = require("./schemas-validators/server.json");

// Global that stores the name of the database we're working with.
const DBNAME = bot.config.database.dbName;

// Global that stores the host of our database. By default it is "localhost"
// /!\ Warning : If the database is stored in a local docker container, it may be the name of the container not "localhost" /!\\
const HOST = bot.config.database.host ? bot.config.database.host : "localhost";

// Global that stores the port of our database. By default it is "27017"
// /!\ Warning : If the database is stored in a local docker container, it may be the port you linked to /!\\
const PORT = bot.config.database.port ? bot.config.database.port : "27017";

// Global that stores the auth source of the database the user is created in. By default it is "admin"
const AUTHSOURCE = bot.config.authSource ? bot.config.authSource : "admin";

// Global that stores the URI needed by MongoDB to connect to a database with a username, password, host, port, database's name and auth.
// It should look like that **mongodb://\<username\>:\<password\>@\<host\>:\<port\>/\<database's name\>?authSource=\<auth source\>**
const DBURI = `mongodb://${encodeURIComponent(HOST)}:${encodeURIComponent(PORT)}/${encodeURIComponent(DBNAME)}?authSource=${encodeURIComponent(AUTHSOURCE)}`;
// const DBURI = "mongodb://localhost:27017/CaraDatabase";

// const Logger = require("mongodb").Logger;
const mongoClient = require("mongodb").MongoClient;
let client;
try {
	client = new mongoClient(DBURI, {useUnifiedTopology: true});
// 	Logger.setLevel("debug");
} catch (exception) {
	console.log(`Error exception:\n${exception.stack}`);
	process.exit(1);
}

let mongodb;

// Function to create a collection in the database
function _createCollection(db, collectionName, schemaValidator = null) {
	if (schemaValidator) {
		db.createCollection(collectionName, schemaValidator, function(error, res) {
			if (error)
				throw error;
			console.log(`Collection ${collectionName} created, schema validator in effect`);
		});
		return;
	}
	db.createCollection(collectionName, function(error, res) {
		if (error)
			throw error;
		console.log(`Collection ${collectionName} created`);
	});
}

// Function to connect to the database
function connect() {
	client.connect(async err => {
		if (err)
			return console.log(err);

		mongodb = client.db(DBNAME);
		console.log(`Connected to database ${DBNAME}`);

		const collections = await mongodb.listCollections({}, {nameOnly: true}).toArray();
		const collectionsIsPresent = {Servers: false};

		for (let i = 0; i < collections.length; i++) {
			if (collections[i].name === "Servers")
				collectionsIsPresent.Servers = true;
		}

		if (!collectionsIsPresent.Servers)
			_createCollection(mongodb, "Servers", serverValidator);
	});
}

// Function to disconnect from the database
function close() {
	mongodb.close(err => {
		if (err)
			throw err;
		console.log("Connection to database closed");
	});
}

// Function to get the object representing the database
function get() {
	return mongodb;
}

// Function to check, by interaction with database, if it is still connected to it
async function isConnected() {
	try {
		const collections = await mongodb.listCollections({}, {nameOnly: true, maxTimeMS: 1000}).toArray();
		if (collections !== undefined)
			return true;
		return false;
	} catch (exception) {
		return false;
	}
}

// Function to update a model instance field in the database
async function updateField(modelInstance, collectionName, fieldName, newValue) {
	try {
		let updatePair = {};
		updatePair[fieldName] = newValue;

		const dbOutput = await mongodb.collection(collectionName).updateOne(
			{_id: modelInstance._id},
			{$set: updatePair}
		);
		if (!dbOutput.result || !dbOutput.result.ok || dbOutput.result.ok != 1 || dbOutput.modifiedCount !== 1)
			return ({success: false, message: `Echec lors de la mise à jour de l'entrée ${fieldName} d'une instance de la collection ${collectionName}`});

		return ({success: true});
	} catch (exception) {
		console.log(`Error exception:\n${exception.stack}`);
		return ({success: false, message: exception.stack});
	}
}

module.exports = {
	connect,
	close,
	get,
	updateField,
	isConnected
};