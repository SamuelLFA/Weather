const History = require("../model/History");

const defaultLimit = Number(process.env.DEFAULT_LIMIT_HISTORY);

async function get(req, res) {
    try {
        const { limit, isTop } = req.query;

        let dbHistory = await getHistory(Number(limit), isTop);

        if (!dbHistory)
            throw new Error("An error occured while trying to get the history");

        const response = dbHistory.map((history) => {
            return {
                city: history.city,
                lastSearch: history.lastSearch,
                hits: history.hits
            };
        });

        res.json(response);
    } catch (err) {
        console.log(err.stack);

        res.status(404).json({ errors: err });
    }
}

async function getHistory(limit = defaultLimit, isTop = false) {
    return isTop
        ? await History.find().sort({ hits: "desc" }).limit(limit)
        : await History.find().sort({ lastSearch: "desc" }).limit(limit);
}

module.exports = { get };
