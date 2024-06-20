import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeContext, EmployeeProvider } from "../context/EmployeeContext";
import EmployeeTable from "../Components/EmployeeTable";

const EmployeesByName = () => {
    const { employees, setEmployees } = useEmployeeContext();
    const params = useParams();
    const [namedEmps, setNamedEmps]= useState([]);

    const fetchEmployeesByNames = async () => {
        const response = await fetch(`/api/employees/search/${params.search}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchEmployeesByNames();
            setNamedEmps(data);
        };

        fetchData();
    }, []);

    return (<div>
        {namedEmps.length > 0 && Array.isArray(namedEmps)?
        (<EmployeeTable employees={namedEmps} setEmployees={setNamedEmps} />) :
        (<h2>No employee found with this name</h2>)}
        </div>
    );
};

export default EmployeesByName;