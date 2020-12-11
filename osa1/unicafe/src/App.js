import React, { useState } from 'react'

const Button = (props) => {
      const {handleClick, text} = props

      return (
        <button onClick={handleClick}>{text}</button>
      )
}

const StatisticsLine = (props) => {
        const {text, value} = props
        
        return (
          <>
            <p>{text} {value}</p>
          </>
        )
}

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props

  if( all > 0) {
    return (
      <div>
          <h1>statistics</h1>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive + "%"} />
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

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)


  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={increaseGoodByOne} text ="good" />
        <Button handleClick={increaseNeutralByOne} text="neural" />
        <Button handleClick={increaseBadByOne} text="bad" />

      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App;
