const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin !== "http://localhost:3000") {
        return res.status(403).json({ message: "Forbidden" });
    }

    next();
});

app.get("/", (req, res) => {
    const origin = req.headers.origin;
    res.send(origin);
})

app.listen(5000, () => {
    console.log(`server is running on http://localhost:5000`);
})