import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../Checkbox/Checkbox";

const TableBody = (props) => {
  const { columns, employees, setEmployees, handleDelete, clickedYesButton, setClickedYesButton, clickedDelete, setClickedNoButton, clickedNoButton, confirmedDelete, setClickedDelete, employeeToDelete, setEmployeeToDelete } = props;
  const [favBrands, setFavBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        const data = await response.json();
        setFavBrands(data);
        console.log("favBrands:", favBrands);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    console.log("favBrands:", favBrands);
  }, [favBrands]);

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculatePageRange();

  const displayedEmployees = employees.slice(startIndex, endIndex);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <tbody>
      {displayedEmployees.map((employee) => (
        <tr key={employee._id}>
          {columns.map(({ accessor }) => (
            <td key={accessor}>
              {typeof accessor === "function" ? accessor(employee) : employee[accessor]}
            </td>
          ))}
          {(() => {
            const favBrand = favBrands.find((brand) =>
              brand._id === employee.favouriteBrand[0]);

            if (favBrand) {
              return <td>{favBrand.name}</td>
            } else {
              return <td>No fav yet</td>
            }
          })()}
          <td>
            <Link to={`/update/${employee._id}`}>
              <button type="button">Update</button>
            </Link>
          </td>
          {clickedDelete && employeeToDelete === employee._id ? (
            <div>
              <h5>Are you sure?</h5>
              <button onClick={() => confirmedDelete(employee._id)}>Yes</button>
              <button onClick={() => { setClickedNoButton(true); setClickedDelete(false) }}>No</button>
            </div>
          ) : (
            <td><button className={employee._id} onClick={(e) => handleDelete(employee._id)}>Delete</button></td>
          )}
          <td>
            <Link to={`/kittens/${employee._id}`}>
              <button>See kittens</button>
            </Link>
          </td>
          <td>{employee.favouriteBoardGame}</td>
          <Checkbox employee={employee} />
        </tr>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </tbody>
  );
};

export default TableBody;
