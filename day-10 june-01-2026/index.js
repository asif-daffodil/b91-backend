const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb+srv://lecturer1_db_user:a1b2c3d4@mycluster.gckushv.mongodb.net/mydb').then(() => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

app.get('/users', (req, res) => {
    User.find().then(users => {
        res.json(users);
    })
});

app.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        res.json(user);
    });
});

app.post('/user', (req, res) => {
    User.create(req.body).then(user => {
        res.json(user);
    });
});

app.put('/user/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(user => {
        res.json(user);
    });
});

app.delete('/user/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        res.json(user);
    });
});

app.listen(5000);