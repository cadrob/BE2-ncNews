const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const  DB_URL  = process.env.DB_URL || require('./config')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')




mongoose.connect( // we need to connect to the database everytime we have a request
    DB_URL,
    { useNewUrlParser: true, useCreateIndex: true },
    console.log("Connected to DB...")
  );

app.use('/api', apiRouter)

app.use('/*', (req, res, next) => {
  return next({status: 404, msg: 'Page Not Found'})
})

app.use((err, req, res, next) => {
  if(err.name === 'CastError') {
    res.status(400).send({msg:`ID doesn\'t exist for ${err.value}` || 'Internal Server Error'})
  }
  else if(err.name ==='ValidationError') {
    res.status(400).send({msg: `Bad Request - ${err.message}`} || 'Internal Server Error')
  }
  else res.status(err.status || 500).send({msg: err.msg || 'Internal Server Error'})
});



module.exports = app;