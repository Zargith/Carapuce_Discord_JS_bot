const DBURI = "mongodb://localhost:27017/CaraDatabase";
const config = require("./config.json");

const DBNAME = config.dbName;
//const Logger = require("mongodb").Logger;
const mongoClient = require("mongodb").MongoClient;
let client;
let db;

try {
	client = new mongoClient(DBURI, {useUnifiedTopology: true});
//	Logger.setLevel("debug");

	client.connect(async (err) => {
		if (err)
			return console.log(err);
		db = client.db(DBNAME);
		console.log(`Connected to database ${DBNAME}`);
		const collections = await db.listCollections({}, { nameOnly: true }).toArray();
		if (collections.length < 1) {
			console.log("No collection found");
			process.exit(0);
		}
		console.log(`Collections:`);
		for (let i = 0; i < collections.length; i++)
			console.log(`\t${collections[i].name}`);
		console.log("");
		drop_collection(collections, 0);
	});
} catch (exception) {
	console.log(`Error exception:\n${exception.stack}`);
	process.exit(1);
}

async function drop_collection(collections, i) {
	if (i >= collections.length)
		process.exit(0);

	await db.collection(collections[i].name).drop(async function(error, delOK) {
		if (error) throw error;
		if (delOK) console.log(`Collection ${collections[i].name} deleted`);
		i++;
		drop_collection(collections, i);
	});
}