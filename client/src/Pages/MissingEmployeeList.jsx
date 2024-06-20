import React, { useEffect, useState } from "react";
import { EmployeeProvider, useEmployeeContext } from "../context/EmployeeContext";
import { Link } from "react-router-dom";

const MissingEmployeeList = () => {
  const { employees, setEmployees } = useEmployeeContext();
  const [missingEmployees, setMissingEmployees] = useState([employees]);
  console.log("empls at missing list", employees)

  useEffect(() => {
    const filteredMissingEmployees = employees.filter(
      (employee) => employee.present === false || employee.present === undefined
    );
    console.log("employees:" + employees)
    console.log("filtered:" + filteredMissingEmployees)
    setMissingEmployees(filteredMissingEmployees);
  }, [employees]);

  return (
      <div>
        <h2>Missing Employees</h2>
        <Link to="/">
          <button>Back</button>
        </Link>
        {missingEmployees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {missingEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No missing employees</p>
        )}
      </div>   
  );
};

export default MissingEmployeeList;