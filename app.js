const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//set priority for the dist folder
app.use(express.static(path.join(__dirname, 'orda-orders-client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',  usersRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
