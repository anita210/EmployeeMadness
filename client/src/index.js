import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";


import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EmployeesByName from "./Pages/EmployeesByName";
import MissingEmployeeList from "./Pages/MissingEmployeeList";

import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ExperiencePage } from "./Pages/ExperiencePage";
import { TopPaidPage } from "./Pages/TopPaidPage";
import { ToolsPage } from "./Pages/ToolsPage";
import { KittenPage } from "./Pages/KittenPage";
import { BoardGameCreator } from "./Pages/BoardGameCreator";
import { BoardGameListPage } from "./Pages/BoardGameListPage";
import { BoardGamePage } from "./Pages/BoardGamePage";
import { PositionsPage } from "./Pages/PositionsPage";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <EmployeeList />,
        },
        {
          path: "/create",
          element: <EmployeeCreator />,
        },
        {
          path: "/update/:id",
          element: <EmployeeUpdater />,
        },
        {
          path: "/table-test",
          element: <TableTest />,
        },
        {
          path: "/form-test",
          element: <FormTest />,
        },
        {
          path: "/edit-equipment",
          element: <EquipmentUpdater />
        },
        {
          path: "/employees/:search",
          element: <EmployeesByName />
        },
        {
          path: "/missing",
          element: (
            <MissingEmployeeList />
          ),
        },
        {
          path: "/experience/:years",
          element: (
            <ExperiencePage />
          )
        },
        {
          path: "/top-paid",
          element: (
            <TopPaidPage />
          )
        },
        {
          path: "/tools",
          element: (
            <ToolsPage />
          )
        },
        {
          path: "/kittens/:employeeId",
          element: (
            <KittenPage />
          )
        },
        {
          path: "/games",
          element: (
            <BoardGameCreator />
          )
        },
        {
          path: "/games-list",
          element: (
            <BoardGameListPage />
          )
        },
        {
          path: "/games-list/:id",
          element: (
            <BoardGamePage />
          )
        },
        {path: "/positions",
        element:
        (<PositionsPage/>)
      }
      ],
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
