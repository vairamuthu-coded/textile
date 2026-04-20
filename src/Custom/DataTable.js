import React, { useState } from "react";

import PaginationComponent from "../Custom/PaginationComponent";
import Table from "../Custom/Table";
import Search from "../Custom/Search";

const DataTable = ({
  heights,
  colorValue,
  headers,
  comments,
  setComments,
  searches,
  setSearches,
  totalItems,
  setTotalItems,
  currentPage,
  setCurrentPage,
  sorting,
  setSorting,
  ITEM_PER_PAGE,
  handleChange,
  EditData,
  commentsData,
  setCheckAll,
  checkchild,
  checkall,
  setCheckchild,
  mode,
  foreValue,
}) => {
  return (
    <>
      {ITEM_PER_PAGE > 0 && comments.length > 0 && (
        <div className="container-fluid">
          <div className="row">
            <Table
              mode={mode}
              foreValue={foreValue}
              heights={heights}
              setCheckchild={setCheckchild}
              checkchild={checkchild}
              checkall={checkall}
              setCheckAll={setCheckAll}
              onSorting={(field, order) => setSorting({ field, order })}
              colorValue={colorValue}
              FilterSearch={commentsData}
              EditData={EditData}
              columns={headers}
            />
          </div>
          <PaginationComponent total={totalItems} itemsPerPage={ITEM_PER_PAGE} colorValue={colorValue} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
        </div>
      )}
    </>
  );
};

export default DataTable;
