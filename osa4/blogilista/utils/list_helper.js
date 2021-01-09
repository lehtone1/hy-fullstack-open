const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) {
    return undefined
  } else {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    const result = blogs.reduce(reducer, 0)
    return result
  }
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return undefined
  } else {
    const reducer = (favorite, item) => {
      return item.likes > favorite.likes || favorite.likes === undefined? item: favorite
    }
    const result = blogs.reduce(reducer, {})
    return result
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return undefined
  } else {
    const reducer = (result, item) => {
      const a = item.author
      if(result[a]) {
        result[a] += 1
        return result
      } else {
        result[a] = 1
        return result
      }
    }
    const authorBlogs = blogs.reduce(reducer, {})
  
    const reducer2 = (topAuthor, author) => authorBlogs[author] > authorBlogs[topAuthor]? author: topAuthor
    
    const topAuthor = Object.keys(authorBlogs).reduce(reducer2)
  
    const result = {
      "author": topAuthor,
      "blogs": authorBlogs[topAuthor]
    }
    return result
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return undefined
  } else {
    const reducer = (result, item) => {
      const a = item.author
      const l = item.likes
      if(result[a]) {
        result[a] += l
        return result
      } else {
        result[a] = l
        return result
      }
    }
    const authorLikes = blogs.reduce(reducer, {})
  
    const reducer2 = (topAuthor, author) => authorLikes[author] > authorLikes[topAuthor]? author: topAuthor
    
    const topAuthor = Object.keys(authorLikes).reduce(reducer2)
  
    const result = {
      "author": topAuthor,
      "likes": authorLikes[topAuthor]
    }
    return result
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}