const mognoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testingMaterial = require('./testing_material')

describe('Initial database', () => {
  beforeEach(async () => {
    await Blog.deleteMany()
    const blogs = testingMaterial.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
  
  })

  test('has the correct items', async () => {
    const result = await api.get('/api/blogs')
    const resultTitles = result.body.map(blog => blog.title)
    const initialTitles = testingMaterial.initialBlogs.map(blog => blog.title)
    expect(resultTitles).toEqual(initialTitles)
  })

  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs where the identifying field is id', async () => {
    const result = await api.get('/api/blogs')
    result.body.forEach(blog => {
      //console.log(blog)
      expect(blog.id).toBeDefined()
    });
  })

  describe("Adding a new blog", () => {
    test('increases the number of blogs by 1', async () => {
      const initialBlogs = await api.get('/api/blogs')
      const newBlog = {
        title: "React tactics",
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

    test('where like field is missing adds it with value 0', async () => {
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

    test('without title returns status code 400', async () => {
      const newBlog = {
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('without author returns status code 400', async () => {
      const newBlog = {
        title: "React tactics",
        url: "https://reactpatterns.com/"
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('Deleting a blog', () => {

    test('decreases the number of blogs by 1', async () => {
      const initialBlogs = await api.get('/api/blogs')
      // console.log(initialBlogs.body)
      await api
        .delete(`/api/blogs/${initialBlogs.body[0].id}`)
        .expect(203)

      const blogsAfterDeletion = await api.get('/api/blogs')
      // console.log(blogsAfterDeletion.body)
      expect(blogsAfterDeletion.body).toHaveLength(initialBlogs.body.length - 1)
    })
  })

  describe('Updating a blog', () => {

    test('can change blog likes', async () => {
      const initialBlogs = await api.get('/api/blogs')
      let changedBlog = initialBlogs.body[0]
      changedBlog.likes = 10
      console.log(changedBlog)

      await api
        .put(`/api/blogs/${changedBlog.id}`)
        .send(changedBlog)
        .expect(200)

      const updatedBlogs = await api.get('/api/blogs')
      blog = updatedBlogs.body.find(blog => blog.id === changedBlog.id)
      expect(blog.likes).toBe(10)

    })
  })
})

afterAll(() => {
  mognoose.connection.close()
})