const assert = require('assert');
const { validateQueryParams } = require('../src/util/ValidateHeader');

describe ('Validate Header Test', () => {
    it ('should return two validations', () => {
        const validations = validateQueryParams(['city', 'time']);
        assert.deepEqual(validations[0].builderOrContext.fields, ['city']);
        assert.deepEqual(validations[1].builderOrContext.fields, ['time']);
    });
    it ('should return one validation', () => {
        const validations = validateQueryParams(['city']);
        assert.deepEqual(validations[0].builderOrContext.fields, ['city']);
    });
    it ('should return empty validations', () => {
        const validations = validateQueryParams([]);
        assert.deepEqual(validations, []);
    });
    it ('should return empty validations', () => {
        const validations = validateQueryParams(null);
        assert.deepEqual(validations, []);
    });
});