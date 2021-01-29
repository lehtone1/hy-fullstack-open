import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const showWhenVisible = { display: visibility? '': 'none' }
  const hideWhenVisible = { display: visibility? 'none': '' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonName}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
}

Toggleable.propTypes = {
  buttonName: PropTypes.string.isRequired
}

export default Toggleable
