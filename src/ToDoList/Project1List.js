import React from 'react'
import Project1ListItem from './Project1ListItem'
const Project1List = ({items}) => {
  return (
    <ul>
        {items.map(item=>(
        <Project1ListItem key={item.id} item={item} />       
        ))}
    </ul>
  )
}

export default Project1List