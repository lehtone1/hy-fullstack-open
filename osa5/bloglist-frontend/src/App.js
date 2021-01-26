import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    const userJson = window.localStorage.getItem('loggedUser')
    if(userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      const userJson = JSON.stringify(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', userJson)
      setUser(user)
      setUsername("")
      setPassword("")
    } 
    catch {
      console.log("Wrong username or password")
    }
    console.log(username)
    console.log(password)
  }

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

  const handleLogout = () => {
    setUser(null)
    setUsername("")
    setPassword("")
    window.localStorage.removeItem('loggedUser')
  }

  const loginForm = () => {
    return (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input 
        type="text"
        name="Username"
        value={username}
        onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input 
        type="password"
        name="Password"
        value={password}
        onChange={({target}) => setPassword(target.value)}
        />
        </div>
        <button type="submit">Login</button>
    </form>
    </>
    )
  }

  const blogList = () => {
    return (
      <>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {blogCreationForm()}
      </>
    )
  }

  const blogCreationForm = () => {
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

  return (
    <div>
      {
        user?
          blogList():
          loginForm()
      }
    </div>
  )
}

export default App