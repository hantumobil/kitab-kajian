require('dotenv/config');
const Tabletop = require('tabletop');
const spreadSheetDataKey = process.env.DATA_KEY;
const kitabSheetName = process.env.KITAB_SHEET_NAME;

function getTabletop(callback) {
    Tabletop.init({
        key: spreadSheetDataKey,
        callback: callback
    });
}

const api = {
    kitab: {
        list(callback) {
            getTabletop((data, tabletop) => {
                const kitabList = tabletop.sheets(kitabSheetName).elements;
                if (kitabList.length > 0) {
                    callback(false, kitabList);
                } else {
                    callback(false, []);
                }
            });
        },
        get(kode, callback) {
            getTabletop((data, tabletop) => {
                const kitab = tabletop.sheets(kitabSheetName).elements.find(kitab => kitab.kode === kode);
                if (kitab) {
                    callback(false, kitab);
                } else {
                    callback(true, []);
                }
            });
        }
    },
    hadits: {
        list(id, callback) {
            getTabletop((data, tabletop) => {
                const haditsList = tabletop.sheets(id);
                if (haditsList) {
                    callback(false, haditsList.elements);
                } else {
                    callback(true, []);
                }
            });
        }
    }
};

module.exports = api;


// test API below this line...

// api.kitab.list((err, res) => {
//     console.log(err, res);
// });
//
// api.kitab.get('arbain', (err, res) => {
//     console.log(err, res);
//     api.kitab.get( 'other', (err, res) => {
//         console.log(err, res);
//     });
// });
//
// api.hadits.list('arbain', (err, res) => {
//     console.log(err, res);
//     api.hadits.list('other', (err, res) => {
//         console.log(err, res);
//     });
// });