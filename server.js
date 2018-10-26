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
            const data = await api.hadits.list(id);
            if (data !== undefined) {
                const queryParams = { title: 'anything-' + id, id: id, hadits: data.elements};
                app.render(req, res, actualPage, queryParams);
            } else {
                next();
            }
        });

        server.get('/kitab/list', async (req, res, next) => {
            const kitabList = await api.kitab.list();
            res.send(kitabList);
            next();
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