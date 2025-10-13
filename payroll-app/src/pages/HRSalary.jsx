import React, { useMemo, useState, useEffect } from "react";
import "./style/SalaryDetailPage.css";
import "./style/EmployeeHomePage.css";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import payrollData from "../data/payrollData";
import {
    FaMoneyBillWave, FaUser, FaBuilding, FaChartBar,
    FaIdCard, FaUserTie, FaPrint, FaHistory, FaBell, FaExclamationCircle
} from "react-icons/fa";

const thMonthLabel = (ym) => {
    if (!ym || ym.length < 7) return "-";
    const [y, m] = ym.split("-").map(Number);
    const d = new Date(y, (m || 1) - 1, 1);
    return d.toLocaleDateString("th-TH", { month: "long" });
};

const buddhistYear = (y) => (y ? Number(y) + 543 : "");

const thb = (n) =>
    new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        maximumFractionDigits: 2,
    }).format(Number(n || 0));

const HRSalary = () => {
    const navigate = useNavigate();

    // หา employee
    const loggedInUser = (localStorage.getItem("username") || "").toLowerCase();
    const employee = useMemo(
        () =>
            employeesData.find(
                (e) => (e.username || "").toLowerCase() === loggedInUser
            ) || null,
        [loggedInUser]
    );

    const empCode = useMemo(
        () =>
            employee?.employeeCode
                ? employee.employeeCode
                : String(employee?.id || "").padStart(5, "0"),
        [employee]
    );
    const positionTitle = useMemo(
        () => (employee?.role === "hr" ? "ฝ่ายบุคคล (HR)" : "พนักงาน"),
        [employee]
    );

    // payroll ของพนักงาน
    const myPayrolls = useMemo(() => {
        const uname = employee?.username || "";
        return (payrollData || []).filter((p) => p.username === uname);
    }, [employee]);

    // เดือนทั้งหมดที่มีข้อมูล (YYYY-MM), เรียงใหม่ → เก่า
    const allMonths = useMemo(
        () => [...new Set(myPayrolls.map((p) => p.month))].sort().reverse(),
        [myPayrolls]
    );

    // ปีทั้งหมด (ใหม่ → เก่า)
    const yearOptions = useMemo(
        () => [...new Set(allMonths.map((m) => m.split("-")[0]))].sort().reverse(),
        [allMonths]
    );

    // ปี/เดือนที่เลือก
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    // ปีเริ่มต้น = ล่าสุด
    useEffect(() => {
        if (yearOptions.length && !selectedYear) setSelectedYear(yearOptions[0]);
    }, [yearOptions, selectedYear]);

    // เดือนของปีที่เลือก (ใหม่ → เก่า)
    const monthsForYear = useMemo(() => {
        if (!selectedYear) return [];
        return allMonths.filter((m) => m.startsWith(`${selectedYear}-`));
    }, [allMonths, selectedYear]);

    const monthsForYearWithAll = useMemo(
        () => ["ALL", ...monthsForYear],
        [monthsForYear]
    );

    useEffect(() => {
        if (!monthsForYear.length) return;
        if (!selectedMonth || !monthsForYear.includes(selectedMonth)) {
            setSelectedMonth(monthsForYear[0]);
        }
    }, [monthsForYear, selectedMonth]);

    const yearRows = useMemo(() => {
        if (!selectedYear) return [];
        return myPayrolls
            .filter((p) => (p.month || "").startsWith(`${selectedYear}-`))
            .sort((a, b) => b.month.localeCompare(a.month));
    }, [myPayrolls, selectedYear]);

    const yearTotals = useMemo(() => {
        return yearRows.reduce(
            (acc, r) => {
                const income =
                    (r.baseSalary || 0) + (r.allowance || 0) + (r.ot || 0) + (r.bonus || 0);
                const deduct =
                    (r.tax || 0) + (r.social || 0) + (r.provident || 0) + (r.otherDeduct || 0);
                acc.income += income;
                acc.deduct += deduct;
                acc.net += income - deduct;
                return acc;
            },
            { income: 0, deduct: 0, net: 0 }
        );
    }, [yearRows]);

    const pay = useMemo(() => {
        const empty = {
            baseSalary: 0, allowance: 0, ot: 0, bonus: 0,
            tax: 0, social: 0, provident: 0, otherDeduct: 0,
        };
        if (selectedMonth === "ALL") return empty;
        return myPayrolls.find((p) => p.month === selectedMonth) || empty;
    }, [myPayrolls, selectedMonth]);

    const incomeTotal =
        (pay.baseSalary || 0) + (pay.allowance || 0) + (pay.ot || 0) + (pay.bonus || 0);
    const deductTotal =
        (pay.tax || 0) + (pay.social || 0) + (pay.provident || 0) + (pay.otherDeduct || 0);
    const netPay = incomeTotal - deductTotal;

    const printPage = () => {
        // เพิ่มคลาสพิเศษตอนพิมพ์
        document.body.classList.add("print-mode");

        // หน่วงเวลานิดหนึ่งให้ CSS ทำงาน
        setTimeout(() => {
            window.print();

            // เอาคลาสออกหลังพิมพ์เสร็จ
            setTimeout(() => {
                document.body.classList.remove("print-mode");
            }, 500);
        }, 300);
    };

    if (!employee) return <div className="salary-container">❌ ไม่พบข้อมูลพนักงาน</div>;

    return (
        <div className="salary-container">
            {/* ===== Header แบบเดียวกับ EmployeeHomePage ===== */}
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

            {/* ===== ข้อมูลพนักงาน ===== */}
            <div className="employee-detail">
                <h3>ข้อมูลส่วนตัว</h3>

                <div className="emp-brief emp-brief-4">
                    <div className="col">
                        <div className="row-item"><FaIdCard /> <strong>รหัสพนักงาน:</strong> {empCode}</div>
                        <div className="row-item"><FaUser /> <strong>ชื่อ:</strong> {employee.name}</div>
                    </div>

                    <div className="col">
                        <div className="row-item"><FaBuilding /> <strong>แผนก:</strong> {employee.department}</div>
                        <div className="row-item"><FaUserTie /> <strong>ตำแหน่ง:</strong> {positionTitle}</div>
                    </div>

                    <div className="col">
                        <div className="row-item" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "nowrap" }}>

                            <strong>เดือน:</strong>
                            <select
                                className="month-select"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                style={{ marginLeft: ".5rem" }}
                            >
                                {monthsForYearWithAll.map((m) => (
                                    <option key={m} value={m}>
                                        {m === "ALL" ? "ทุกเดือน" : thMonthLabel(m)}
                                    </option>
                                ))}
                            </select>

                            <strong style={{ marginLeft: "1rem" }}>ปี:</strong>
                            <select
                                className="month-select"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{ marginLeft: ".5rem" }}
                            >
                                {yearOptions.map((y) => (
                                    <option key={y} value={y}>{buddhistYear(y)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col actions">
                        <button className="btn-export-outline" onClick={printPage}>
                            <FaPrint /> พิมพ์ / PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== รายละเอียดเงินเดือน ===== */}
            <div className="employee-detail">
                <h3>
                    {selectedMonth === "ALL"
                        ? `รอบเดือน: ทุกเดือน พ.ศ. ${buddhistYear(selectedYear)}`
                        : `รอบเดือน: ${thMonthLabel(selectedMonth)} ${buddhistYear(selectedYear)}`}
                </h3>

                {selectedMonth === "ALL" ? (
                    <>
                        <div className="grid-2">
                            {yearRows.map((r) => {
                                const income = (r.baseSalary || 0) + (r.allowance || 0) + (r.ot || 0) + (r.bonus || 0);
                                const deduct = (r.tax || 0) + (r.social || 0) + (r.provident || 0) + (r.otherDeduct || 0);
                                const net = income - deduct;
                                return (
                                    <div className="card-section" key={r.month}>
                                        <div className="section-head">{thMonthLabel(r.month)}</div>
                                        <div className="row"><span>เงินเดือนพื้นฐาน</span><strong>{thb(r.baseSalary)}</strong></div>
                                        <div className="row"><span>ค่าตำแหน่ง/สวัสดิการ</span><strong>{thb(r.allowance)}</strong></div>
                                        <div className="row"><span>OT</span><strong>{thb(r.ot)}</strong></div>
                                        <div className="row"><span>โบนัส</span><strong>{thb(r.bonus)}</strong></div>
                                        <div className="row total"><span>รวมรายรับ</span><strong>{thb(income)}</strong></div>

                                        <div className="row" style={{ marginTop: ".5rem" }}><span>ภาษีหัก ณ ที่จ่าย</span><strong>{thb(r.tax)}</strong></div>
                                        <div className="row"><span>ประกันสังคม</span><strong>{thb(r.social)}</strong></div>
                                        <div className="row"><span>กองทุนสำรองเลี้ยงชีพ</span><strong>{thb(r.provident)}</strong></div>
                                        <div className="row"><span>อื่น ๆ</span><strong>{thb(r.otherDeduct)}</strong></div>
                                        <div className="row total"><span>รวมรายการหัก</span><strong>{thb(deduct)}</strong></div>

                                        <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.06)", marginTop: ".5rem", paddingTop: ".5rem" }}>
                                            <span><strong>สุทธิ</strong></span><strong>{thb(net)}</strong>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="netpay" style={{ marginTop: "1rem" }}>
                            <div>
                                <div><strong>รวมรายรับทั้งปี</strong></div>
                                <div>{thb(yearTotals.income)}</div>
                            </div>
                            <div>
                                <div><strong>รวมรายการหักทั้งปี</strong></div>
                                <div>{thb(yearTotals.deduct)}</div>
                            </div>
                            <div>
                                <div><strong>ยอดรับสุทธิทั้งปี</strong></div>
                                <div className="netpay-amount">{thb(yearTotals.net)}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid-2">
                            <div className="card-section">
                                <div className="section-head">รายรับ</div>
                                <div className="row"><span>เงินเดือนพื้นฐาน</span><strong>{thb(pay.baseSalary)}</strong></div>
                                <div className="row"><span>ค่าตำแหน่ง/สวัสดิการ</span><strong>{thb(pay.allowance)}</strong></div>
                                <div className="row"><span>OT</span><strong>{thb(pay.ot)}</strong></div>
                                <div className="row"><span>โบนัส</span><strong>{thb(pay.bonus)}</strong></div>
                                <div className="row total"><span>รวมรายรับ</span><strong>{thb(incomeTotal)}</strong></div>
                            </div>

                            <div className="card-section">
                                <div className="section-head">รายการหัก</div>
                                <div className="row"><span>ภาษีหัก ณ ที่จ่าย</span><strong>{thb(pay.tax)}</strong></div>
                                <div className="row"><span>ประกันสังคม</span><strong>{thb(pay.social)}</strong></div>
                                <div className="row"><span>กองทุนสำรองเลี้ยงชีพ</span><strong>{thb(pay.provident)}</strong></div>
                                <div className="row"><span>อื่น ๆ</span><strong>{thb(pay.otherDeduct)}</strong></div>
                                <div className="row total"><span>รวมรายการหัก</span><strong>{thb(deductTotal)}</strong></div>
                            </div>
                        </div>

                        <div className="netpay">
                            <div>ยอดรับสุทธิ</div>
                            <div className="netpay-amount">{thb(netPay)}</div>
                        </div>
                    </>
                )}
            </div>

            {/* ===== PRINT LAYOUT (E-Payslip) ===== */}
            <div className="payslip-print">
                <div className="payslip-header">
                    <h2>บริษัท สายบริการสติ๊ก จำกัด</h2>
                    <h3>ใบแจ้งเงินได้อิเล็กทรอนิกส์</h3>
                </div>

                {/* ---------- ข้อมูลพนักงาน ---------- */}
                <table className="emp-table">
                    <tbody>
                        <tr>
                            <th>รหัสพนักงาน</th>
                            <td>{empCode}</td>
                            <th>ชื่อพนักงาน</th>
                            <td>{employee.name}</td>
                            <th>ประเภทพนักงาน</th>
                            <td>เงินเดือน</td>
                            <th>ตำแหน่งงาน</th>
                            <td>{positionTitle}</td>
                        </tr>
                        <tr>
                            <th>รหัสแผนก</th>
                            <td>01</td>
                            <th>ชื่อแผนก</th>
                            <td>{employee.department}</td>
                            <th>งวดที่</th>
                            <td>1/1</td>
                            <th>งวดเดือน/ปี</th>
                            <td>{thMonthLabel(selectedMonth)} {buddhistYear(selectedYear)}</td>
                        </tr>
                        <tr>
                            <th>วันที่จ่ายเงิน</th>
                            <td colSpan="7">10/{selectedMonth?.slice(5) || "07"}/{buddhistYear(selectedYear)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* ---------- ตารางรายได้ / รายหัก ---------- */}
                <table className="pay-table">
                    <thead>
                        <tr>
                            <th colSpan="2">รายได้</th>
                            <th colSpan="2">รายการหัก</th>
                        </tr>
                        <tr>
                            <th>จำนวน</th>
                            <th>จำนวนเงิน</th>
                            <th>รายการ</th>
                            <th>จำนวนเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="center">30.00</td>
                            <td className="right">{thb(pay.baseSalary)}</td>
                            <td>ภาษีหัก ณ ที่จ่าย</td>
                            <td className="right">{thb(pay.tax)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="right">{thb(pay.allowance)}</td>
                            <td>เงินประกันสังคม</td>
                            <td className="right">{thb(pay.social)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="right">{thb(pay.ot)}</td>
                            <td>กองทุนสำรองเลี้ยงชีพ</td>
                            <td className="right">{thb(pay.provident)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="right">{thb(pay.bonus)}</td>
                            <td>อื่น ๆ</td>
                            <td className="right">{thb(pay.otherDeduct)}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="2" className="right">รวมรายได้</th>
                            <td colSpan="2" className="right">{thb(incomeTotal)}</td>
                        </tr>
                        <tr>
                            <th colSpan="2" className="right">รวมรายการหัก</th>
                            <td colSpan="2" className="right">{thb(deductTotal)}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* ---------- เงินสุทธิ ---------- */}
                <div className="netpay-box">
                    เงินรับสุทธิ: <strong>{thb(netPay)}</strong>
                </div>

                {/* ---------- ยอดสะสม ---------- */}
                <table className="summary-table">
                    <thead>
                        <tr><th colSpan="4" className="center">รายละเอียดยอดสะสม</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>รายได้สะสม</td><td className="right">303,339.00</td>
                            <td>เงินประกันสังคม</td><td className="right">5,250.00</td>
                        </tr>
                        <tr>
                            <td>ภาษีสะสม</td><td className="right">2,216.67</td>
                            <td>เงินสะสมกองทุนสำรองเลี้ยงชีพ</td><td className="right">0.00</td>
                        </tr>
                        <tr>
                            <td>ค่าเผื่ออื่น ๆ</td><td className="right">0.00</td>
                            <td colSpan="2"></td>
                        </tr>
                    </tbody>
                </table>

                {/* ---------- หมายเหตุ ---------- */}
                <div className="note">
                    <p><strong>หมายเหตุ:</strong></p>
                    <p>1. เอกสารนี้จัดทำขึ้นจากระบบอิเล็กทรอนิกส์ หากข้อมูลไม่ถูกต้อง โปรดแจ้งฝ่ายทรัพยากรบุคคลภายใน 7 วัน</p>
                    <p>2. เพื่อความถูกต้อง บริษัทขอสงวนสิทธิ์ในการใช้เอกสารนี้กับราชการ</p>
                    <p>3. เอกสารนี้จัดพิมพ์อัตโนมัติ ไม่ต้องมีลายมือชื่อฝ่ายบัญชี</p>
                </div>
            </div>
        </div>
    );
};

export default HRSalary;
