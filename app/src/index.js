import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}


const Course = ({course}) => {
  const showParts = (parts) => {
    // console.log('parts', parts)
    return (
      parts.map(part => {
        return <Part key={part.id} part={part}/>
      })
    )
  }

  return (
    <div>
      <Header name={course.name}/>
      {showParts(course.parts)}
    </div>
  )
}

const Part = ({part}) => {
  // console.log('part', part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Header = ({name}) => {
  // console.log('header:', name)
  return (
    <h1>{name}</h1>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)