import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const AnecdoteWithMostVotes = ({anecdote}) => {
  return (
    <div>
      <p>{anecdote.story}</p>
      <p>has {anecdote.vote} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anecdoteNumber, setAnecdoteNumber] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * 6);
    setSelected(random)
    setAnecdoteNumber(random)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[anecdoteNumber] += 1
    setVotes(newVotes)
  }

  const searchAnecdoteWithMostVotes = (anecdotes) => {
    const maxVote = Math.max(...votes)
    const maxVoteElement = votes.indexOf(maxVote)
    return {story: anecdotes[maxVoteElement], vote: maxVote}
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' onClick={handleVote}/>
      <Button text='next anecdote' onClick={handleNextAnecdote}/>
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithMostVotes anecdote={searchAnecdoteWithMostVotes(props.anecdotes)}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)