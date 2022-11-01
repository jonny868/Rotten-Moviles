const {Schema, model} = require('mongoose')
//arreglar movie schema para luego usarlo en los favoritos
const movieSchema = new Schema({
    title: String,
    comments: Object,
    rates: Number
},{
        timestamps: true
    }
)

module.exports = model('Movie', movieSchema)