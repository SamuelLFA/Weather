const { check } = require("express-validator");

function validateQueryParams(params) {
    return !params
        ? []
        : params.map((param) =>
              check(param)
                  .not()
                  .isEmpty()
                  .withMessage(`Missing parameter: ${param}`)
          );
}

module.exports = { validateQueryParams };
