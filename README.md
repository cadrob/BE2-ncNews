## Northcoders News API

This is a "Northcoders News" API which uses a database consisting of Articles, Comments, Topics and Users.  Database is currently hosted using mLab 

### Getting Started

https://limitless-plains-42557.herokuapp.com/api


### Prerequisites
* Node.js
* MongoDB

### Dependencies:
```
body-parser: ^1.18.3,
ejs: ^2.6.1,
express: ^4.16.4,
mongoose: ^5.3.10
```

### Dev Dependencies:
```
chai: ^4.2.0,
mocha: ^5.2.0,
nodemon: ^1.18.6,
supertest: ^3.3.0
```

### Installation:

1. Fork or Clone the repository then install all required dependencies.

2. Create a 'config.js' file in the root of the directory.  Set environements for both test and development like so:

```
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

const config = {
    test:'mongodb://localhost:27017/northcoders-news_testing',
    dev: 'mongodb://localhost:27017/northcoders-news'
}

module.exports = config[ENV];

```

3. Seed the database by running seed/run-seed.js

e.g.
```
node seed/run-seed.js
```

4. Run either devlopment script or test script.

Note: If running tests ensure all dependenices are installed and test data is used.

```
npm test
```

#Routes

Below is a link to the current possible routes available for the API.

https://limitless-plains-42557.herokuapp.com/api

#Built with:
* Node.js
* MongoDB
* Mongoose
* Express
* EJS
* mLab
* Heroku

# Author

Robert Caddock 



