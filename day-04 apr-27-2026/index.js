const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const apiRoutes = require('./routes/api');
app.use(`/api/${process.env.VERSION}`, apiRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});
