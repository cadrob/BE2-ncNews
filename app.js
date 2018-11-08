
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const { DB_URL } = require('./config')

app.use(bodyParser.json());



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
  console.log(err);
  res.status(err.status || 500).send({msg: err.msg || 'Internal Server Error'})
});

module.exports = app;