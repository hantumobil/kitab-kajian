const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const port = 3000;
const api = require('./api');

app.prepare()
    .then(() => {
        const server = express();

        server.get('/:id', async (req, res, next) => {
            const actualPage = '/kitab';
            const id = req.params.id;
            let queryParams = Object.create(null);
            api.hadits.list(id, (err, _hadits) => {
                if (!err) {
                    queryParams.hadits = _hadits;
                    api.kitab.get(id, (err, _kitab) => {
                        if (!err) {
                            queryParams.kitab = _kitab;
                            app.render(req, res, actualPage, queryParams);
                        } else {
                            next();
                        }
                    });
                } else {
                    next();
                }
            });
        });

        server.get('/kitab/list', async (req, res, next) => {
            api.kitab.list((err, list) => {
                if (!err) {
                    res.send(list);
                } else {
                    next();
                }
            });
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.log(ex.stack);
        process.exit(1)
    });