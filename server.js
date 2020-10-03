if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/**
 * Imports :
 */
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

/**
 * Routes :
 */
const indexRouter = require('./routes/index')

/**
 * View engine :
 */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

/**
 * MongoDB :
 */
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

/**
 * Launch server :
 */
app.listen(process.env.PORT || 3000); 