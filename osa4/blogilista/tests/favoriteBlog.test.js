const listHelper = require("../utils/list_helper")
const Blog = require('../models/blog')

describe('favoriteBlog', () => {
  test('of list of 1 blog is the blog', () => {
    const blog = Blog({
      "title": "My mind",
      "author": "Eero Lehtonen",
      "url": "unknown",
      "likes": 3
    })
    const blogs = [blog]
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(blog)
  })

  test('of list of several blogs is the one with most lkes', () => {
    const blog1 = Blog({
      "title": "My mind",
      "author": "Eero Lehtonen",
      "url": "unknown",
      "likes": 3
    })
    const blog2 = Blog({
      "title": "My mind",
      "author": "Eero Lehtonen",
      "url": "unknown",
      "likes": 6
    })
    const blog3 = Blog({
      "title": "My mind",
      "author": "Eero Lehtonen",
      "url": "unknown",
      "likes": 1
    })
    const blogList = [blog1 ,blog2, blog3]
    const favorite = listHelper.favoriteBlog(blogList)
    expect(favorite).toEqual(blog2)
  })

  test('of empty blog list to be null', () => {
    const blogList = []
    const favorite = listHelper.favoriteBlog(blogList)
    expect(favorite).toEqual({})
  
  })
})
