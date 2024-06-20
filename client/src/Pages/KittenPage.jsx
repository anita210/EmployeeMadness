import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export function KittenPage() {
    const params = useParams();
    const [employee, setEmployee] = useState({});
    const [kitten, setKitten] = useState({ name: '', weight: 0, employee: params.employeeId })
    const [allKittens, setAllKittens] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/employees/${params.employeeId}`)
                const data = await response.json();
                setEmployee(data);
            }
            catch (error) {
                console.error(error);
            }           
        }
        const fetchKittens = async () => {
            try {
                const response = await fetch(`/api/kittens`)
                const data = await response.json();
                setAllKittens(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();          
        fetchKittens();

    }, [params.employeeId])



    const handleInput = (e) => {
        const { name, value } = e.target;
        setKitten((prevKitten) => ({
            ...prevKitten, [name]: value,
        }))
    };
    
    const addKitten = async () => {
        try {
            setKitten(prevKitten => ({ ...prevKitten, employee: params.employeeId }));
    
            const response = await fetch(`/api/kittens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ kitten, employee }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const newKitten = await response.json();
    
            setEmployee(prevEmp => ({
                ...prevEmp,
                kittens: prevEmp.kittens ? [...prevEmp.kittens, newKitten._id] : [newKitten._id],
            }));
    
            setKitten({ name: "", weight: 0, employee: params.employeeId });
        } catch (error) {
            console.error(error);
        }
    };

    return (<div>

        <label> Kitten name<input type="text" name="name" value={kitten.name} onChange={handleInput}></input></label>
        <label> Kitten weight<input type="text" name="weight" value={kitten.weight} onChange={handleInput}></input></label>
        <button onClick={addKitten}>Add new kitten</button>
        <table>
            <thead>
                {employee.kittens && employee.kittens.length > 0 && (
                    <tr>
                        <th>Name</th>
                        <th>Weight</th>
                    </tr>
                )}
            </thead>
            <tbody>
                {!employee.kittens || employee.kittens.length === 0 ? (
                    <tr>
                        <td >No kittens yet</td>
                    </tr>
                ) : (
                    employee.kittens.map((kittenId) => {
                        const kitten = allKittens.find((kit) => kit._id === kittenId)
                        if (!kitten) {
                            return null
                        }
                        return <tr>
                            <td>{kitten.name}</td>
                            <td>{kitten.weight}</td>
                        </tr>
                    })
                )}

            </tbody>
        </table>
    </div >)
}

