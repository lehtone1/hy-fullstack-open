const mognoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the field identifying a blog should be named id', async () => {
  const result = await api.get('/api/blogs')
  result.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
})

test('adding a blog increases the number of blogs by 1', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const currentBlogs = await api.get('/api/blogs')
  expect(currentBlogs.body.length - initialBlogs.body.length).toBe(1)
})

afterAll(() => {
  mognoose.connection.close()
})