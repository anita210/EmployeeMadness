import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import EmployeeTable from "../Components/EmployeeTable";


export function ExperiencePage() {

    const params = useParams();
    const [experiencedEmployees, setExperiencedEmployees] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/employees/${params.years}`)
                const data = await response.json();
                console.log("expdata:",data);
                console.log(params.years)
                setExperiencedEmployees(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
        console.log("expemplos:", experiencedEmployees);
    }

        , [])

    return   (<div>
        {experiencedEmployees.length > 0 && Array.isArray(experiencedEmployees)?
        (<EmployeeTable employees={experiencedEmployees} setEmployees={setExperiencedEmployees} />) :
        (<h2>No employee found with this name</h2>)}
        </div>
    );
};