import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import  Pagination from 'react-bootstrap/Pagination';
const PaginationComponent = ({  total = 0,  itemsPerPage,  currentPage,  onPageChange,  colorValue}) => {

  const totalPages = Math.ceil(total / itemsPerPage);

  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) 
      {
         pages.push(
        <Pagination.Item    key={i}  active={i === currentPage}  onClick={() => onPageChange(i)}  >
            {i} </Pagination.Item>  );
    }
    return pages;
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages === 0) return null;

  return (
    <footer className="row" style={{backgroundColor: colorValue}}>
      <Pagination style={{ width: "100%", overflow: "auto" }}>        
        <Pagination.Prev     onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}   disabled={currentPage === 1} />
        {paginationItems}
        <Pagination.Next  onClick={() =>  currentPage < totalPages && onPageChange(currentPage + 1)   } disabled={currentPage === totalPages}   />
      </Pagination>
    </footer>
  );
};
// const PaginationComponent = ({total=0,itemsPerPage,currentPage,onPageChange,colorValue}) => {
//      const [totalPages,setTotalPages]=useState(0);

//      useEffect(()=>{
//         if(total>0 && itemsPerPage>0){
//             setTotalPages(Math.ceil(total/itemsPerPage));
           
//         }
//      },[total,itemsPerPage]);

//      const pagenationItems=useMemo(()=>{
//         const pages=[];
//         for(let i=1;i<totalPages;i++)
//         {
         
//          pages.push(
//           <Pagination.Item 
//             key={i} 
//             active={i===currentPage} 
//             onClick={()=>onPageChange(i)} >{i}
//             </Pagination.Item>
//           )
//         }
//         return pages;
//      },[totalPages,currentPage])
    
// if(totalPages===0) return null;
//   return (
// <footer className='row' style={{backgroundColor:`${colorValue}`}}>
//     <Pagination  style={{margin:"0",padding:"0",overflow:"auto",overflowClipBox:'inherit', width:'100%' }} > 
//       <Pagination.Prev onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1}   />     
//       <span>.</span>
//        {pagenationItems}    
//     <span>.</span>
//       <Pagination.Next onClick={()=>onPageChange(currentPage+1)} disabled={currentPage===totalPages} />
//     </Pagination>
//     </footer>
//   );
// };

export default PaginationComponent
