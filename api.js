const Tabletop = require('tabletop');
const config = require('./config');
const spreadSheetDataKey = config.spreadSheetDataKey;
const kitabSheetName = config.kitabSheetName;

let data;
async function init() {
    data = await Tabletop.init({
        key: spreadSheetDataKey,
        callback: (data, tabletop) => {
            console.log('tabletop initialized');
        }
    });
}
init();

const api = {
    kitab: {
        async list() {
            init();
            return data.models[kitabSheetName].elements;
        }
    },
    hadits: {
        async list(kitabId) {
            init();
            return data.models[kitabId];
        }
    }
};

module.exports = api;