import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
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

  const noteForm = () => {
    return (
      <>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    )
  }

  return (
    <div>
      {
        user?
          noteForm():
          loginForm()
      }
    </div>
  )
}

export default App