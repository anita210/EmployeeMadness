import { Outlet, Link } from "react-router-dom";


import "./Layout.css";
import Searchbar from "../../Components/Searchbar/SearchBar";
import { EmployeeContext, EmployeeProvider } from "../../context/EmployeeContext";
import { useState } from "react";

const Layout = () => (

  <EmployeeProvider>
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Searchbar />
        </li>
        <li>
          <Link to="/missing">
            <button type="button">Missing Employees</button>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
  </EmployeeProvider>
);

export default Layout;
