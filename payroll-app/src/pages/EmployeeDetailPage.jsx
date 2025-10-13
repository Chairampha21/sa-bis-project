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

  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeField, setActiveField] = useState(null); // ช่องที่กำลังพิมพ์อยู่

  const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
  // const employee = employeesData.find(
  //   (emp) => (emp.username || "").toLowerCase() === loggedInUser
  // );

  // ✅ ฟิลเตอร์พนักงาน (ไม่รวมตัว HR ที่ล็อกอิน)
  const filteredEmployees = employeesData.filter((emp) => {
    if ((emp.username || "").toLowerCase() === loggedInUser) return false;

    const position =
      emp.role === "hr"
        ? "ฝ่ายบุคคล"
        : emp.role === "employee"
          ? "พนักงาน"
          : emp.role || "";

    return (
      (searchCode === "" ||
        emp.employeeCode?.toLowerCase().includes(searchCode.toLowerCase())) &&
      (searchName === "" ||
        emp.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchDept === "" ||
        emp.department.toLowerCase().includes(searchDept.toLowerCase())) &&
      (searchRole === "" ||
        position.toLowerCase().includes(searchRole.toLowerCase()))
    );
  });

  // ✅ Suggestion เฉพาะช่องที่พิมพ์
  const suggestions = employeesData
    .filter((emp) => {
      const input =
        activeField === "code"
          ? searchCode.toLowerCase()
          : activeField === "name"
            ? searchName.toLowerCase()
            : activeField === "dept"
              ? searchDept.toLowerCase()
              : activeField === "role"
                ? searchRole.toLowerCase()
                : "";

      if (!input) return false;

      const position =
        emp.role === "hr"
          ? "ฝ่ายบุคคล"
          : emp.role === "employee"
            ? "พนักงาน"
            : emp.role || "";

      if (activeField === "code")
        return emp.employeeCode?.toLowerCase().includes(input);
      if (activeField === "name")
        return emp.name.toLowerCase().includes(input);
      if (activeField === "dept")
        return emp.department.toLowerCase().includes(input);
      if (activeField === "role")
        return position.toLowerCase().includes(input);

      return false;
    })
    .slice(0, 6);

  // ✅ เมื่อเลือกจาก Suggestion → ใส่ครบ 4 ช่อง
  const handleSelectSuggestion = (emp) => {
    setSearchName(emp.name);
    setSearchCode(emp.employeeCode || "");
    setSearchDept(emp.department);
    setSearchRole(emp.role === "hr" ? "ฝ่ายบุคคล" : "พนักงาน");
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
          <FaBell />
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

      {/* ===== Search Section ===== */}
      <div className="employee-detail">
        <h3>ข้อมูลพนักงาน</h3>

        <div className="search-section grid-search">
          <input
            type="text"
            placeholder="รหัสพนักงาน"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            onFocus={() => {
              setActiveField("code");
              setShowSuggestions(true);
            }}
          />
          <input
            type="text"
            placeholder="ชื่อ-นามสกุล"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onFocus={() => {
              setActiveField("name");
              setShowSuggestions(true);
            }}
          />
          <input
            type="text"
            placeholder="แผนก"
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
            onFocus={() => {
              setActiveField("dept");
              setShowSuggestions(true);
            }}
          />
          <input
            type="text"
            placeholder="ตำแหน่ง"
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
            onFocus={() => {
              setActiveField("role");
              setShowSuggestions(true);
            }}
          />

          <button className="search-btn">
            <FaSearch /> ค้นหา
          </button>

          {/* 🔽 Suggestion Dropdown */}
          {showSuggestions && activeField && (
            <ul className="suggestions">
              {suggestions.length > 0 ? (
                suggestions.map((emp) => {
                  const position =
                    emp.role === "hr"
                      ? "ฝ่ายบุคคล"
                      : emp.role === "employee"
                        ? "พนักงาน"
                        : emp.role || "";

                  return (
                    <li
                      key={emp.id}
                      onClick={() => handleSelectSuggestion(emp)}
                    >
                      <strong>{emp.employeeCode}</strong> — {emp.name} |{" "}
                      {emp.department} | {position}
                    </li>
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
                  <td>
                    {emp.role === "hr" ? "ฝ่ายบุคคล" : "พนักงาน"}
                  </td>
                  <td className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/hr/salary/${emp.id}`)}
                    >
                      จัดการเงินเดือน
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
