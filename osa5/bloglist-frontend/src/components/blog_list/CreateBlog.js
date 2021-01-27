import React, {useState} from 'react'
import blogService from '../../services/blogs'

const CreateBlog = ({
  blogs,
  setBlogs}) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return ( 
    <>
    <h2>Create blog</h2>
    <form onSubmit={handleCreateBlog}>
      <div>
        Title
        <input 
        type="text"
        name="Title"
        value={title}
        onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input 
        type="text"
        name="Author"
        value={author}
        onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input 
        type="text"
        name="Url"
        value={url}
        onChange={({target}) => setUrl(target.value)}
        />
      </div> 
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default CreateBlog