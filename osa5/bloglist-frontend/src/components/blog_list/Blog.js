import React, {useState} from 'react'


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
      </div>
      <div style={showWhenVisible}>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
