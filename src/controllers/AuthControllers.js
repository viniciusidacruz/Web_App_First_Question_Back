const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const maxExpires = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'super secret key', {
    expiresIn: maxExpires,
  });
};

module.exports.signUp = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.create({ email, password });
    const token = createToken(user._id);

    response.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxExpires * 1000,
    });

    response.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.signIn = async (request, response, next) => {};
