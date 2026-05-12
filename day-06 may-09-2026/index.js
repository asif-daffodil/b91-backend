const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

app.post('/create-pass', (req, res) => {
    const { password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }
        res.send(hash);
    });
});

app.post('/verify-pass', (req, res) => {
    const { password, hash } = req.body;
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error verifying password' });
        }
        res.json({ isMatch: result });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});