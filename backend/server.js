const express = require('express');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
require('dotenv').config();

const app = express();

const sessionStore = new SequelizeStore({ db: sequelize });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
}));

sessionStore.sync();

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`EMS Server running on port ${process.env.PORT}`)
  );
});