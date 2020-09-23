const request = require('supertest');
const app = require('../api/app.js');

beforeEach = () => {
    connection.seed.run()
}


afterAll = () => {
    return connection.destroy()
}


describe.only('app', ()=> {
    describe('/api', ()=> {
        describe('/topics', () => {
            describe('GET', ()=> {
                it('GET request responds with Status:200', ()=> {
                    return request(app)
                    .get('/api/topics')
                    .expect(200)
                })
                it('GET request responds with an array of topics objects', ()=> {
                    return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then((res)=> {
                        expect(res.body.topics).toEqual(expect.any(Array))
                    })
                })
                it('incorrect path responds with status:404', ()=> {
                    return request(app)
                    .get('/api/tropics')
                    .expect(404)
                    .then(({body: {msg}})=> {
                        expect(msg).toBe('path not found')
                    })
                })
            })
        })
    })
})