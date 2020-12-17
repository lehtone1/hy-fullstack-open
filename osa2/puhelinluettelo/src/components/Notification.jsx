import React from 'react';

const Notification = ({message}) => {
  console.log(message)
  
  if(message) {
    return (
      <div className="notification">
        {message}
      </div>
    );
  }

  return null
  
};

export default Notification;