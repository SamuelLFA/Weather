const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    city: String,
    lastSearch: Date,
    hits: Number
});

module.exports = mongoose.model("History", schema);
