const mongoose = require("mongoose");

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;

mongoose.connect(`mongodb://${db_user}:${db_password}@${server}/admin`, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    waitQueueTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, returnError);

function returnError(err) {
    if (err) {
        throw Error(`An error has occurred on Mongo connection: ${err}`);
    }
}