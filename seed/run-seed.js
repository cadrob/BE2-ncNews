const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL  = process.env.DB_URL || require('../config')
const rawData = require('../seed/devData')

mongoose.connect(DB_URL, { useNewUrlParser: true })
.then(() => {
    console.log('connected to database');
    return seedDB(rawData) //object containing the other 4 objects
})
.then(() => mongoose.disconnect());


