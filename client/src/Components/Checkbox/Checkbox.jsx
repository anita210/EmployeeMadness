import React from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
const Checkbox = ({ employee }) => {
  const { employees, setEmployees } = useEmployeeContext();

  const handleCheckBox = (e) => {
    const checkedId = e.target.value;
    console.log("id: " + checkedId);
  
    const updatedEmployees = employees.map((person) => {
      if (person._id === checkedId) {
        return { ...person, present: !person.present };
      } else {
        return person;
      }
    });
  
    console.log("updated employees",updatedEmployees);
    setEmployees(updatedEmployees);
  };

  return <td><input type="checkbox" value={employee._id} checked={employee.present} onChange={(e) => handleCheckBox(e)} /></td>;
};

export default Checkbox;

