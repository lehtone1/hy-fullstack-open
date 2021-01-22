const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = request => {
  const aut = request.get('authorization')
  if(aut && aut.toLowerCase().startsWith('bearer')) {
    return aut.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  if (body.title === undefined || body.author === undefined) {
    return response.status(400).json({
      error: 'Content missing'
    })
  }
  
  if (body.likes === undefined) {
    body.likes = 0
  } 

  body.user = decodedToken.id

  const blog = new Blog(body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  Blog.findByIdAndRemove(id).then(
    response.status(203).end()
  )
})

blogRouter.put('/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(id, blog, {new: true})
    .then(updatedBlog => {
      response.status(200).json(updatedBlog)
    })

})


module.exports = blogRouter