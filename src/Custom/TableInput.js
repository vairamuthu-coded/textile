import React, { useState } from 'react'
import TableColumn from '../Custom/TableColumn'
import DataTableHeader from './DataTableHeader'
import TableRowInput from './TableRowInput'
import TableRow from './TableRow'

const TableInput = ({comments, FilterSearch, EditData, columns, heights, colorValue, onSorting, setCheckAll,
    setCheckchild,usernull,setUserNull,editValueChange}) => {
    return (

        <div className='container-fluid' style={{ height: `${heights}`, overflow: "auto" }}>
            <table className='table table-responsive table-striped' >
                <DataTableHeader headers={columns} comments={comments} setCheckAll={setCheckAll} onSorting={onSorting} colorValue={colorValue} />
                 <tbody>    {                       
                    FilterSearch.map((item,index)=>(                
                      <TableRowInput key={index} index={index} usernull={usernull}  editValueChange={editValueChange}  setUserNull={setUserNull}  setCheckchild={setCheckchild}  columns={columns} item={item} EditData={EditData}  ></TableRowInput>   
                    ))
                
                } 
                </tbody>
            </table>
        </div>

    )
}

export default TableInput



