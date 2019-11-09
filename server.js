require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const routes = require('./routes');

const PORT = 4000 || process.env.PORT;

const app = express();

// app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session(
    {
      key: process.env.key,
      secret: process.env.secret,
      resave: process.env.resave,
      saveUninitialized: process.env.Uninitialized,
      cookie: {
        // expires: process.env.cookieExpiration,
        // maxAge: process.env.maxAge,
        httpOnly: true,
      },
    },
    console.log(process.env.cookieExpiration)
  )
);

app.use((req, res, next) => {
  if (!req.cookies.user_sid) {
    res.clearCookie('user_sid');
  }
  next();
});

const checkUser = (req, res, next) => {
  if (req.cookies.user_sid) {
    res.send('logged in');
  } else {
    res.send('not logged in');
  }
};

app.get('/', checkUser, (req, res) => {
  res.status(200);
});

app.get('/login', (req, res) => {
  res.cookie('user_sid', true).json('cookie');
});

app.listen(PORT, () =>
  console.log(`connected on port http://localhost:${PORT}`)
);
