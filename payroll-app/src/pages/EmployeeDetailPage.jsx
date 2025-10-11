import React, { useState } from "react";
import "./style/EmployeeHomePage.css";
import "./style/EmployeeDetailPage.css";
import {
  FaMoneyBillWave,
  FaHistory,
  FaBell,
  FaIdCard,
  FaExclamationCircle,
  FaUser,
  FaSearch,
  FaChartBar,
} from "react-icons/fa";
import { employeesData } from "../data/employeesData";
import { useNavigate } from "react-router-dom";

const EmployeeDetailPage = () => {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
  const employee = employeesData.find(
    (emp) => (emp.username || "").toLowerCase() === loggedInUser
  );

  const filteredEmployees = employeesData.filter(
    (emp) =>
      (emp.username || "").toLowerCase() !== loggedInUser &&
      (emp.name.toLowerCase().includes(searchName.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchName.toLowerCase()) ||
        emp.employeeCode?.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchCode === "" ||
        emp.employeeCode?.toLowerCase().includes(searchCode.toLowerCase()))
  );

  const suggestions = employeesData
    .filter((emp) => {
      const nameMatch = emp.name.toLowerCase().includes(searchName.toLowerCase());
      const codeMatch = emp.employeeCode?.toLowerCase().includes(searchCode.toLowerCase());
      return (
        (searchName && nameMatch) ||
        (searchCode && codeMatch)
      );
    })
    .slice(0, 6);


  // ✅ เมื่อเลือกจาก Auto Complete
  const handleSelectSuggestion = (emp) => {
    setSearchName(emp.name);
    setSearchCode(emp.employeeCode || "");
    setShowSuggestions(false);
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
            className={`mini-card ${window.location.pathname === "/employeedetail" ? "active" : ""}`}
            onClick={() => navigate("/employeedetail")}
          >
            <FaIdCard />
            <span>ข้อมูลพนักงาน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname.startsWith("/hrsalary") ? "active" : ""}`}
            onClick={() => navigate("/hrsalary")}
          >
            <FaMoneyBillWave />
            <span>ข้อมูลเงินเดือน</span>
          </div>

          <div
            className={`mini-card ${window.location.pathname === "/overview" ? "active" : ""}`}
            onClick={() => navigate("/overview")}
          >
            <FaChartBar />
            <span>ภาพรวมเงินเดือน</span>
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

      {/* ===== Search Section ===== */}
      <div className="employee-detail">
        <h3>ค้นหาข้อมูลพนักงาน</h3>

        <div className="search-section dual-search">

          <div className="search-box">
            <input
              type="text"
              placeholder="ค้นหารหัสพนักงาน..."
              value={searchCode}
              onChange={(e) => {
                setSearchCode(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="ค้นหาชื่อหรือแผนก..."
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
          </div>

          <button className="search-btn">
            <FaSearch /> ค้นหา
          </button>

          {/* 🔽 Auto Complete Dropdown */}
          {showSuggestions && (searchName || searchCode) && (
            <ul className="suggestions">
              {suggestions.length > 0 ? (
                suggestions.map((emp) => {
                  const highlightText = (text, search) => {
                    if (!search) return text;
                    const regex = new RegExp(`(${search})`, "gi");
                    return text.replace(regex, "<mark>$1</mark>");
                  };

                  return (
                    <li
                      key={emp.id}
                      onClick={() => handleSelectSuggestion(emp)}
                      dangerouslySetInnerHTML={{
                        __html: `
                                  <strong>${highlightText(emp.name, searchName)}</strong> — 
                                  <span>${highlightText(emp.employeeCode || "", searchCode)} | ${emp.department}</span>
                                `,
                      }}
                    ></li>
                  );
                })
              ) : (
                <li className="no-result">ไม่พบข้อมูล</li>
              )}
            </ul>

          )}
        </div>

        {/* ===== Employee Table ===== */}
        <table className="employee-table">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อ-นามสกุล</th>
              <th>แผนก</th>
              <th>ตำแหน่ง</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.employeeCode || emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.role === "hr" ? "ฝ่ายบุคคล" : "พนักงาน"}</td>
                  <td className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/hr/salary/${emp.id}`)}
                    >
                      เงินเดือน
                    </button>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/time/${emp.id}`)}
                    >
                      เวลาทำงาน
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  ไม่พบข้อมูลพนักงาน
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
