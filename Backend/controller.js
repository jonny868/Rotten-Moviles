const ctrl = {};
const User = require("../Backend/models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "osmosisinversa";
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

ctrl.home = (req, res) => {
  res.send("hey home");
};

//registro --> completo, falta añadir validaciones y seguridad

ctrl.register = async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  const token = await jwt.sign({ _id: newUser._id }, SECRET_KEY);
  res.status(200).json({ token });
};

//login --> completo, falta añadir validaciones
ctrl.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Email or Password Incorrect");
  if (user.password !== password)
    return res.status(401).send("Email or Password Incorrect");

  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  res.status(200).json({ token });
};

ctrl.dashboard = async (req, res) => {
  res.json([
    {
      name: " Rocky IV",
      Genere: ["action", "comedy", "surviving"],
      comments: [
        { username: "john1@gmail.com", comment: "it was good af", rate: 2 },
        { username: "john2@gmail.com", comment: "it was good af", rate: 1 },
        { username: "john23@gmail.com", comment: "it was bad af", rate: 1 }],
      rates:2,
    },
    {
      name: "Malcom X",
      Genere: ["action", "comedy", "surviving"],
      comments: [
        { username: "john1@gmail.com", comment: "it was good af", rate: 2 },
        { username: "john2@gmail.com", comment: "it was good af", rate: 1 },
        { username: "john23@gmail.com", comment: "it was bad af", rate: 1 }],
      rates: 1,
    },
    {
      name: "Terminator",
      Genere: ["action", "comedy", "surviving"],
      comments: [
        { username: "john1@gmail.com", comment: "it was good af", rate: 2 },
        { username: "john2@gmail.com", comment: "it was good af", rate: 1 },
        { username: "john23@gmail.com", comment: "it was bad af", rate: 1 }],
      rates: " 3",
    },
  ]);
};
module.exports = ctrl;
