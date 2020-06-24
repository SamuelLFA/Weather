const express = require("express");
const router = express.Router();

const { validateQueryParams } = require("./util/ValidateHeader");
const CurrentWeatherController = require("./controller/CurrentWeatherController");
const HistoryController = require("./controller/HistoryController");

router.get("/isAlive", (_, res) => {
    res.json({ isAlive: true });
});

router.get(
    "/currentWeather",
    validateQueryParams(["city"]),
    CurrentWeatherController.get
);

router.get("/history", HistoryController.get);

module.exports = router;
