const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    res.send("Post request received");
});

app.put("/", (req, res) => {
    res.send("Put request received");
});

app.delete("/", (req, res) => {
    res.send("Delete request received");
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});