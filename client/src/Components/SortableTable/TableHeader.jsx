import React from "react";
import { useState } from "react";

const TableHead = ({ columns, handleSorting }) => {

    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessorforsorting, accessor, e) => {
        const sortOrder = accessorforsorting === sortField && order === "asc" ? "desc":"asc";
        setSortField(accessorforsorting);
        setOrder(sortOrder);
        handleSorting(accessorforsorting, sortOrder, e);
    };

    return <thead>
        <tr>
            {columns.map(({ label, accessor, accessorforsorting }) => {
                return <th key={accessor} className={label} onClick={(e) => handleSortingChange(accessorforsorting, accessor, e)}>{label}
                </th>
            })}
            <th>Favourite Brand</th>
            <th>Modify</th>
            <th>Delete</th>
            <th>Kittens</th>
            <th>Max players of fav game</th>
            <th>Check presence</th>
        </tr>
        
    </thead>
}
export default TableHead;