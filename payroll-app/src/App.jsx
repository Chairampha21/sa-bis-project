import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeeHomePage from "./pages/EmployeeHomePage";
import HRHomePage from "./pages/HRHomePage";
import HRSalary from "./pages/HRSalary";
import NotFound from "./components/NotFound";
import HROverviewPage from "./pages/HROverviewPage";
import HRTimePage from "./pages/HRTimePage";
// import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import HREmployeeSalaryPage from "./pages/HREmployeeSalaryPage";
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
          path="/hr/salary/:id"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HREmployeeSalaryPage user={user} />
              : <Navigate to="/" />
          }
        />

        <Route 
          path="/employeedetail" 
          element={
            user?.role?.toLowerCase() === "hr"
              ? <EmployeeDetailPage user={user} />
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
          path="/hrsalary" 
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRSalary user={user} />
              : <Navigate to="/" />
          }
        />

        <Route 
          path="/hrtime" 
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRTimePage user={user} />
              : <Navigate to="/" />
          }
        />

        <Route 
          path="/overview" 
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HROverviewPage user={user} />
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
