import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import { FaIdCard, FaHistory,  FaExclamationCircle, FaPaperPlane, FaUser, FaMoneyBillWave, FaChartBar } from "react-icons/fa";

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
                    
                    <img src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.6435-9/66432336_2341250949495752_6935145544675229696_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFrBT17u_BCRVC43TF5p4n9BboTGA4ubzIFuhMYDi5vMkqdnUvpdG11Mg6APFXnLBbTPQJ1n3Svu76I4ZnxVlaI&_nc_ohc=Z87OxZkiFt8Q7kNvwHfz_Hk&_nc_oc=AdkFLzipbcH25imsMR-GC49oohomr8J5GhkJ7Zjl6-VUiiMyPOrCUhbkmFG_4QOHxNQ&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=UK2JKMhlaRnz081vbeHKHA&oh=00_AffiEnDOyZv-wZ_5IDE9QBbGni-VdXgUTK9lb9-xp0ywVg&oe=69083BEE" alt="profile" className="profile-pic" />
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
