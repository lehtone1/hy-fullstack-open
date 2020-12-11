import React, { useState } from 'react';
import PropTypes from 'prop-types';

const App = (props) => {
  const { anecdotes } = props;
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(6));
  const randomNumber = Math.floor(Math.random() * 6);

  const setToSelected = () => setSelected(randomNumber);
  const setToPoints = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button type="button" onClick={() => setToPoints()}>vote</button>
      <button type="button" onClick={() => setToSelected()}>next anecdote</button>
    </div>
  );
};

App.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
