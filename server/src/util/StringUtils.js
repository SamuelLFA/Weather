function normalize(value) {
    return (typeof value !== 'string') ? '' : value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = { normalize };