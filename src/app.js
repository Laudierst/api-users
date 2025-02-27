const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()
require('./models/db')

const indexRouter = require('./routes/index');
const port = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

module.exports = app;
