import { useEffect, useState } from "react"

export function PositionsPage() {
    const [positions, setPositions] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/positions`)
                const data = await response.json();
                setPositions(data);
                console.log(data)
                console.log(positions)
            }
            catch (error) {
                console.error(error);

            }
        }
        fetchData();
    
    
    }, [])

    return (
        <table>
        <thead>
            <tr>
                <th>Position Name</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            {positions.map((position) => {
                return <tr>
                    <td>{position.name}</td>
                    <td>{position.salary}</td> </tr>
            })}

        </tbody>
    </table>
    )
}