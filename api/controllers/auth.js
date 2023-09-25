const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({ ...req.body, password: hash });
  await newUser.save();
  res.status(201).send('User has been registered');
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json('User Not Found');

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect)
    return res.status(400).json('Wrong username or password');

  const tokenCredentials = { id: user._id };

  const token = jwt.sign(tokenCredentials, process.env.SECRET);

  res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json({ name: user.name, email: user.email });
};

const getUser = async (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) return res.status(401).json('You are not authenticated!');

  jwt.verify(access_token, process.env.SECRET, {}, async (err, user) => {
    if (err) return res.status(403).json('Token is not valid!');
    const { name, email, _id } = await User.findById(user.id);
    res.json({ name, email, _id });
  });
};

module.exports = { register, login, getUser };
