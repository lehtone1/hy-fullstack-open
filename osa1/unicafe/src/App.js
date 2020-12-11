import React, { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props

  if( all > 0) {
    return (
      <div>
          <h1>statistics</h1>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average}</p>
          <p>positive {positive} %</p>
        </div>
    )  
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad)/all
  const positive = good/all * 100


  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App;
