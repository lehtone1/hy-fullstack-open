import React from 'react';

const Filter = ({nameFilter, setNameFlter}) => {
  const handleFilterChange = (event) => {
    setNameFlter(event.target.value);
  };

  return (
    <input value={nameFilter} onChange={handleFilterChange}/>
  )
  
}

export default Filter;