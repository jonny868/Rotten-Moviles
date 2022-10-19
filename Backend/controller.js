const ctrl = {}
const User = require('../Backend/models/User');
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'osmosisinversa'
const bcrypt = require('bcrypt')
const { v4 } = require('uuid');


ctrl.home = (req, res) => {
    res.send('hey home')
}
ctrl.register = async (req, res) => {
    const { email, password } = req.body;
      const newUser = new User({email, password});
      await newUser.save();
          const token = await jwt.sign({_id: newUser._id}, SECRET_KEY);
      res.status(200).json({token});
  };


module.exports = ctrl;