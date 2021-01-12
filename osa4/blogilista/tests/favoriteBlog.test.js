const listHelper = require("../utils/list_helper")
const Blog = require('../models/blog')
const testingMaterial = require('./testing_material')

describe('favoriteBlog', () => {
  test('of list of 1 blog is the blog', () => {
    const blogs = [testingMaterial.initialBlogs[0]]
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(testingMaterial.initialBlogs[0])
  })

  test('of list of several blogs is the one with most lkes', () => {
    const blogs = testingMaterial.initialBlogs
    const favorite = listHelper.favoriteBlog(blogs)
    const correctAnswer = {
     title: "Canonical string reduction",
     author: "Edsger W. Dijkstra",
     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
     likes: 12
     }
    expect(favorite).toEqual(correctAnswer)
  })

  test('of empty blog list to be undefined', () => {
    const blogs = []
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(undefined)
  })
})
