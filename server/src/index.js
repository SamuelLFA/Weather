require("dotenv").config();
require("./config/Mongo");

const express = require("express");
const cors = require('cors')
const routes = require("./routes");
const sio = require('socket.io');
const app = express();

const DEFAULT_PORT = 8081;

const listener = app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log(`Running in port ${listener.address().port}`);
});

const io = sio.listen(listener);

app.use((req, _, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(routes);

module.exports = app;
