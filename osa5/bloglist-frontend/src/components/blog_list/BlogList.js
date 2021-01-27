import React, { useEffect, useState} from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import blogService from '../../services/blogs'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  })

  return (
    <>
    <h2>blogs</h2>
    {blogs.map(blog => 
      <Blog key={blog.id} blog={blog} />
    )}
    <CreateBlog 
      blogs={blogs}
      setBlogs={setBlogs}
    />
    </>
  )
}

export default BlogList