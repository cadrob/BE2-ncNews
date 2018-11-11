const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

const config = {
    test: {
        DB_URL: 'mongodb://localhost:27017/northcoders-news_testing'
    },
    dev: {
        DB_URL: 'mongodb://localhost:27017/northcoders-news'
    },
    production: {
        DB_URL: 'mongodb://robby:goodpassword123@ds241012.mlab.com:41012/northcoders-news'
    }
}

module.exports = config[ENV];