import { set } from "mongoose";
import { useState, useEffect } from "react"
import EmployeeTable from "../Components/EmployeeTable";


export function TopPaidPage() {

    const [topPaidEmployees, setTopPaidEmployees] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/employees/top-paid");
                const data = await response.json();
                setTopPaidEmployees(data);

            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div>
      
        <EmployeeTable employees={topPaidEmployees} setEmployees={setTopPaidEmployees} />
        
        </div>
    )
}