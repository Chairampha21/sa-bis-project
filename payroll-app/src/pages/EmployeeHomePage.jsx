import React from "react";
import "./style/EmployeeHomePage.css";
import {
  FaMoneyCheckAlt, FaHistory, FaIdCard, FaUserTie,
  FaHome, FaPhone, FaEnvelope, FaCalendarAlt, FaBuilding
} from "react-icons/fa";
import { employeesData } from "../data/employeesData";
import { useNavigate } from "react-router-dom";

const formatThaiDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return isNaN(d)
    ? "-"
    : d.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
};

const EmployeeHomePage = () => {
  const navigate = useNavigate(); // ✅ ต้องอยู่ในคอมโพเนนต์

  const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
  const employee = employeesData.find(
    (emp) => (emp.username || "").toLowerCase() === loggedInUser
  );

  if (!employee) return <div className="employee-home">❌ ไม่พบข้อมูลพนักงาน</div>;

  const empCode = employee.employeeCode || String(employee.id).padStart(5, "0");

  return (
    <div className="employee-home">
      {/* Header */}
      <header className="employee-header-top">
        <div className="header-left"><h2>Payroll</h2></div>
        <div className="header-right">
          <img src="https://via.placeholder.com/40" alt="profile" className="profile-pic" />
          <span className="employee-name">{employee.name}</span>
          <button
            className="btn logout-btn"
            onClick={() => {
              localStorage.removeItem("username");
              localStorage.removeItem("role");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Employee Detail Section */}
      <div className="employee-detail">
        <h3>ข้อมูลพนักงาน</h3>
        <div className="detail-grid">
          <div className="detail-item"><FaIdCard /> <strong>รหัสพนักงาน:</strong> {empCode}</div>
          <div className="detail-item"><FaUserTie /> <strong>ชื่อ-นามสกุล:</strong> {employee.name}</div>
          <div className="detail-item"><FaHome /> <strong>ที่อยู่:</strong> {employee.address || "-"}</div>
          <div className="detail-item"><FaPhone /> <strong>เบอร์โทรศัพท์:</strong> {employee.phone || "-"}</div>
          <div className="detail-item"><FaEnvelope /> <strong>Email:</strong> {employee.email || "-"}</div>
          <div className="detail-item"><FaUserTie /> <strong>ตำแหน่ง:</strong> {employee.role === "hr" ? "ฝ่ายบุคคล (HR)" : "พนักงาน"}</div>
          <div className="detail-item"><FaCalendarAlt /> <strong>วันเริ่มงาน:</strong> {formatThaiDate(employee.startDate)}</div>
          <div className="detail-item"><FaBuilding /> <strong>แผนก:</strong> {employee.department || "-"}</div>
        </div>
      </div>

      {/* Grid Card */}
      <div className="employee-grid">
        <div className="card employee-card">
          <FaMoneyCheckAlt className="card-icon" />
          <h3>ข้อมูลเงินเดือน</h3>
          <p>ตรวจสอบรายละเอียดเงินเดือน ตรวจสอบเงินเดือนย้อนหลังได้</p>
          <button onClick={() => navigate("/salary")}>ดูรายละเอียด</button>
        </div>

        <div className="card employee-card">
          <FaHistory className="card-icon" />
          <h3>ข้อมูลเวลางาน</h3>
          <p>ตรวจสอบความถูกต้องของเวลาการเข้างาน การขาด ลา สาย ตรวจสอบโอที</p>
          <button>ดูรายละเอียด</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
