const mognoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testingMaterial = require('./testing_material')

beforeEach(async () => {
  await Blog.deleteMany()
  let blog = new Blog(testingMaterial.initialBlogs[0])
  await blog.save()
  blog = new Blog(testingMaterial.initialBlogs[1])
  await blog.save()

})

test('testing database has the correct items', async () => {
  const result = await api.get('/api/blogs')
  
  const titlesGet = result.body.map(blog => blog.title)
  const titlesInitial = [testingMaterial.initialBlogs[0].title, testingMaterial.initialBlogs[1].title]

  expect(titlesGet).toEqual(titlesInitial)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the field identifying a blog should be named id', async () => {
  const result = await api.get('/api/blogs')
  result.body.forEach(blog => {
    //console.log(blog)
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

test('the system atomatically adds 0 for the value of likes field if the field is missing', async () => {
  const newBlog = {
    title: "React tactics",
    author: "Michael Chan",
    url: "https://reactpatterns.com/"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogs = await api.get('/api/blogs')
  const addedBlog = blogs.body.find(blog => blog.title === "React tactics")
  expect(addedBlog.likes).toBe(0)
})

test('if added blog has title field missing returns status code 400', async () => {
  const newBlog = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('if added blog has author field missing returns status code 400', async () => {
  const newBlog = {
    title: "React tactics",
    url: "https://reactpatterns.com/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mognoose.connection.close()
})