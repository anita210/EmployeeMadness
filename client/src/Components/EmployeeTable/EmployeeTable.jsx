import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import TableBody from "../SortableTable/TableBody.jsx";
import TableHead from "../SortableTable/TableHeader.jsx";

const EmployeeTable = (props) => {

  const { employees, setEmployees, handleDelete, clickedYesButton, setClickedYesButton, setClickedNoButton, clickedNoButton, confirmedDelete, clickedDelete, setClickedDelete, employeeToDelete, setEmployeeToDelete } = props;

  const columns = [
    {
      label: "First Name",
      accessor: (employee) => {
        const firstName = (employee.name).split(' ')[0].toString();
        return firstName;
      },
      accessorforsorting: "name"
    },
    {
      label: "Last Name",
      accessor: (employee) => {
        const lastName = (employee.name).split(' ').slice(1).join(' ');
        return lastName;
      },
      accessorforsorting: "name"
    },
    { label: "Level", accessor: "level", accessorforsorting: "level" },
    { label: "Position", accessor: "position", accessorforsorting: "position" },
    { label: "Years of experience", accessor: "experience", accessorforsorting: "experience" },
    {
      label: "Salary", accessor: (employee) => {
        const formattedSalary = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(employee.salary);
        return formattedSalary;
      }, accessorforsorting: "salary"
    },
    {
      label: "Desired salary", accessor: (employee) => {
        const formattedSalary = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(employee.desiredSalary)
        return formattedSalary;
      },
      accessorforsorting: "desiredSalary"
    },
    {
      label: "Salary difference", accessor: (employee) => {
        const salaryDifference = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR'
        }).format((employee.desiredSalary - employee.salary))
        return salaryDifference;
      }
    },
    {
      label: "Favourite color",
      accessor: (employee) => (
        <td style={{
          width: '20px',
          height: '20px',
          backgroundColor: employee.favouriteColor,
        }} />
      ), accessorforsorting: "favouriteColor"
    },
    {
      label: "Starting date", accessor: (employee) => {
        const formattedDate = new Date(employee.startingDate).toLocaleDateString()
        return formattedDate;
      }, accessorforsorting: "startingDate",
    }
  ];

  const handleSorting = (sortField, sortOrder, e) => {
    if (sortField) {
      const sorted = [...employees].sort((a, b) => {
        if (e.target.className === "Last Name") {
          return (a[sortField].split(" ")[1].toString().localeCompare(b[sortField].split(" ")[1].toString(), { numeric: true }) * (sortOrder === "asc" ? 1 : -1))
        }
        if (e.target.className === "Level") {
          const order = { Junior: 1, Medior: 2, Senior: 3, Expert: 4, Godlike: 5 };
          const levelA = order[a[sortField]];
          const levelB = order[b[sortField]];
          return sortOrder === "asc" ? levelA - levelB : levelB - levelA;
        }
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (a[sortField].toString().localeCompare(b[sortField].toString(), { numeric: true }) * (sortOrder === "asc" ? 1 : -1))
      })
      setEmployees(sorted);
    }
  }

  return (
    <div className="EmployeeTable">
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} setEmployees={setEmployees} />
        <TableBody columns={columns}
          employees={employees}
          setEmployees={setEmployees}
          handleDelete={handleDelete}
          clickedDelete={clickedDelete}
          setClickedDelete={setClickedDelete}
          clickedNoButton={clickedNoButton}
          setClickedNoButton={setClickedNoButton}
          clickedYesButton={clickedYesButton}
          setClickedYesButton={setClickedYesButton}
          confirmedDelete={confirmedDelete}
          employeeToDelete={employeeToDelete}
          setEmployeeToDelete={setEmployeeToDelete} />
      </table>
    </div>
  );
};

export default EmployeeTable;
