import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import { FaIdCard, FaHistory, FaExclamationCircle, FaPaperPlane, FaUser, FaMoneyBillWave, FaChartBar } from "react-icons/fa";

const HRReport = () => {
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

export default HRReport;
