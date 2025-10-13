import React, { useState } from "react";
import "./style/ReportIssuePage.css";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import { FaMoneyCheckAlt, FaHistory,  FaExclamationCircle, FaPaperPlane, FaUser } from "react-icons/fa";

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
  const employee = employeesData.find(
    (emp) => (emp.username || "").toLowerCase() === loggedInUser
  );

  if (!employee)
    return <div className="employee-home">❌ ไม่พบข้อมูลพนักงาน</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue.trim() === "") return alert("กรุณากรอกรายละเอียดปัญหา");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setIssue("");
  };

  return (
    <div className="employee-home">
      {/* ===== Header ===== */}
      <header className="employee-header-top">
        <div className="header-left"><h2>Payroll</h2></div>

        <div className="header-middle">
          <div
            className={`mini-card ${window.location.pathname === "/employee" ? "active" : ""}`}
            onClick={() => navigate("/employee")}
          >
            <FaUser/>
            <span>ข้อมูลส่วนตัว</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/salary" ? "active" : ""}`}
            onClick={() => navigate("/salary")}
          >
            <FaMoneyCheckAlt />
            <span>ข้อมูลเงินเดือน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/time" ? "active" : ""}`}
            onClick={() => navigate("/time")}
          >
            <FaHistory />
            <span>ข้อมูลเวลาการทำงาน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/report" ? "active" : ""}`}
            onClick={() => navigate("/report")}
          >
            <FaExclamationCircle />
            <span>แจ้งปัญหา</span>
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
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ===== Report Section ===== */}
      <div className="employee-detail report-section">
        <h3><FaExclamationCircle /> แจ้งปัญหาเงินเดือน</h3>
        <p className="report-subtext">
          โปรดระบุรายละเอียดปัญหาเกี่ยวกับเงินเดือน เช่น ยอดไม่ถูกต้อง ขาด OT หรือรายการหักผิดพลาด
        </p>

        <form className="report-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="กรอกรายละเอียดปัญหา..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            <FaPaperPlane /> ส่งคำร้อง
          </button>
        </form>

        {submitted && (
          <div className="report-success">
            ✅ ส่งคำร้องสำเร็จ! ทีม HR จะตรวจสอบและติดต่อกลับโดยเร็ว
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssuePage;
