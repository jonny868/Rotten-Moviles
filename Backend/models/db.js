const mongoose = require('mongoose');
const uri = "mongodb+srv://jonny868:seguridad1234@rottenapp.77ytzqv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))