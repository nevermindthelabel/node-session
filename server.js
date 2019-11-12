require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(
  process.env.mongodb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('mongo db connected')
);

const PORT = 4000 || process.env.PORT;

const app = express();

app.use(routes);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    key: process.env.key,
    secret: process.env.secret,
    resave: process.env.resave,
    saveUninitialized: process.env.Uninitialized,
    cookie: {
      httpOnly: true
    }
  })
);

app.listen(PORT, () =>
  console.log(`connected on port http://localhost:${PORT}`)
);
