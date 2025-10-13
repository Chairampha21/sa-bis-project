import React from "react";
import "./style/HRHomePage.css";
import {
  FaMoneyBillWave, FaHistory, FaIdCard, FaUserTie, FaChartBar,
  FaHome, FaPhone, FaEnvelope, FaCalendarAlt, FaBuilding,  FaExclamationCircle, FaUser, FaUniversity, FaCreditCard, FaBriefcase
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

const HRHomePage = () => {
  const navigate = useNavigate();

  const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
  const employee = employeesData.find(
    (emp) => (emp.username || "").toLowerCase() === loggedInUser
  );

  if (!employee) return <div className="employee-home">❌ ไม่พบข้อมูลพนักงาน</div>;

  const empCode = employee.employeeCode || String(employee.id).padStart(5, "0");

  return (
    <div className="employee-home">
      {/* Header */}
      <header className="hr-header-top">
        <div className="hr-header-left">
          <h3>Payroll</h3>
        </div>

        <div className="hr-header-middle">
          <div
            className={`mini-card ${window.location.pathname === "/hr" ? "active" : ""}`}
            onClick={() => navigate("/hr")}
          >
            <FaUser />
            <span>ข้อมูลส่วนตัว</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname.startsWith("/hrsalary") ? "active" : ""}`}
            onClick={() => navigate("/hrsalary")}
          >
            <FaMoneyBillWave />
            <span>ข้อมูลเงินเดือน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/hrtime" ? "active" : ""}`}
            onClick={() => navigate("/hrtime")}
          >
            <FaHistory />
            <span>เวลาทำงาน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/hrreport" ? "active" : ""}`}
            onClick={() => navigate("/hrreport")}
          >
            <FaExclamationCircle />
            <span>แจ้งปัญหา</span>
          </div>

          {/* 🔽 เส้นแบ่ง (divider) */}
          <div className="divider"></div>

          <div
            className={`mini-card ${window.location.pathname === "/employeedetail" ? "active" : ""}`}
            onClick={() => navigate("/employeedetail")}
          >
            <FaIdCard />
            <span>ข้อมูลพนักงาน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/overview" ? "active" : ""}`}
            onClick={() => navigate("/overview")}
          >
            <FaChartBar />
            <span>ภาพรวมเงินเดือน</span>
          </div>
        </div>

        <div className="header-right">
          
          <img src="https://images-ext-1.discordapp.net/external/EyvjpwuQoXxpKE5AIreUblST0vJc78DGBF9C_-ngigI/%3Fq%3Dtbn%3AANd9GcR0ZzeG8-ZeLyAAncO2wy4G8XmcKet6r-DrBXN4F-ZLqQ%26s%3D10/https/encrypted-tbn0.gstatic.com/images?format=webp&width=559&height=559" alt="profile" className="profile-pic" />
          {/* <span className="employee-name">{employee.name}</span> */}
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
        <h3>ข้อมูลส่วนตัว</h3>
        <div className="detail-grid">
          <div className="detail-item"><FaIdCard /> <strong>รหัสพนักงาน:</strong> {empCode}</div>
          <div className="detail-item"><FaUserTie /> <strong>ชื่อ-นามสกุล:</strong> {employee.name}</div>
          <div className="detail-item"><FaHome /> <strong>ที่อยู่:</strong> {employee.address || "-"}</div>
          <div className="detail-item"><FaPhone /> <strong>เบอร์โทรศัพท์:</strong> {employee.phone || "-"}</div>
          <div className="detail-item"><FaEnvelope /> <strong>Email:</strong> {employee.email || "-"}</div>
          <div className="detail-item"><FaBuilding /> <strong>แผนก:</strong> {employee.department || "-"}</div>
          <div className="detail-item"><FaCalendarAlt /> <strong>วันเริ่มงาน:</strong> {formatThaiDate(employee.startDate)}</div>
          <div className="detail-item"><FaUserTie /> <strong>ตำแหน่ง:</strong> {employee.role === "hr" ? "ฝ่ายบุคคล (HR)" : "พนักงาน"}</div>
          <div className="detail-item"><FaUniversity /> <strong>ธนาคาร:</strong> {employee.bankName || "-"}</div>
          <div className="detail-item"><FaBriefcase /> <strong>ประเภทพนักงาน:</strong> {employee.employeeType || "-"}</div>
          <div className="detail-item"><FaCreditCard /> <strong>เลขบัญชี:</strong> {employee.bankAccount || "-"}</div>
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;