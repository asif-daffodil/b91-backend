const express = require("express");
const app = express();

const myMiddleware = (req, res, next) => {
   console.log("Hello Middleware");

   next();
}

app.use(myMiddleware);

app.get("/", (req, res) => {
   res.send("Home Page");
});

const ageMiddleware = (req, res, next) => {
   const age = req.query.age;
    if (age < 18) {
        res.status(403).send("Access Denied");
    } else {
        next();
    }
}

app.get("/dashboard", ageMiddleware, (req, res) => {
   res.send("Dashboard Page");
});

app.listen(3000);