const listHelper = require("../utils/list_helper")
const Blog = require('../models/blog')
const testingMaterial = require('./testing_material')

describe('favoriteBlog', () => {
  test('of list of 1 blog is the blog', () => {
    const blogs = testingMaterial.blogs1
    const favorite = listHelper.favoriteBlog(blogs)
    const correctAnswer = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0 
    }
    expect(favorite).toEqual(correctAnswer)
  })

  test('of list of several blogs is the one with most lkes', () => {
    const blogs = testingMaterial.blogs2
    const favorite = listHelper.favoriteBlog(blogs)
    const correctAnswer = {
      _id: "5a422b3a1b54a676234d17f9",
     title: "Canonical string reduction",
     author: "Edsger W. Dijkstra",
     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
     likes: 12,
      __v: 0 
     }
    expect(favorite).toEqual(correctAnswer)
  })

  test('of empty blog list to be undefined', () => {
    const blogs = testingMaterial.blogs3
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(undefined)
  })
})
