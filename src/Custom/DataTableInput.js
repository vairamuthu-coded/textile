import React, { useState } from 'react'
import PaginationComponent from '../Custom/PaginationComponent';
import Table from '../Custom/Table';
import Search from '../Custom/Search';
import TableInput from './TableInput';

const DataTableInput = ({heights,colorValue,headers,comments,setComments,searches,setSearches,
  totalItems,setTotalItems ,currentPage,setCurrentPage,sorting,setSorting,ITEM_PER_PAGE,
  EditData,commentsData,setCheckAll,setCheckchild,SearchLable1,SearchLable2,SearchLable3,usernull,setUserNull, 
  handleChange 
}) => {
  const editValueChange=(e)=>{setUserNull(e.target.value);alert(e.target.value)}
  return (    <>


{ITEM_PER_PAGE>0 && comments.length>0  &&

    <div className='container-fluid animate-zoom' >
           <Search colorValue={colorValue} searchs={searches} setsearchs={setSearches} 
           SearchLable1={SearchLable1} SearchLable2={SearchLable2} SearchLable3={SearchLable3}/>   
      <div className='row'>       
  
      <TableInput   usernull={usernull} setUserNull={setUserNull}  editValueChange={editValueChange} heights={heights} setCheckchild={setCheckchild} comments={comments}  setCheckAll={setCheckAll} onSorting={(field,order)=>setSorting({field,order})} colorValue={colorValue} FilterSearch={commentsData} EditData={EditData} columns={headers} />
  </div>
  <footer>
        <PaginationComponent total={totalItems} itemsPerPage={ITEM_PER_PAGE}    currentPage={currentPage} onPageChange={page=> setCurrentPage(page)} /> 
      </footer>
    </div>
   
} 

    </>
  )
}
export default DataTableInput
