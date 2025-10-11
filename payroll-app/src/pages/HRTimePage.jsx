import React, { useState, useEffect } from "react";
import "./style/EmployeeTimePage.css";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import {
    FaMoneyBillWave,
    FaHistory,
    FaBell,
    FaIdCard,
    FaBuilding,
    FaUserTie,
    FaExclamationCircle,
    FaUser,
    FaChartBar,
} from "react-icons/fa";

// ===== ฟังก์ชันจำลองข้อมูลเวลาทำงาน =====
const generateMonthlyData = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const statuses = ["เข้างานตรงเวลา", "เข้าสาย", "ออกก่อนเวลา", "ทำ OT", "ขาดงาน", "วันหยุด"];
    const data = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const weekday = new Date(year, month - 1, i).toLocaleDateString("th-TH", {
            weekday: "short",
        });
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        if (randomStatus === "วันหยุด") {
            data.push({ date: `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")} (${weekday})`, holiday: true });
        } else if (randomStatus === "ขาดงาน") {
            data.push({ date: `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")} (${weekday})`, absent: true });
        } else {
            data.push({
                date: `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")} (${weekday})`,
                entry: "08:30",
                exit: "17:00",
                hours: "8 ชม. 30 นาที",
                ot: randomStatus === "ทำ OT" ? "01:00" : "-",
                status: randomStatus,
            });
        }
    }

    return data;
};

const HRTimePage = () => {
    const navigate = useNavigate();
    const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
    const employee = employeesData.find(
        (emp) => (emp.username || "").toLowerCase() === loggedInUser
    );
    const empCode = employee.employeeCode || String(employee.id).padStart(5, "0");

    // === state ===
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [workData, setWorkData] = useState([]);
    const [summary, setSummary] = useState({});

    // === สร้างข้อมูลเมื่อเปลี่ยนเดือน ===
    useEffect(() => {
        const newData = generateMonthlyData(2023, selectedMonth);
        setWorkData(newData);
    }, [selectedMonth]);

    // === คำนวณสรุปจากข้อมูลจริง ===
    useEffect(() => {
        let ontime = 0,
            late = 0,
            early = 0,
            ot = 0,
            absent = 0,
            holiday = 0;

        workData.forEach((d) => {
            if (d.holiday) holiday++;
            else if (d.absent) absent++;
            else if (d.status.includes("ตรงเวลา")) ontime++;
            else if (d.status.includes("สาย")) late++;
            else if (d.status.includes("ออกก่อน")) early++;
            else if (d.status.includes("OT")) ot++;
        });

        setSummary({
            ontime,
            late,
            early,
            ot,
            absent,
            holiday,
            total: workData.length,
        });
    }, [workData]);

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
                    <img
                        src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.6435-9/66432336_2341250949495752_6935145544675229696_n.jpg"
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

                {/* ✅ ช่องเลือกเดือน */}
                <div className="month-select">
                    <label>เลือกเดือน: </label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        <option value="1">มกราคม</option>
                        <option value="2">กุมภาพันธ์</option>
                        <option value="3">มีนาคม</option>
                        <option value="4">เมษายน</option>
                        <option value="5">พฤษภาคม</option>
                        <option value="6">มิถุนายน</option>
                        <option value="7">กรกฎาคม</option>
                        <option value="8">สิงหาคม</option>
                        <option value="9">กันยายน</option>
                        <option value="10">ตุลาคม</option>
                        <option value="11">พฤศจิกายน</option>
                        <option value="12">ธันวาคม</option>
                    </select>
                </div>

                {/* กรอบสรุป */}
                <section className="time-dashboard">
                    <div className="time-summary">
                        <div className="summary-card combo">
                            <h4>มาทำงาน</h4>
                            <div className="present-grid">
                                <div className="present-section left">
                                    <h5>Entry</h5>
                                    <p>เข้างานตรงเวลา {summary.ontime} วัน</p>
                                    <p>เข้าสาย {summary.late} วัน</p>
                                </div>
                                <div className="present-section right">
                                    <h5>Exit</h5>
                                    <p>ออกก่อนเวลา {summary.early} วัน</p>
                                    <p>ทำ OT {summary.ot} วัน</p>
                                </div>
                            </div>
                        </div>

                        <div className="summary-card orange">
                            <h4>วันลา</h4>
                            <p>0</p>
                        </div>
                        <div className="summary-card teal">
                            <h4>วันหยุดนักขัตฤกษ์</h4>
                            <p>{summary.holiday}</p>
                        </div>
                        <div className="summary-card red">
                            <h4>ขาดงาน</h4>
                            <p>{summary.absent}</p>
                        </div>
                        <div className="summary-card gray">
                            <h4>รวมทั้งหมด</h4>
                            <p>{summary.total} วัน</p>
                        </div>
                    </div>
                </section>

                {/* ===== ตาราง scroll ได้ ===== */}
                <div className="time-table scrollable">
                    <table>
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>เวลาเข้างาน</th>
                                <th>เวลาออกงาน</th>
                                <th>ชั่วโมงทำงาน</th>
                                <th>OT</th>
                                <th>สถานะ</th>
                                <th>หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workData.map((d, i) => (
                                <tr key={i}>
                                    {d.holiday ? (
                                        <td colSpan="7" className="holiday">
                                            {d.date} - วันหยุด
                                        </td>
                                    ) : d.absent ? (
                                        <td colSpan="7" className="absent">
                                            {d.date} - ขาดงาน
                                        </td>
                                    ) : (
                                        <>
                                            <td>{d.date}</td>
                                            <td>{d.entry}</td>
                                            <td>{d.exit}</td>
                                            <td>{d.hours}</td>
                                            <td>{d.ot}</td>
                                            <td>
                                                <span
                                                    className={`tag ${d.status.includes("สาย") || d.status.includes("ออกก่อน")
                                                        ? "late"
                                                        : d.status.includes("OT")
                                                            ? "ot"
                                                            : "ontime"
                                                        }`}
                                                >
                                                    {d.status}
                                                </span>
                                            </td>
                                            <td>-</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HRTimePage;
