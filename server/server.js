global.__basedir = __dirname;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/book-corner';
const dbPort = process.env.DB_PORT || '3000';

//const { authMiddleware } = require('./middlewares/authMiddleware') //THIS IS FOR THE NAVIGATION TO WORK

const app = express();
app.use(express.static(path.resolve(__basedir, 'static')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(authMiddleware); //THIS IS FOR THE NAVIGATION TO WORK

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(routes);

mongoose.connect(dbUri);
mongoose.connection.on('connected', () => console.log('DB is Connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is Disconnected!'));
mongoose.connection.on('error', (err) => console.log('DB Error: ' + err));

app.listen(dbPort, () => console.log(`App is listening on http://localhost:${dbPort}`));