process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const { expect } = require('chai');
const seedDB = require('../seed/seed');
const testData = require('../seed/testData')
const mongoose = require('mongoose');
const { DB_URL } = require('../config')

describe('/api', () => {
    let articleDocs, 
        commentDocs, 
        topicDocs, 
        userDocs,
        ;
     //create a wrong ID using mongoose;
     //comment count
     //error handlers
     //html page for api
     // tests
     //hosts 
     //readme

    beforeEach(() => {
        // return mongoose.connect(DB_URL, { useNewUrlParser: true })
        // .then(() => {
        //     console.log('connected to database');
            //return seedDB(testData);
    })

    after(() => mongoose.disconnect())
    describe('/articles', () => {
        it('GET returns status 200 an array of all the articles', () => {
            return request.get('/api/articles').expect(200)
            .then((res) => {  //{body :{ movies }}
                expect(res.body.articles.length).to.equal(4)
                expect(res.body.articles[0].title).to.equal("Living in the shadow of a great man")
            })
        })

    })
});
