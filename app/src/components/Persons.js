import React from "react";

const Persons = ({person, handleDeletePerson}) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => handleDeletePerson(person.id, person.name)}>Delete</button>
    </div>
  )
}

export default Persons