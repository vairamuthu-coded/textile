import React from 'react'
import Project1Cell from './Project1Cell'

const Project1Rows = ({item}) => {
<tr>                     
                     

                          {
                             Object.entries(item).map(([key,value])=>
                               {
                                  return (
                                              <Project1Cell key={key} cellData={value} />
                               )
                               })
                          }
                    </tr>      
}
export default Project1Rows
