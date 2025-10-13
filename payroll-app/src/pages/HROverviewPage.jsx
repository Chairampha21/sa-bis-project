import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { employeesData } from "../data/employeesData";
import {
    FaUser,
    FaIdCard,
    FaMoneyBillWave,
    FaChartBar,
    FaHistory,
    FaExclamationCircle,

    FaChartPie,
} from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import "./style/HROverviewPage.css";

const HROverviewPage = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState("1Y");

    // const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
    // const employee = employeesData.find(
    //     (emp) => (emp.username || "").toLowerCase() === loggedInUser
    // );

    const pieData = [
        { name: "เงินเดือนพนักงาน", value: 520000 },
        { name: "โบนัส", value: 150000 },
        { name: "เบี้ยขยัน", value: 50000 },
        { name: "OT", value: 50000 },
    ];

    const barData = [
        { month: "ต.ค. 2024", paid: 120000 },
        { month: "พ.ย. 2024", paid: 80000 },
        { month: "ธ.ค. 2024", paid: 95000 },
        { month: "ม.ค. 2025", paid: 110000 },
        { month: "ก.พ. 2025", paid: 130000 },
        { month: "มี.ค. 2025", paid: 135000 },
    ];

    const COLORS = ["#3498db", "#2ecc71", "#f1c40f", "#e67e22"];
    const totalExpense = pieData.reduce((sum, item) => sum + item.value, 0);
    const totalPaid = barData.reduce((sum, item) => sum + item.paid, 0);

    return (
        <div className="employee-home">
            {/* ===== Header ด้านบน ===== */}
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

            {/* ===== Main Overview Section ===== */}
            <div className="hr-overview-container">
                <h2 className="overview-title">ภาพรวมเงินเดือน</h2>

                <div className="period-select">
                    <label>ช่วงเวลา:</label>
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="1Y">1 ปี</option>
                        <option value="6M">6 เดือน</option>
                        <option value="3M">3 เดือน</option>
                        <option value="1M">1 เดือน</option>
                    </select>
                </div>

                <div className="chart-section">
                    {/* กราฟวงกลม */}
                    <div className="chart-card">
                        <h3>
                            <FaChartPie /> ค่าใช้จ่ายพนักงานตามหมวดหมู่
                        </h3>
                        <p className="total-text">
                            รวมทั้งหมด: {totalExpense.toLocaleString()} บาท
                        </p>
                        <PieChart width={360} height={300}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>

                    {/* กราฟแท่ง */}
                    <div className="chart-card">
                        <h3>
                            <FaChartBar /> ยอดชำระค่าใช้จ่ายพนักงาน
                        </h3>
                        <p className="total-text">
                            ยอดชำระแล้ว: {totalPaid.toLocaleString()} บาท
                        </p>
                        <BarChart width={500} height={300} data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="paid" fill="#3498db" name="ชำระแล้ว" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HROverviewPage;
