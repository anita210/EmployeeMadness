import React, { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";

const Searchbar = () => {
    const { employees, setEmployees } = useEmployeeContext();
    const [allEmployees, setAllEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    //const [haveResults, setHaveResults] = useState(null);
    const [searchedEmployees, setSearchedEmployees] = useState([]);


    const searchEmployees = (value) => {

        const searchResults = employees.filter((employee) => {
            return value && employee.position.toLowerCase().includes(value) || employee.level.toLowerCase().includes(value);
        });

        return searchResults;
    };

    const handleSearch = (value) => {

        setSearchInput(value);

        if (!allEmployees.length) {
            setAllEmployees(employees);
        }

        if (value && employees.length !== 0) {
            setEmployees(searchEmployees(value));
            setSearchedEmployees(employees);
        }
        else if (value && employees.length === 0) {
            setEmployees(searchedEmployees);
        }
        else {
            setEmployees(allEmployees);
            value = "Search"
        }

    };

    return (
        <div>
            <input
                placeholder="Search"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};

export default Searchbar;