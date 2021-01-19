const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('users', () => {

  beforeEach(async () => {
    await User.deleteMany()

    const password = bcrypt.hash('sekreet', 10)
    const user = new User({
      username: 'leero11',
      name: 'Eero Lehtoneen',
      password: password
    })
    user.save()
  }) 

  test('database returns json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('after initialization db has 1 user', async () => {
    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(1)
  })

  describe('adding a new user', () => {
    
    test('increases users by 1', async () => {
      const newUser = {
        username: 'miero',
        name: 'Markus Mieto',
        password: 'salaisuus'
      }

      await api 
        .post('/api/users')
        .send(newUser)
        .expect(200)
        
      const users = await api.get('/api/users')

      expect(users.body).toHaveLength(2)
    })

    test('fails if username less than three characters', async () => {
      const newUser = {
        username: 'mi',
        name: 'Markus Mieto',
        password: 'salaisuus'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const users = await api.get('/api/users')

      expect(users.body).toHaveLength(1)
    })

    test('fails if password less than three characters', async () => {
      const newUser = {
        username: 'mieto',
        name: 'Markus Mieto',
        password: '69'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const users = await api.get('/api/users')

      expect(users.body).toHaveLength(1)
    })
  })
})

