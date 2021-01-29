import React, { useState, useEffect } from 'react'
import BlogList from './components/blog_list/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedUser')
    if(userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Login
        user={user}
        setUser={setUser}
      />
      {
        Object.keys(user).length > 0?
          <BlogList
            user={user}
          />
          :
          <></>
      }
    </div>
  )
}

export default App