const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  const result = blogs.reduce(reducer, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return item.likes > favorite.likes || favorite.likes === undefined? item: favorite
  }
  const result = blogs.reduce(reducer, {})
  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}