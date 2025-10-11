import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import {
    FaUser,
    FaIdCard,
    FaMoneyBillWave,
    FaChartBar,
    FaHistory,
    FaExclamationCircle,
    FaBell,
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

    const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
    const employee = employeesData.find(
        (emp) => (emp.username || "").toLowerCase() === loggedInUser
    );

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

                {/* โปรไฟล์ด้านขวา */}
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
