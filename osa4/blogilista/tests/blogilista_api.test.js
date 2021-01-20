const mognoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('Initial database', () => {
  beforeEach(async () => {
    await Blog.deleteMany()
    await Blog.insertMany(helper.initialBlogs)
  })

  test('has the correct items', async () => {
    const blogs = await helper.blogsInDB()
    const blogTitles = blogs.map(blog => {
      // console.log(blog.title)
      return blog.title
    })
    // console.log('next')
    // console.log(blogTitles)
    const initialTitles = helper.initialBlogs.map(blog => blog.title)
    // console.log(blogTitles)
    // console.log(initialTitles)
    expect(blogTitles).toEqual(initialTitles)
  })

  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs where the identifying field is id', async () => {
    const blogs = await helper.blogsInDB()
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    });
  })

  describe("Adding a new blog", () => {
    test('increases the number of blogs by 1', async () => {
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

      const blogs = await helper.blogsInDB()
      expect(blogs).toHaveLength(helper.initialBlogs.length  + 1)
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
    
      const blogs = await helper.blogsInDB()
      const addedBlog = blogs.find(blog => blog.title === "React tactics")
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
      const blogs = await helper.blogsInDB()
      await api
        .delete(`/api/blogs/${blogs[0].id}`)
        .expect(203)

      const blogsAfterDeletion = await helper.blogsInDB()
      // console.log(helper.initialBlogs.length)
      // console.log(blogs.length)
      // console.log(blogsAfterDeletion.length)
      expect(blogsAfterDeletion).toHaveLength(blogs.length - 1)
    })
  })

  describe('Updating a blog', () => {

    test('can change blog likes', async () => {
      const blogs = await helper.blogsInDB()
      const blogToUpdate = blogs[0]
      blogToUpdate.likes = 10

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const updatedBlogs = await helper.blogsInDB()
      const updatedBlog = updatedBlogs.find(blog => blog.id === blogToUpdate.id)
      expect(updatedBlog.likes).toBe(blogToUpdate.likes)

    })
  })

  afterAll(async () => {
    await mognoose.connection.close()
  })
})

