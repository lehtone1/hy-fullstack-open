import React, {useState} from 'react'
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
    const updatedBlog = await blogService.update(blog)
  }

  const showWhenVisible = {display: visibility? "": "none"}
  const hideWhenVisible = {display: visibility? "none": ""}

  return (
    <div style = {blogStyle}>
      <div>
        {blog.title}  {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
      </div>
      <div style={showWhenVisible}>
        {blog.likes}
        <button onClick={addLike}>Like</button>
      </div>
      <div style={showWhenVisible}>
        {blog.user.name}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
