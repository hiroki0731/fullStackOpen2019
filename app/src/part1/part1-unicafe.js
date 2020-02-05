import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={(good - bad) / all}/>
        <Statistic text="positive" value={(good / all).toFixed(2) + "%"}/>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>
        <p>{text}</p>
      </td>
      <td>
        <p>{value}</p>
      </td>
    </tr>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
)
