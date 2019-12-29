const express = require('express');
const app = express();
const host = '127.0.0.1';
const port = 3000;

app.listen(port, () => { // = app.listen(port, host, () => {});
    console.log(`http://${host}:${port}`);
});

app.get('/', (req, res) => {
    res.send("Hello World");
    console.log("I got a request");
});

app.get("/french", (req, res) => {
    res.send("Bonjour Monde")
});

app.get("/spanish", (req, res) => {
    res.send("Hola Mundo")
});
