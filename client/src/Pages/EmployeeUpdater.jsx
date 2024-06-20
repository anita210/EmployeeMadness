import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const fetchEmployee = (id) => {
  console.log(id)
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};



const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  const [allEquipment, setAllEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const [allBrand, setAllBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const [boardGames, setBoardGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');

  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');

  const updateEmployee = (employee) => {
    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };


  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      });

  }, [id]);


  const fetchData = async () => {
    try {
      // Fetch equipment
      let resp = await fetch(`/api/equipments`);
      if (!resp.ok) {
        throw new Error(`Failed to fetch equipment: ${resp.status}`);
      }
      const equipments = await resp.json();
      setAllEquipment(equipments);
      equipments.forEach((equipment, index) => {
        console.log(`Equipment ${index + 1}:`, equipment);
      });

      // Fetch brands
      resp = await fetch(`/api/brands`);
      if (!resp.ok) {
        throw new Error(`Failed to fetch brand: ${resp.status}`);
      }
      const brands = await resp.json();
      setAllBrand(brands);
      brands.forEach((brand, index) => {
        console.log(`Brand ${index + 1}:`, brand);
      });

      // Fetch board games
      resp = await fetch(`/api/boardgames`);
      if (!resp.ok) {
        throw new Error(`Failed to fetch games: ${resp.status}`);
      }
      const games = await resp.json();
      setBoardGames(games);

      // Fetch Posis
      resp = await fetch(`/api/positions`);
      if (!resp.ok) {
        throw new Error(`Failed to fetch posis: ${resp.status}`);
      }
      const posis = await resp.json();
      console.log("pos",posis)
      setPositions(posis);

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };
  useEffect(() => {

    fetchData();
  }, []);



  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);

    const updatedEmployee = {
      ...employee,
      ...(selectedEquipment && { assignedEquipment: selectedEquipment }),
      ...(selectedBrand && { favouriteBrand: selectedBrand }),
      ...(selectedGame && { favouriteBoardGame: selectedGame }),
      ...(selectedPosition && { position: selectedPosition })
    };


    updateEmployee(updatedEmployee)
      .then(() => {

        setUpdateLoading(false);
        navigate("/");
      });
  };

  const handleEquipmentChange = (event) => {
    const selectedEquipmentObject = allEquipment.find(
      (equipment) => equipment.name === event.target.value
    );
    setSelectedEquipment(selectedEquipmentObject._id);
    console.log("selected equipment" + selectedEquipmentObject)
  };

  if (employeeLoading) {
    return <Loading />;
  }
  const handleBrandChange = (event) => {
    const selectedBrandObject = allBrand.find(
      (brand) => brand.name === event.target.value
    );
    setSelectedBrand(selectedBrandObject._id);
    console.log("selected brand" + selectedBrandObject)
  };

  const handlePositionChange = (event) => {
    const selectedPosObject = positions.find(
      (posi) => posi.name === event.target.value
    );
    setSelectedPosition(selectedPosObject.name);
  };

  if (employeeLoading) {
    return <Loading />;
  }
  const handleGameChange = (event) => {
    const selectedGameObject = boardGames.find(
      (brand) => brand.name === event.target.value
    );
    setSelectedGame(selectedGameObject.maxPlayers);
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <div>
      <EmployeeForm
        employee={employee}
        onSave={handleUpdateEmployee}
        disabled={updateLoading}
        onCancel={() => navigate('/')}
      />
      <label>
        <h2> Assign Equipment:</h2>
        <select value={selectedEquipment ? selectedEquipment.name : ''} onChange={handleEquipmentChange} style={{ height: '40px' }}>
          <option value="" disabled>
            Select Equipment
          </option>
          {allEquipment.map((equipment) => (
            <option key={equipment._id} value={equipment.name}>
              {equipment.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <h2> Assign Favourite Brand:</h2>
        <select value={selectedBrand ? selectedBrand.name : ''} onChange={handleBrandChange} style={{ height: '40px' }}>
          <option value="" disabled>
            Select Brand
          </option>
          {allBrand.map((brand) => (
            <option key={brand._id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <h2> Assign Favourite Board Game:</h2>
        <select value={selectedGame ? selectedGame.name : ''} onChange={handleGameChange} style={{ height: '40px' }}>
          <option value="" disabled>
            Select Brand
          </option>
          {boardGames.map((game) => (
            <option key={game._id} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <h2> Change Position:</h2>
        <select value={selectedPosition ? selectedPosition.name : ''} onChange={handlePositionChange} style={{ height: '40px' }}>
          <option value="" disabled>
            Select Position
          </option>
          {positions.map((posi) => (
            <option key={posi._id} value={posi.name}>
              {posi.name}
            </option>
          ))}
        </select>
      </label>
    </div>

  );
};


export default EmployeeUpdater;