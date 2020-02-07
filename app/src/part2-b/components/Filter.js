import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
      <p>filter shown with</p>
      <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter