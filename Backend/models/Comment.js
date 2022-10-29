const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    username: String,
    userId: String,
    message: String,
    movieId: String,
    createdAt: {
        type: Date,
        default: new Date
    },
    likes: {
        type: Number,
        default: 0
    }

})


module.exports = model('Coment', CommentSchema);