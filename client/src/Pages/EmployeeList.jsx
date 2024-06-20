import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useEmployeeContext, EmployeeProvider } from "../context/EmployeeContext";



const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .catch((error) => console.error(error));
};

const EmployeeList = () => {
  const [clickedState, setClickedState] = useState(true);
  const { employees, setEmployees } = useEmployeeContext();
  const [clickedDelete, setClickedDelete] = useState(false)
  const [clickedYesButton, setClickedYesButton] = useState(false);
  const [clickedNoButton, setClickedNoButton] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  
  console.log(employees)


  const handleDelete = (id) => {
    setClickedDelete(true)
    setClickedNoButton(false)
    setEmployeeToDelete(id)
  };

  const confirmedDelete = (id) => {
    deleteEmployee(id);
    setClickedYesButton(false);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  }



  return <EmployeeTable
    employees={employees}
    setEmployees={setEmployees}
    handleDelete={handleDelete}
    clickedNoButton={clickedNoButton}
    setClickedNoButton={setClickedNoButton}
    clickedYesButton={clickedYesButton}
    setClickedYesButton={setClickedYesButton}
    confirmedDelete={confirmedDelete}
    clickedDelete={clickedDelete}
    setClickedDelete={setClickedDelete}
    employeeToDelete={employeeToDelete}
    setEmployeeToDelete={setEmployeeToDelete}
     />;
};

export default EmployeeList;
