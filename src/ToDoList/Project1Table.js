import React from 'react'
import Project1Rows from './Project1Rows'

const Project1Table = ({items}) => {
  return (
    <table className='table table-responsive'>
    <tbody>
        {
            items.map(item=>(
               <Project1Rows key={item.id} item={item} />
                   
               
            ))
        }
    </tbody>
</table>
  )
}

export default Project1Table
