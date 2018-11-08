const ENV = process.env.NODE_ENV === 'test' ? 'test' : 'dev';

const config = {
    test: {
        DB_URL: 'mongodb://localhost:27017/northcoders-news_testing'
    },
    dev: {
        DB_URL: 'mongodb://localhost:27017/northcoders-news'
    }
}

module.exports = config[ENV];