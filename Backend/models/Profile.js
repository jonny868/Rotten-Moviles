const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  username: { type: String, unique: true },
  email:{type: String, unique: true},
  dob: { type: String, required: false },
  favorites: { type: String, required: false },
  comments: { type: String, required: false },
});


module.exports = model('profileSchema', ProfileSchema);