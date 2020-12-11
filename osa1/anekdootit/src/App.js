import React, { useState } from 'react';
import PropTypes from 'prop-types';

const App = (props) => {
  const { anecdotes } = props;
  const [selected, setSelected] = useState(0);

  const randomSelect = () => {
    const randomNumber = Math.floor(Math.random() * 6);

    return (
      setSelected(randomNumber)
    );
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button type="button" onClick={() => randomSelect()}>next anecdote</button>
    </div>
  );
};

App.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
