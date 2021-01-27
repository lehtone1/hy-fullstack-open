import React, { useState, useEffect } from 'react'
import BlogList from './components/blog_list/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)

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
        user?
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