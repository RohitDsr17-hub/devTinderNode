const express = require('express');

const app = express();

app.use("/test", (req, res) => {
    res.send('hello from the server');
});

app.use("/hello", (req, res) => {
    res.send('hello helloooo');
});

app.listen(3000, () => {
    console.log("server successfully listening on port 3000");
});