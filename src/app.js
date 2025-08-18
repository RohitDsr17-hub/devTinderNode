const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send({ firstName: "rohit", lastName: "sai"});
});

app.post("/user", (req, res) => {
    res.send("data successfully saved");
});

app.delete("/user", (req, res) => {
    res.send("delete successfully");
});

app.use("/test", (req, res) => {
    res.send('hello from the server');
});

app.listen(3000, () => {
    console.log("server successfully listening on port 3000");
});