const request = require('supertest')
const app = require('../server')

describe('Post Endpoints', () => {
    it('Log into the app', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                first_name: "Luc",
                last_name: "Brulet",
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('message.driver')
        expect(res.body).toHaveProperty('message.session')
    })

    it('Get drivers', async () => {
        const res = await request(app)
            .get('/api/drivers')
        expect(res.statusCode).toEqual(200)
    })

    it('Get driver by id', async () => {
        const drivers = await request(app)
            .get('/api/drivers')

        id = drivers.body.message[0]._id
        const res = await request(app)
            .get('/api/drivers/' + id)
        expect(res.statusCode).toEqual(200)
    })

    it('Get inactive session by user', async () => {
        const drivers = await request(app)
            .get('/api/drivers')

        id = drivers.body.message[0]._id
        const res = await request(app)
            .get('/api/drivers/' + id + '/inactive-session')
        expect(res.statusCode).toEqual(200)
    })

    it('Get inactive session by user', async () => {
        const drivers = await request(app)
            .get('/api/drivers')

        id = drivers.body.message[0]._id
        const res = await request(app)
            .get('/api/drivers/' + id + '/inactive-session')
        expect(res.statusCode).toEqual(200)
    })

    it('Search user', async () => {
        const res = await request(app)
            .get('/api/drivers/search?lastname=Brulet?firstname=Luc')
        expect(res.statusCode).toEqual(200)
    })

    it('Get inactive session by user', async () => {
        const drivers = await request(app)
            .get('/api/drivers')

        id = drivers.body.message[0]._id
        const res = await request(app)
            .get('/api/drivers/' + id + '/inactive-session')
        expect(res.statusCode).toEqual(200)
    })

    it('Get location by user', async () => {
        const driver = await request(app)
            .post('/api/auth/login')
            .send({
                first_name: "Luc",
                last_name: "Brulet",
            })

        id_session = driver.body.message.session._id
        console.log(id_session)
        const res = await request(app)
            .post('/api/driver/add-location/' + id_session)
            .send({
                latitude: 43.3,
                longitude: 102.2
            })
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
    })

    it('Logout from the app', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                first_name: "Luc",
                last_name: "Brulet",
            })
        const res = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', 'bearer ' + login.body.message.token)
        expect(res.statusCode).toEqual(200)
    })

})
