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
    // ARTICLES
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

    // USERS
    describe('/users', () => {
        it('GET returns status 200 an array of all users', () => {
            return request.get('/api/users').expect(200)
            .then((res) => { 
                expect(res.body.users.length).to.equal(2)
                expect(res.body.users[0].username).to.equal(userDocs[0].username)
            })
        })
    })
    describe('/users/:username', () => {
        it('GET returns status 200 an array of all users', () => {
            return request.get(`/api/users/${userDocs[0].username}`).expect(200)
            .then((res) => { 
                expect(res.body.user[0].username).to.equal(userDocs[0].username)
                expect(res.body.user[0]._id).to.equal(`${userDocs[0]._id}`)
            })
        })
    })

    //TOPICS

    describe('/topics', () => {
        it('GET returns status 200 an array of all topics', () => {
            return request.get('/api/topics').expect(200)
            .then((res) => { 
                expect(res.body.topics.length).to.equal(2)
                expect(res.body.topics[1].title).to.equal(topicDocs[1].title)
            })
        }) ////:topic_slug/articles
    })
    describe.only('/topics/:topic_slug/articles', () => {
        it('GET returns status 200 and array of articles related to topic', () => {
            return request.get(`/api/topics/${topicDocs[0].slug}/articles`).expect(200)
            .then((res) => { 
                expect(res.body.length).to.equal(2)
                expect(res.body[0].belongs_to).to.equal(topicDocs[0].slug)
            })
        })
        it('POST returns status 201 addsnew article to a topic and returns that new article', () => {
            const postedArticle = { 
            title: "new article", 
            body: "This is my new article content", 
            created_by: "5be5516e60a08790f1370fb9"
        }
            return request.post(`/api/topics/${topicDocs[0].slug}/articles`)
            .send(postedArticle)
            .expect(201)
            .then((res) => {
                expect(res.body.article.belongs_to).to.equal(topicDocs[0].slug)
                expect(res.body.article.title).to.equal(postedArticle.title)
            })
        })
    })
});
