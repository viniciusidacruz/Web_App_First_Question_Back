const User = require("../models/User");
const bcrypt = require("bcrypt");

const signUp = async (request, response, next) => {
  const { email, password, confirmPassword, name } = request.body;

  const existingUser = await User.findOne({ email: email });
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hashSync(password, salt);

  if (!name) {
    return response.status(422).json({ message: "O usuário é obrigatório" });
  }

  if (!email) {
    return response.status(422).json({ message: "O email é obrigatório" });
  }

  if (!password) {
    return response.status(422).json({ message: "A senha é obrigatória" });
  }

  if (password !== confirmPassword) {
    return response.status(422).json({ message: "As senhas não correspondem" });
  }

  if (existingUser) {
    return response
      .status(400)
      .json({ message: "Usuário já existente, tente outro!" });
  }

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);

    response.status(500).json({
      message: "Aconteceu algo no servidor, tente novamente mais tarde!",
    });
  }

  return response.status(201).json({ message: user });
};

const signIn = async (request, response, next) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email: email });
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!email) {
    return response.status(422).json({ message: "O email é obrigatório" });
  }

  if (!password) {
    return response.status(422).json({ message: "A senha é obrigatória" });
  }

  if (!existingUser) {
    return response
      .status(404)
      .json({ message: "Usuário não encontrado. Tente novamente!" });
  }

  if (!isPasswordCorrect) {
    return response.status(400).json({ message: "Email/Senha invalida" });
  }

  return response.status(200).json({ message: "Logado com sucesso!!!" });
};

exports.signUp = signUp;
exports.signIn = signIn;
