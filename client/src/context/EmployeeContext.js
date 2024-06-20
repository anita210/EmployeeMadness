import React, { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext({
  employees: [],
  setEmployees: () => {},
  fetchEmployees: () => {},
});

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
      
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    console.log("from employeecontext",employees);
  }, []);

  const value = { employees, setEmployees, fetchEmployees };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};