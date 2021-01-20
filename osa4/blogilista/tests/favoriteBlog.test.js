const listHelper = require("../utils/list_helper")
const helper = require('./test_helper')

describe('favoriteBlog', () => {
  test('of list of 1 blog is the blog', () => {
    const blogs = [helper.initialBlogs[0]]
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(helper.initialBlogs[0])
  })

  test('of list of several blogs is the one with most lkes', () => {
    const blogs = helper.initialBlogs
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
