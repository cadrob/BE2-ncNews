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
        wrongID = new mongoose.mongo.ObjectId
        
     //create a wrong ID using mongoose;
     //comment count
     //error handlers
     //html page for api
     // tests
     //hosts 
     //readme

    beforeEach(() => {
            return seedDB(testData)
            .then((docs) => {
                [ topicDocs, userDocs, articleDocs, commentDocs ] = docs;
            })
    })

    after(() => mongoose.disconnect())
    describe('/articles', () => {
        it('GET returns status 200 an array of all the articles', () => {
            return request.get('/api/articles').expect(200)
            .then((res) => { 
                expect(res.body.articles.length).to.equal(4)
                expect(res.body.articles[0].title).to.equal("Living in the shadow of a great man")
            })
        })
    })
    describe('/articles/:article_id', () => {
        it('GET returns status of 200 and a single article', () => {
            return request.get(`/api/articles/${articleDocs[1]._id}`)
            .expect(200)
            .then((res) => {
                expect(res.body.article.length).to.equal(1)
                expect(res.body.article[0]._id).to.equal(`${articleDocs[1]._id}`)
            })
         })
         it('PATCH returns status of 200 and updates the votecount of said article', () => {
            return request.patch(`/api/articles/${articleDocs[1]._id}?vote=up`).expect(200)
            .then((res) => {
              expect(res.body.article._id).to.equal(`${articleDocs[1]._id}`);
              expect(res.body.article.votes).to.equal(articleDocs[1].votes+1)
            })
            
        })
        it('PATCH returns status of 200 and updates the votecount of said article', () => {
            return request.patch(`/api/articles/${articleDocs[2]._id}?vote=down`).expect(200)
            .then((res) => {
              expect(res.body.article._id).to.equal(`${articleDocs[2]._id}`);
              expect(res.body.article.votes).to.equal(articleDocs[2].votes-1)
                
            })
            
        })
    })
    describe('/articles/:article_id/comments', () => {
        it('GET returns status of 200 and retrieves the comment object for said article', () => {
            return request.get(`/api/articles/${articleDocs[2]._id}/comments`).expect(200)
            .then((res) => {
                expect(res.body.comments[0].belongs_to._id).to.equal(`${articleDocs[2]._id}`)
            })
        })
        it('POST returns a status of 201 and the comment that was added', () => {
            const postedComment = {
            body: "This is my new comment", 
            created_by: "5be5516e60a08790f1370fb9"
            }
            return request.post(`/api/articles/${articleDocs[2]._id}/comments`)
            .send(postedComment)
            .expect(201)
            .then((res) => {
                expect(res.body.comment.belongs_to).to.equal(`${articleDocs[2]._id}`)
                expect(res.body.comment.body).to.equal(postedComment.body)
            })
            
        })

    })
});
