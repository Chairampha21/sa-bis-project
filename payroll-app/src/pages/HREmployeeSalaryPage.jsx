import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/HREmployeeSalaryPage.css";
import { employeesData } from "../data/employeesData";
import { FaMoneyCheckAlt, FaUser, FaArrowLeft } from "react-icons/fa";

const HREmployeeSalaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employeesData.find((emp) => String(emp.id) === id);
  
  const empCode = employee.employeeCode || String(employee.id).padStart(5, "0");
  
  return (
    <div className="salary-page">
      {/* ===== Header ===== */}
      <div className="title-bar">
        <button className="back-btn" onClick={() => navigate("/employeedetail")}>
          <FaArrowLeft /> กลับ
        </button>
        <h2>
          <FaMoneyCheckAlt className="title-icon" /> ข้อมูลเงินเดือนพนักงาน
        </h2>
      </div>

      {/* ===== Employee Info ===== */}
      <div className="salary-employee-info">
        <div><strong>ชื่อ-นามสกุล:</strong> {employee.name}</div>
        <div><strong>รหัสพนักงาน:</strong> {empCode}</div>
        <div><strong>แผนก:</strong> {employee.department}</div>
        <div><strong>ตำแหน่ง:</strong> {employee.role === "hr" ? "ฝ่ายบุคคล (HR)" : "พนักงาน"}</div>
      </div>

      {/* ===== Salary Detail ===== */}
      <div className="salary-card">
        <h3><FaUser /> ข้อมูลเงินเดือน</h3>
        <div className="salary-grid">
          <div><strong>เงินเดือนพื้นฐาน:</strong> ฿{employee.baseSalary?.toLocaleString() || "ไม่ระบุ"}</div>
          <div><strong>ค่าล่วงเวลา (OT):</strong> ฿{employee.ot || 0}</div>
          <div><strong>โบนัส:</strong> ฿{employee.bonus || 0}</div>
          <div><strong>หักภาษี:</strong> ฿{employee.tax || 0}</div>
          <div><strong>หักประกันสังคม:</strong> ฿{employee.socialSecurity || 0}</div>
          <div className="net-salary">
            <strong>เงินเดือนสุทธิ:</strong> ฿{(employee.netSalary || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HREmployeeSalaryPage;
