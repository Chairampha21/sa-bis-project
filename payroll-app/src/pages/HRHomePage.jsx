import React from "react";
import "./style/HRHomePage.css";
import { FaUsers, FaSearch, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // เพิ่ม import

const HRHomePage = () => {
  const navigate = useNavigate(); // hook สำหรับ navigation

  return (
    <div className="hr-home">
      {/* Header */}
      <header className="hr-header-top">
        <div className="header-left">
          <h2>Payroll</h2>
        </div>
        <div className="header-right">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="profile-pic"
          />
          <span className="hr-name">HR Manager</span>
          <button className="btn logout-btn">Logout</button>
        </div>
      </header>

      {/* Greeting */}
      <div className="hr-header">
        <h2>📊 ยินดีต้อนรับ HR</h2>
        <p>คุณสามารถจัดการพนักงานและตรวจสอบเงินเดือนได้ที่นี่</p>
      </div>

      {/* Grid Card */}
      <div className="hr-grid">
        <div className="card hr-card">
          <FaUsers className="card-icon" />
          <h3>พนักงานทั้งหมด</h3>
          <p>ดูรายชื่อและข้อมูลพนักงานทุกคน</p>
          <button onClick={() => navigate("/hr/employees")}>ดูรายการ</button>
        </div>

        <div className="card hr-card">
          <FaSearch className="card-icon" />
          <h3>ค้นหาพนักงาน</h3>
          <p>ค้นหาพนักงานด้วยชื่อ หรือรหัสพนักงาน</p>
          <button onClick={() => navigate("/hr/employees")}>ค้นหา</button>
        </div>

        <div className="card hr-card">
          <FaUserEdit className="card-icon" />
          <h3>แก้ไขเงินเดือน</h3>
          <p>เลือกพนักงานเพื่อแก้ไขรายละเอียดเงินเดือน</p>
          <button onClick={() => navigate("/hr/transaction")}>แก้ไข</button> {/* เพิ่มลิงก์ */}
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;