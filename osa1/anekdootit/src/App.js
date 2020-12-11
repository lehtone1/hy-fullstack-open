import React, { useState } from 'react';
import PropTypes from 'prop-types';

const App = (props) => {
  const { anecdotes } = props;
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(6));
  const indexOfMostPonts = points.reduce((iMax, x, i, arr) => x>arr[iMax] ? i:iMax, 0)

  const setToSelected = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber);
  }
  const setToPoints = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button type="button" onClick={() => setToPoints()}>vote</button>
      <button type="button" onClick={() => setToSelected()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexOfMostPonts]}</p>
      <p>has {points[indexOfMostPonts]} votes</p>
    </div>
  );
};

App.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
