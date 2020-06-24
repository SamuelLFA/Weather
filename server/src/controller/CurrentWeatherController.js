const axios = require("axios");
const { validationResult } = require("express-validator");
const { config } = require("../config/OpenWeather");
const { normalize } = require("../util/StringUtils");
const History = require("../model/History");

const { BASE_URL, UNITS, LANGUAGE } = config;
const OW_KEY = process.env.KEY_OPEN_WEATHER;

const RESOURCE = "weather";

async function get(req, res) {
    try {
        validationResult(req).throw();

        const { city } = req.query;

        const normalizedName = normalize(city);

        const { data } = await axios.get(`${BASE_URL}/${RESOURCE}`, {
            params: {
                q: normalizedName,
                units: UNITS,
                lang: LANGUAGE,
                appid: OW_KEY
            }
        });

        await updateHistory(normalizedName);

        req.io.emit("updateHistory");

        const { name, sys, main, weather } = data;

        const response = {
            city: name,
            country: sys.country,
            temp: {
                current: main.temp
            },
            humidity: main.humidity,
            weather: weather[0].description
        };

        res.json(response);
    } catch (err) {
        if (err.errors) {
            res.status(404).json({ errors: err.errors });
        } else {
            res.status(500).json({ errors: err.message || err });
        }
    }
}

async function updateHistory(city) {
    const dbCity = await getCity(city);
    await dbCity.updateOne({
        $set: { lastSearch: new Date(), hits: (dbCity.hits || 0) + 1 }
    });
}

async function getCity(city) {
    try {
        let dbCity = await History.findOne({ city });
        if (!dbCity) {
            dbCity = History.create({
                city
            });
        }
        return dbCity;
    } catch (err) {
        throw new Error(
            `An error occured while trying to find the Searchs: ${err}`
        );
    }
}

module.exports = { get };
