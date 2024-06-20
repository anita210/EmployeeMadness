import { useEffect, useState } from "react"

const EquipmentUpdater = () => {

    const [equipment, setEquipment] = useState({
        name: "",
        type: "",
        amount: 0,
        id: ""
    })

    const [allEquipment, setAllEquipment] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`/api/equipments`)
            const equipments = await resp.json();
            setAllEquipment(equipments)
        }
        fetchData();


    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipment((prevEquipment) => ({
            ...prevEquipment, [name]: value,
        }))
    };

    const handleEdit = (index) => {
        setEquipment(allEquipment[index]);
        setEditMode(true);
        setEditIndex(index);
    }

    const handleSave = async () => {
        if (editMode) {

            await fetch(`/api/equipments/${equipment._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(equipment),
            });
            setEditMode(false);
        } else {
            console.log(equipment)

            await fetch('/api/equipments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(equipment),
            });
            setAllEquipment((prevEquipment) => [...prevEquipment, equipment]);
        }
    }

    const handleDelete = async (index) => {
        try {

            await fetch(`/api/equipments/${allEquipment[index]._id}`, {
                method: 'DELETE',
            });



            const updatedList = allEquipment.filter((_, i) => i !== index);
            setAllEquipment(updatedList);
        } catch (error) {
            console.error('Error deleting equipment:', error);
        }
    };

    const handleClear = () => {
        setEquipment({ name: '', type: '', amount: 0, id: '' })

    }


    return (
      
        <div>
            <h2>Edit Equipment</h2>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={equipment.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={equipment.type}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={equipment.amount}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="button" onClick={handleSave}>
                    {editMode ? 'Update' : 'Add'}
                </button>
                <button onClick={handleClear}>Clear All</button>
            </form>

            <h2>Equipment List</h2>
            <ul>
                {allEquipment.map((item, index) =>
                    <li key={item.id}>
                        <p>Name: {item.name}</p>
                        <p>Type: {item.type}</p>
                        <p>Amount: {item.amount}</p>
                        <button type="button" onClick={() => handleEdit(index)}>Edit</button>
                        <button type="button" onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default EquipmentUpdater;