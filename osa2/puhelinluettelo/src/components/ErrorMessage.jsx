import React from 'react';

const ErrorMessage = ({errorMessage}) => {

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    );
  }

  return null;
  
};

export default ErrorMessage;