const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post("/create-token",  (req, res) => {
    const myInfo = {
        name: "Asif",
        email: "asif@gmail.com",
        city: "Dhaka"
    }
    jwt.sign(myInfo, "123456789", { expiresIn: '1h' }, (err, token) => {
        if(err){
            return res.send({message: "Token creation failed"});
        }
        res.send({token});
    })
})

app.get("/verify-token", (req, res) => {
    const headerToken = req.headers.authorization;
    const token = headerToken.split(" ")[1];
    jwt.verify(token, "123456789", (err, decoded) => {
        if(err){
            return res.send({message: "Token verification failed"});
        }
        res.send({decoded});
    })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});