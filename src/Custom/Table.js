import React from 'react'
import TableRow from '../Custom/TableRow'
import DataTableHeader from './DataTableHeader'

const Table = ({FilterSearch,EditData,columns,heights,onSorting,setCheckAll,checkchild,
  setCheckchild,checkall,mode,foreValue}) => {    

  return (
    <div className='container-fluid'  style={{height:`${heights}`,overflow:"auto"}}>
    <table className='table table-responsive table-striped table-hover' data-bs-theme={mode}>
      <DataTableHeader headers={columns} foreValue={foreValue}  setCheckAll={setCheckAll} checkall={checkall} onSorting={onSorting}  />     
    <tbody>    
        {        
            FilterSearch.map((item,index)=>(                
              <TableRow key={index} index={index} checkchild={checkchild} setCheckchild={setCheckchild} checkall={checkall}   columns={columns} item={item} EditData={EditData}  ></TableRow>   
            ))
        }
    </tbody>
</table>
</div>
  )
}
export default Table 