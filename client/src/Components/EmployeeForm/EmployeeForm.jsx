import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, errorMessage }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [experience, setExperience] = useState(employee?.yearsOfExperience ?? "");
  const [moreData, setMoreData] = useState(
    {
      startingDate: employee?.startingDate ?? null,
      salary: employee?.salary ?? 0,
      desiredSalary: employee?.desiredSalary ?? 0,
      favouriteColor: employee?.favouriteColor ?? "#000000"
    }
  )

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        experience,
        startingDate: moreData.startingDate,
        salary:moreData.salary,
        desiredSalary: moreData.desiredSalary,
        favouriteColor: moreData.favouriteColor
      });
    }
    else if (employee && employee.level === "Junior") {
      setExperience(0);
      return onSave({
        ...employee,
        name,
        level,
        position,
        experience,
        moreData
      })
    }

    return onSave({
      name,
      level,
      position,
      experience,
      moreData
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMoreData((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          value={moreData.salary}
          onChange={handleInputChange}
          name="salary"
          id="salary"
        />
      </div>

      <div className="control">
        <label htmlFor="desiredSalary">Desired salary</label>
        <input
          type="number"
          value={moreData.desiredSalary}
          onChange={handleInputChange}
          name="desiredSalary"
          id="desiredSalary"
        />
      </div>

      <div className="control">
        <label htmlFor="startingDate">Starting Date</label>
        <input
          type="date"
          value={moreData.startingDate}
          onChange={handleInputChange}
          name="startingDate"
          id="startingDate"
        />
      </div>

      <div className="control">
        <label htmlFor="favouriteColor">Favourite Color</label>
        <input
          type="color"
          value={moreData.favouriteColor}
          onChange={handleInputChange}
          name="favouriteColor"
          id="favouriteColor"
        />
      </div>


      {(!employee || (employee && employee.level !== "Junior")) && (
        <div className="experience">
          <label htmlFor="experience"> Years of experience</label>
          <input value={experience}
            type="number"
            id="experience"
            name="experience"
            onChange={(e) => setExperience(e.target.value)} />
        </div>)}
      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default EmployeeForm;
