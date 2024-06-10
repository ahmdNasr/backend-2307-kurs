import request from 'supertest'
// import {app} from '../index.js'


describe("user login", ()=>{
    test("user login with correct data returns 200 and json", ()=>{
        request("http://localhost:9000")
            .post('/users/login')
            .send({email: 'stefan@supercode.de', password: "stefan"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
            if (err) throw err;
            });
    })
})
