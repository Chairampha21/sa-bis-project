import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeeHomePage from "./pages/EmployeeHomePage";
import HRHomePage from "./pages/HRHomePage";
import HRSalary from "./pages/HRSalary";
import NotFound from "./components/NotFound";
import HROverviewPage from "./pages/HROverviewPage";
import HRTimePage from "./pages/HRTimePage";
import HRReport from "./pages/HRReport";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import HREmployeeSalaryPage from "./pages/HREmployeeSalaryPage";
import SalaryDetailPage from "./pages/SalaryDetailPage";
import EmployeeTimePage from "./pages/EmployeeTimePage";
import ReportIssuePage from "./pages/ReportIssuePage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // ✅ โหลด user จาก localStorage เมื่อ refresh
  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (username && role) setUser({ username, role });
  }, []);

  return (
    <Router>
      <PathTracker /> {/* ✅ ตัวช่วยจำ path ล่าสุด */}
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        {/* ==== EMPLOYEE ==== */}
        <Route
          path="/employee"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <EmployeeHomePage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/salary"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <SalaryDetailPage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/time"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <EmployeeTimePage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/report"
          element={
            user?.role?.toLowerCase() === "employee"
              ? <ReportIssuePage user={user} />
              : <Navigate to="/" replace />
          }
        />

        {/* ==== HR ==== */}
        <Route
          path="/hr"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRHomePage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/hrsalary"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRSalary user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/hrtime"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRTimePage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/hrreport"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HRReport user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/overview"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HROverviewPage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/employeedetail"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <EmployeeDetailPage user={user} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/hr/salary/:id"
          element={
            user?.role?.toLowerCase() === "hr"
              ? <HREmployeeSalaryPage user={user} />
              : <Navigate to="/" replace />
          }
        />

        {/* ==== 404 ==== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function PathTracker() {
  const location = useLocation();

  useEffect(() => {
    // บันทึก path ล่าสุดใน localStorage ทุกครั้งที่เปลี่ยนหน้า
    localStorage.setItem("lastPath", location.pathname);
  }, [location]);

  return null;
}


export default App;
