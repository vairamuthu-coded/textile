import React from 'react';

const SearchItem = ({search, setSearch,colorValue}) => {
  return (

<form className="searchForm" onSubmit={(e)=>e.preventDefault()} >
      <div style={{margin:"10px"}}></div>
      <div className='container-fluid'>
            <div className='row' style={{borderBottom:`1px solid ${colorValue}`,padding:"10px"}} >
                <h3 className='col-md-1'  >Search</h3>
                <input  type='text' id="SearchItem" placeholder='Search Items' aria-label='SearchItem' 
                style={{padding:"10px"}}value={search} className='col-md-10' onChange={(e)=>setSearch(e.target.value.toUpperCase())}/>   
            </div>
      </div>
</form>
  );
}

export default SearchItem;
