import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeeHomePage from "./pages/EmployeeHomePage";
import HRHomePage from "./pages/HRHomePage";
import NotFound from "./components/NotFound";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import HRTransactionPage from "./pages/HRTransactionPage";
import SalaryDetailPage from "./pages/SalaryDetailPage";
import EmployeeTimePage from "./pages/EmployeeTimePage";
import ReportIssuePage from "./pages/ReportIssuePage";
import './App.css';

function App() {
  const [user, setUser] = useState(null); // { role: "employee" | "hr" }

  return (
    <Router>
      <Routes>
        {/* หน้า Login */}
        <Route path="/" element={<LoginPage setUser={setUser} />} />

        <Route
          path="/employee"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <EmployeeHomePage user={user} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/hr"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRHomePage user={user} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/hr/employees"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <EmployeeListPage />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/hr/employee/:username"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <EmployeeDetailPage />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/hr/transaction"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRTransactionPage />
              : <Navigate to="/" />
          }
        />

        <Route 
          path="/salary" 
          element={
            user?.role?.toLowerCase() === "employee"
              ? <SalaryDetailPage user={user} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/time"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <EmployeeTimePage user={user} />
              : <Navigate to="/" />
          }
        />


        <Route
          path="/report"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <ReportIssuePage user={user} />
              : <Navigate to="/" />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
