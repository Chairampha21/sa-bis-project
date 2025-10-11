import React from "react";
import "./style/EmployeeHomePage.css";
import {
  FaMoneyCheckAlt, FaHistory, FaIdCard, FaUserTie,
  FaHome, FaPhone, FaEnvelope, FaCalendarAlt, FaBuilding, FaBell, FaExclamationCircle, FaUser, FaUniversity, FaCreditCard, FaBriefcase
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
      <header className="employee-header-top">
        <div className="header-left">
          <h2>Payroll</h2>
        </div>

        {/* การ์ดเล็กตรงแทบ Payroll */}
        <div className="header-middle">
            <div
              className={`mini-card ${window.location.pathname === "/employee" ? "active" : ""}`}
              onClick={() => navigate("/employee")}>
              <FaUser/>
              <span>ข้อมูลส่วนตัว</span>
            </div>

            <div
              className={`mini-card ${window.location.pathname === "/salary" ? "active" : ""}`}
              onClick={() => navigate("/salary")}>
              <FaMoneyCheckAlt />
              <span>ข้อมูลเงินเดือน</span>
            </div>

            <div
              className={`mini-card ${window.location.pathname === "/time" ? "active" : ""}`}
              onClick={() => navigate("/time")}>
              <FaHistory />
              <span>ข้อมูลเวลาการทำงาน</span>
            </div>

            <div
              className={`mini-card ${window.location.pathname === "/report" ? "active" : ""}`}
              onClick={() => navigate("/report")}>
              <FaExclamationCircle /> 
              <span>แจ้งปัญหา</span>
            </div>
        </div>

        <div className="header-right">
          <FaBell />
          <img src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.6435-9/66432336_2341250949495752_6935145544675229696_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFrBT17u_BCRVC43TF5p4n9BboTGA4ubzIFuhMYDi5vMkqdnUvpdG11Mg6APFXnLBbTPQJ1n3Svu76I4ZnxVlaI&_nc_ohc=Z87OxZkiFt8Q7kNvwHfz_Hk&_nc_oc=AdkFLzipbcH25imsMR-GC49oohomr8J5GhkJ7Zjl6-VUiiMyPOrCUhbkmFG_4QOHxNQ&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=UK2JKMhlaRnz081vbeHKHA&oh=00_AffiEnDOyZv-wZ_5IDE9QBbGni-VdXgUTK9lb9-xp0ywVg&oe=69083BEE" alt="profile" className="profile-pic" />
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
          <div className="detail-item"><FaBriefcase  /> <strong>ประเภทพนักงาน:</strong> {employee.employeeType || "-"}</div>
          <div className="detail-item"><FaCreditCard  /> <strong>เลขบัญชี:</strong> {employee.bankAccount || "-"}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
