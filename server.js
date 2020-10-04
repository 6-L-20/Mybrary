if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/**
 * Imports :
 */
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

/**
 * Routes :
 */
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


/**
 * View engine :
 */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

/**
 * Uses :
 */
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

/**
 * MongoDB :
 */
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to Mongoose'))


/**
 * Use the Routes :
 */
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


/**
 * Launch server :
 */
app.listen(process.env.PORT || 3000); 