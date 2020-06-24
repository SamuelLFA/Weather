const assert = require('assert');
const { normalize } = require('../src/util/StringUtils');

describe ('Remove Accent Test', () => {
    it ('should return value without accents', () => {
        assert.equal(normalize('aàáãâèéêiìíîoóòõôuúùû'), 'aaaaaeeeiiiiooooouuuu');
    });
    it ('should return the value with no accent', () => {
        assert.equal(normalize('aeiou'), 'aeiou');
    });
    it ('should return empty', () => {
        assert.equal(normalize(null), '');
    });
    it ('should return empty', () => {
        assert.equal(normalize(''), '');
    });
});