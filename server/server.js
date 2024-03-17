global.__basedir = __dirname;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const handlebars = require('express-handlebars');
const apiRouter = require('./router');
const routes = require('./routes');
const path = require('path');

const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/book-corner';
const dbPort = process.env.DB_PORT || '3000';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use(routes);

// app.engine('hbs', handlebars.engine({
//    extname: 'hbs',
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.resolve('server/views'));

mongoose.connect(dbUri);
mongoose.connection.on('connected', () => console.log('DB is Connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is Disconnected!'));
mongoose.connection.on('error', (err) => console.log('DB Error: ' + err));

app.listen(dbPort, () => console.log(`App is listening on http://localhost:${dbPort}`));