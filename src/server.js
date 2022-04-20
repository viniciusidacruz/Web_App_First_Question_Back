require('dotenv').config();

const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/AuthRoutes');
const { signIn, signUp } = require('./controllers/AuthControllers');

const app = express();

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.zki6u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
    console.log('Connected with database Mongo DB');
  })
  .catch((err) => console.log(err));

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Está rodando' });
});

app.post('/signIn', signIn);
app.post('/signUp', signUp);

app.use(
  cors({
    origin: [''],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/', authRoutes);
