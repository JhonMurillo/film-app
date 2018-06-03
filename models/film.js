'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FilmSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  comments: Array,
  name: String,
  duration: Number,
  image: String,
  date_created: Date,
  description: String
})

mongoose.model('FilmModel', FilmSchema)
