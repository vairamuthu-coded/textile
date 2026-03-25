import React, { useContext, useState } from 'react'
import TableColumn from './TableColumn'
import DataContext from '../context/CreateUserContext';
const DataTableHeader = ({ headers, onSorting, setCheckAll, checkall, foreValue,colorValue }) => {useContext(DataContext);
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState("asc");
  const onSortingChange = (field) => {
    const isAsc = field === sortingField && sortingOrder === "asc";
    const order = isAsc ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead style={{ backgroundColor: colorValue }}>
      <tr>
        {headers?.map(({ headername, field, sortable }) => (            
          <TableColumn  key={field} foreValue={foreValue} setCheckAll={setCheckAll}  name={headername} sortable={sortable}     field={field}  sortingField={sortingField} 
           sortingOrder={sortingOrder}       onSortingChange={onSortingChange}   />
        ))}
      </tr>
    </thead>
  );
};


export default DataTableHeader
