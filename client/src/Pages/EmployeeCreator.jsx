import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const createEmployee = async (employee) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      }  else {
        setErrorMessage('');
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);

      });
  };

  return (
    <div>
      <EmployeeForm
        onCancel={() => navigate("/")}
        disabled={loading}
        onSave={handleCreateEmployee}
        errorMessage={errorMessage} 
      />
    </div>
  );
};

export default EmployeeCreator;