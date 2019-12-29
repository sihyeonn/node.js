const express = require('express');
const app = express();
const host = '127.0.0.1';
const port = 3000;
const default_lang = 'english';

const HELLO = {
    'french': 'Bonjour',
    'spanish': 'Hola',
    'english': 'Hello'
};

const WORLD = {
    'french': 'Monde',
    'spanish': 'Mundo',
    'english': 'World'
};

app.listen(port, () => { // = app.listen(port, host, () => {});
    console.log(`http://${host}:${port}`);
});

app.get('/', (req, res) => {
    let name = (req.query.name) ? req.query.name : WORLD[default_lang];
    res.send(`<h1>${HELLO[default_lang]}, ${name}!</h1>`);
});

app.get("/api/user", (req, res) => {
    let users = { // json
        user: [
            {id: 0, name: "Su", type: 'O'},
            {id: 1, name: "Si", type: 'A'},
            {id: 2, name: "Sa", type: 'A'},
            {id: 3, name: "So", type: 'O'}
        ],
        cnt: 4
    };
    res.json(users);
});

app.get("/language/:lang/:name", (req, res) => { // "/blog/:category/:id"
    let lang = req.params.lang;
    let name = req.params.name;
    res.send(`${HELLO[lang]}, ${name}!`);
});

app.get("/language/:lang", (req, res) => {
    let lang = req.params.lang;
    let name = (req.query.name) ? req.query.name : WORLD[lang];
    res.send(`${HELLO[lang]}, ${name}!`);
});

