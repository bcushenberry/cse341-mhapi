const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database is already initialized!");
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

const getCollection = async (collectionName) => {
    const dbClient = getDb();
    return await dbClient.db().collection(collectionName);
};

module.exports = {
    initDb,
    getDb,
    getCollection
};
