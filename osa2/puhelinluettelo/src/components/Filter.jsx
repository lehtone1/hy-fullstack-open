import React from 'react';

const Filter = ({nameFilter, setNameFlter}) => {
  const handleFilterChange = (event) => {
    setNameFlter(event.target.value);
  };

  return (
    <p>flter shown with<input value={nameFilter} onChange={handleFilterChange}/></p>
  )
  
}

export default Filter;