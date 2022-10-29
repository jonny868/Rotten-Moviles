const {Schema,model} = require('mongoose')



const rateSchema = new Schema({
    username: String,
    userId: String,
    rate: Number,
    movieId: String,
   
})


module.exports = model('rate', rateSchema);