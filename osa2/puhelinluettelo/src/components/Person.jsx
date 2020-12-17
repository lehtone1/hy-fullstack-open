import React from 'react';

const Person = ({person}) => {
  const {name, number} = person;
  return (
    <p>{name} {number}</p>
  ) 
}

export default Person;
