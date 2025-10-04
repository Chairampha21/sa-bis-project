import React from "react";
import "./style/EmployeeTimePage.css";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import {
    FaMoneyCheckAlt,
    FaHistory,
    FaBell,
    FaIdCard,
    FaBuilding,
    FaUserTie,
    FaExclamationCircle,
    FaUser,
} from "react-icons/fa";

const EmployeeTimePage = () => {
    const navigate = useNavigate();
    const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
    const employee = employeesData.find(
        (emp) => (emp.username || "").toLowerCase() === loggedInUser
    );
    const empCode = employee.employeeCode || String(employee.id).padStart(5, "0");

    return (
        <div className="employee-home">
            {/* ===== Header ===== */}
            <header className="employee-header-top">
                <div className="header-left">
                    <h2>Payroll</h2>
                </div>

                <div className="header-middle">
                    <div
                        className={`mini-card ${window.location.pathname === "/employee" ? "active" : ""
                            }`}
                        onClick={() => navigate("/employee")}
                    >
                        <FaUser/>
                        <span>ข้อมูลส่วนตัว</span>
                    </div>

                    <div
                        className={`mini-card ${window.location.pathname === "/salary" ? "active" : ""
                            }`}
                        onClick={() => navigate("/salary")}
                    >
                        <FaMoneyCheckAlt />
                        <span>ข้อมูลเงินเดือน</span>
                    </div>

                    <div
                        className={`mini-card ${window.location.pathname === "/time" ? "active" : ""
                            }`}
                        onClick={() => navigate("/time")}
                    >
                        <FaHistory />
                        <span>ข้อมูลเวลาการทำงาน</span>
                    </div>

                    <div
                        className={`mini-card ${window.location.pathname === "/report" ? "active" : ""
                            }`}
                        onClick={() => navigate("/report")}
                    >
                        <FaExclamationCircle /> 
                        <span>แจ้งปัญหา</span>
                    </div>
                </div>

                <div className="header-right">
                    <FaBell />
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
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* ===== Employee Info ===== */}
            <div className="employee-detail">
                <h3>ข้อมูลพนักงาน</h3>
                <div className="detail-grid">
                    <div className="detail-item">
                        <FaIdCard /> <strong>รหัสพนักงาน:</strong> {empCode}
                    </div>
                    <div className="detail-item">
                        <FaBuilding /> <strong>แผนก:</strong> {employee.department}
                    </div>
                    <div className="detail-item">
                        <FaUserTie /> <strong>ชื่อ-นามสกุล:</strong> {employee.name}
                    </div>
                    <div className="detail-item">
                        <FaUserTie /> <strong>ตำแหน่ง:</strong>{" "}
                        {employee.role === "hr" ? "ฝ่ายบุคคล (HR)" : "พนักงาน"}
                    </div>
                </div>
            </div>

            {/* ===== Time Dashboard ===== */}
            <div className="employee-detail">
                <h3>เวลาการทำงาน</h3>

                <section className="time-dashboard">
                    <div className="time-summary">
                        {/* กล่อง Present รวม Entry + Exit */}
                        <div className="summary-card combo">
                            <h4>Present</h4>
                            <div className="present-grid">
                                <div className="present-section left">
                                    <h5>Entry</h5>
                                    <p>5 On-time</p>
                                    <p>1 Late Entry</p>
                                </div>
                                <div className="present-section right">
                                    <h5>Exit</h5>
                                    <p>2 Early Exit</p>
                                    <p>3 Late Exit</p>
                                </div>
                            </div>
                        </div>

                        <div className="summary-card orange">
                            <h4>Leave</h4>
                            <p>0</p>
                        </div>
                        <div className="summary-card teal">
                            <h4>Holiday</h4>
                            <p>2</p>
                        </div>
                        <div className="summary-card red">
                            <h4>Absent</h4>
                            <p>0</p>
                        </div>
                        <div className="summary-card gray">
                            <h4>Working Days</h4>
                            <p>6</p>
                            <div className="small-note">
                                <span>Expected: 54:00</span>
                                <br />
                                <span>Total: 36:02:37</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Time Table ===== */}
                <div className="time-table">
                    <table>
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>เวลาเข้างาน</th>
                                <th>เวลาออกงาน</th>
                                <th>ชั่วโมงทำงาน</th>
                                <th>OT</th> {/* ✅ เพิ่มคอลัมน์ OT */}
                                <th>สถานะ</th>
                                <th>หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-02-13 (Mon)</td>
                                <td>08:38</td>
                                <td>17:12</td>
                                <td>8 ชม. 34 นาที</td>
                                <td>01:15</td> {/* ✅ ตัวอย่าง OT */}
                                <td>
                                    <span className="tag late">Early Leave</span>
                                </td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>2023-02-12 (Sun)</td>
                                <td colSpan="6" className="holiday">
                                    Holiday
                                </td>
                            </tr>
                            <tr>
                                <td>2023-02-10 (Fri)</td>
                                <td>10:36</td>
                                <td>18:34</td>
                                <td>7 ชม. 58 นาที</td>
                                <td>00:45</td> {/* ✅ ตัวอย่าง OT */}
                                <td>
                                    <span className="tag ontime">On-time</span>
                                </td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTimePage;
