const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
    name: String,
    genre: String,
    comments: Object,
    rates: Number
},{
        timestamps: true
    }
)

module.exports = model('Movie', movieSchema)