const Tabletop = require('tabletop');
const spreadSheetDataKey = process.env.DATA_KEY;
const kitabSheetName = process.env.KITAB_SHEET_NAME;
console.log(spreadSheetDataKey);
console.log(kitabSheetName);

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