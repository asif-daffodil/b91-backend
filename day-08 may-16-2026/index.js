const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        const ext = file.mimetype.split("/")[1];

        cb(null, uniqueSuffix + "." + ext);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/upload", (req, res) => {

    upload.single("file")(req, res, (err) => {

        if (err) {
            return res.status(400).send(err.message);
        }

        res.send("File uploaded successfully!");
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});