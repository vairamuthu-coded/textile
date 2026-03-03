import React, { useMemo } from 'react'

const SortingDetails = (grid,setTotalItems,sorting) => {
        setTotalItems(grid.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            grid = grid.sort((a, b) =>
                reversed * a[sorting.field].localeCompare(b[sorting.field]))
        }       
}

export default SortingDetails
