import React, { useState } from "react";
import "./style/ReportIssuePage.css";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import { FaMoneyCheckAlt, FaHistory, FaBell, FaExclamationCircle, FaPaperPlane, FaUser } from "react-icons/fa";

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
          <FaBell/>
          <img
            src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.6435-9/66432336_2341250949495752_6935145544675229696_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFrBT17u_BCRVC43TF5p4n9BboTGA4ubzIFuhMYDi5vMkqdnUvpdG11Mg6APFXnLBbTPQJ1n3Svu76I4ZnxVlaI&_nc_ohc=Z87OxZkiFt8Q7kNvwHfz_Hk&_nc_oc=AdkFLzipbcH25imsMR-GC49oohomr8J5GhkJ7Zjl6-VUiiMyPOrCUhbkmFG_4QOHxNQ&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=UK2JKMhlaRnz081vbeHKHA&oh=00_AffiEnDOyZv-wZ_5IDE9QBbGni-VdXgUTK9lb9-xp0ywVg&oe=69083BEE"
            alt="profile"
            className="profile-pic"
          />
          <span className="employee-name">{employee.name}</span>
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
