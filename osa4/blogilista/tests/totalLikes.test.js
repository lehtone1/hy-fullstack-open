const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

describe('totalLikes', () => {
  test('of 1 post is the likes of the post', () => {
    const blog = Blog({
      "title": "My mind",
      "author": "Eero Lehtonen",
      "url": "unknown",
      "likes": 3
    })
    const blogList = [blog]
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(3)
  
  })
  
  test('of several posts is the sum of likes', () => {
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
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(10)
  
  })
  
  test('of 0 posts is 0', () => {
    const blogList = []
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(0)
  
  })
})

