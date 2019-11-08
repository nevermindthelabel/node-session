require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const routes = require('./routes');

const PORT = 4000 || process.env.PORT;

const app = express();

app.use(routes);
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
      expires: process.env.cookieExpiration,
    },
  })
);

app.listen(PORT, () =>
  console.log(`connected on port http://localhost:${PORT}`)
);
