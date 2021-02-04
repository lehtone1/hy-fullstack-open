import React, { useState } from 'react'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const addLike = async () => {
    blog.likes += 1
    await blogService.update(blog)
  }
  const buttonText = visibility? 'Hide': 'View'

  return (
    <div style = {blogStyle}>
      <div>
        {blog.title}  {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      {
        visibility?
          <>
            <div>
              {blog.url}
            </div>
            <div>
              {blog.likes}
              <button onClick={addLike}>Like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
          </>:
          <>
          </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
