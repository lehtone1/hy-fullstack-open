const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('totalLikes', () => {
  test('of 1 post is the likes of the post', () => {
    const blogs = [helper.initialBlogs[0]]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  
  })
  
  test('of several posts is the sum of likes', () => {
    const blogs = helper.initialBlogs
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  
  })
  
  test('of 0 posts is 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(undefined)
  
  })
})

