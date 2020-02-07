import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({courses}) => {

  const showCourses = () => {
    return (
      courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name}/>
            {showParts(course.parts)}
            <h2>total of {calculateTotal(course.parts)} exercises</h2>
          </div>
        )
      })
    )
  }

  const showParts = (parts) => {
    return (
      parts.map(part => {
        return <Part key={part.id} part={part}/>
      })
    )
  }

  const calculateTotal = (parts) => {
    let total = parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
    return total
  }

  return (
    <div>
      {showCourses()}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

export default Course