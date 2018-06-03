'use strict'
const mongoose = require('mongoose')
const FilmModel = mongoose.model('FilmModel')

let filmsrepo = {}

filmsrepo.saveFilms = function (req, res) {
    FilmModel(
        {
            name: req.body.name,
            duration: req.body.duration,
            image: req.body.image,
            date_created: new Date()
        }
    ).save()
}

/*exports.updateFilms = function (req, res) {
    const comments =  req.body.comment
    film(
      {
        id:req.body.id,
        name: req.body.name,
        duration: req.body.duration,
        image: req.body.image,
        date_created: new Date(),
        comments : comments
      }
    ).save()
  }*/

filmsrepo.listFilms = function (req, res) {
    FilmModel.find(function (err, films) {
        console.log('Films')
        //return films
        res.send(films)
    })
}

module.exports = filmsrepo;