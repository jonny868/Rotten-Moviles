const ctrl = {}
const User = require('../Backend/models/User');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid');


ctrl.home = (req, res) => {
    res.send('hey home')
}

ctrl.register = (req, res) => {
    const {username, password} = req.body
    const newUser = new User({username, password})

    console.log(newUser)

    
}


module.exports = ctrl;