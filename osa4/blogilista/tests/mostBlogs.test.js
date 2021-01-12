const listHelper = require("../utils/list_helper")
const Blog = require('../models/blog')
const testingMaterial = require('./testing_material')

describe('favoriteBlog', () => {
  test('of list of 1 blog is the blog', () => {
    const blogs = [testingMaterial.initialBlogs[0]]
    const mostBlogs = listHelper.mostBlogs(blogs)
    const correctAnswer = {
      author: "Michael Chan",
      blogs: 1
    }
    expect(mostBlogs).toEqual(correctAnswer)
  })

  test('of list of several blogs is the one with most lkes', () => {
    const blogs = testingMaterial.initialBlogs
    const mostBlogs = listHelper.mostBlogs(blogs)
    const correctAnswer = {
      author: "Robert C. Martin",
      blogs: 3
     }
    expect(mostBlogs).toEqual(correctAnswer)
  })

  test('of empty blog list is undefined', () => {
    const blogs = []
    const mostBlogs = listHelper.mostBlogs(blogs)
    expect(mostBlogs).toEqual(undefined)
  })
})
