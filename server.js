const express = require('express')
const mongoose = require('mongoose')
require('./models/film')
const filmsrepo = require('./repository/film')
const FilmModel = mongoose.model('FilmModel')
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 5000
mongoose.connect('mongodb://localhost/films')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})

app.get('/api/test', (req, res) => {
    res.send({ express: 'Api Success' })
})

app.get('/api/films', (req, res) => {
    FilmModel.find(function (err, films) {
        res.send(films)
    })
})

app.post('/api/save/film', (req, res) => {
    res.send(FilmModel(
        {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            duration: req.body.duration,
            image: req.body.image,
            date_created: new Date(),
            description: req.body.description
        }
    ).save())
})

app.post('/api/save/comment', (req, res) => {
    FilmModel.findByIdAndUpdate(req.body._id, { $set: { comments: req.body.comments } }, function (err, film) {
        if (err) return handleError(err);
        res.send(film);
    });
})


app.listen(port, () => console.log(`Listening on port ${port}`))
