const ctrl = {};
const User = require("../Backend/models/User");
const Comment = require("../Backend/models/Comment");
const Rate = require("../Backend/models/Rate");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "osmosisinversa";
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

ctrl.register = async (req, res) => {
  const { email, password, username } = req.body;
  const validateUsername = await User.findOne({ username: username });
  const validateEmail = await User.findOne({ email: email });
  //Validando que el usuario no esta usado
  if (validateUsername) {
    return res
      .status(406)
      .json({ ok: false, msg: "Username already taken, try a different one" });
  }
  //validando que el email no esta usado
  if (validateEmail) {
    return res
      .status(406)
      .json({ ok: false, msg: "Email already taken, try a different one" });
  }
  const newUser = new User({ email, password, username });
  await newUser.save();
  const token = await jwt.sign({ _id: newUser._id }, SECRET_KEY);
  res.status(200).json({ token, username, email });
};

//login --> completo, falta añadir validaciones
ctrl.login = async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Email or Password Incorrect");
  if (user.password !== password)
    return res.status(401).send("Email or Password Incorrect");

  const token = jwt.sign({ _id: user._id }, SECRET_KEY);
  res.status(200).json({ token, user });
};

ctrl.dashboard = async (req, res) => {
  res.json([
    {
      name: " Rocky IV",
      Genere: ["action", "comedy", "surviving"],
      comments: [
        { username: "john1@gmail.com", comment: "it was good af", rate: 2 },
        { username: "john2@gmail.com", comment: "it was good af", rate: 1 },
        { username: "john23@gmail.com", comment: "it was bad af", rate: 1 },
      ],
      rates: 2,
    },
    {
      name: "Malcom X",
      Genere: ["action", "comedy", "surviving"],
      comments: [
        { username: "john1@gmail.com", comment: "it was good af", rate: 2 },
        { username: "john2@gmail.com", comment: "it was good af", rate: 1 },
        { username: "john23@gmail.com", comment: "it was bad af", rate: 1 },
      ],
      rates: 1,
    },
    {
      name: "Terminator",
      Genere: ["action", "comedy", "surviving"],
      comments: [
        { username: "john1@gmail.com", comment: "it was good af", rate: 2 },
        { username: "john2@gmail.com", comment: "it was good af", rate: 1 },
        { username: "john23@gmail.com", comment: "it was bad af", rate: 1 },
      ],
      rates: " 3",
    },
  ]);
};

ctrl.profile = (req, res) => {
  res.send(req.userId);
};

ctrl.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Authorization Required");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Authorization Required");
  }
  //payload : data that can be passed trough different requests
  const data = jwt.verify(token, SECRET_KEY);
  req.userId = data._id;
  next();
  console.log(data);
};

ctrl.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ctrl.createComment = async (req, res, next) => {
  const commentary = req.body;
  const newComment = new Comment(commentary);
  try {
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ctrl.rateMovie = async (req, res, next) => {
  const rate = req.body;
  const newRate = new Rate(rate);
  try {
    await newRate.save();
    res.status(200).json(newRate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ctrl.getRates = async (req, res, next) => {
  try {
    const rates = await Rate.find();
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ctrl.getCommentsByMovie = async (req, res, next) => {
  const movieId = req.params.id
  const searchComments = await Comment.find({movieId:movieId});
  if (searchComments) {
    res.json({
      comments: searchComments,
    });
  } else {
    res.status(404).json({
      message: "Error",
    });
  }
};
ctrl.getRatesByMovie = async (req, res, next) => {
  const movieId = req.params.id
  const searchRates = await Rate.find({movieId:movieId});
  if (searchRates) {
    res.json({
      rates: searchRates,
    });
  } else {
    res.status(404).json({
      message: "Error",
    });
  }
}

ctrl.home = async (req, res, next) => {
  res.send("Hello world");
};

module.exports = ctrl;
