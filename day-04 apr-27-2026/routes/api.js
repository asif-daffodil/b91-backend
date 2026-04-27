const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
})

router.get('/biplob', (req, res) => {
    res.send('Hello, Biplob!');
})

module.exports = router;