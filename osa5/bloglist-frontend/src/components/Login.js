import React, {useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({
  user,
  setUser}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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

  const handleLogout = () => {
    setUser(null)
    setUsername("")
    setPassword("")
    window.localStorage.removeItem('loggedUser')
  }

  return (
  <>
  {
    user?
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>:
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
  }
  </>
  )
}

export default Login