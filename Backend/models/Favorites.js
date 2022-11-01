const {Schema, model} = require('mongoose')
const Movie = require('./Movie')

const FavoritesSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    movies: [{type: Movie}]
    
})