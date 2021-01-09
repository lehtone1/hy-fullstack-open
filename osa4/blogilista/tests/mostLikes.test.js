const listHelper = require("../utils/list_helper")
const testingMaterial = require('./testing_material')

describe('favoriteBlog', () => {
  test('of list of 1 blog is the blog', () => {
    const blogs = testingMaterial.blogs1
    const mostBlogs = listHelper.mostLikes(blogs)
    const correctAnswer = {
      author: "Michael Chan",
      likes: 7
    }
    expect(mostBlogs).toEqual(correctAnswer)
  })

  test('of list of several blogs is the one with most lkes', () => {
    const blogs = testingMaterial.blogs2
    const mostBlogs = listHelper.mostLikes(blogs)
    const correctAnswer = {
      author: "Edsger W. Dijkstra",
      likes: 17
     }
    expect(mostBlogs).toEqual(correctAnswer)
  })

  test('of empty blog list is undefined', () => {
    const blogs = testingMaterial.blogs3
    const mostBlogs = listHelper.mostLikes(blogs)
    expect(mostBlogs).toEqual(undefined)
  })
})
