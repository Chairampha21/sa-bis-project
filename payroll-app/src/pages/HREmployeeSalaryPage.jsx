import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/HREmployeeSalaryPage.css";
import { employeesData } from "../data/employeesData";
import {
  FaMoneyCheckAlt,
  FaUser,
  FaArrowLeft,
  FaSave,
  FaClock,
} from "react-icons/fa";

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
      data.push({ date: `${year}-${month}-${i} (${weekday})`, holiday: true });
    } else if (randomStatus === "ขาดงาน") {
      data.push({ date: `${year}-${month}-${i} (${weekday})`, absent: true });
    } else {
      data.push({
        date: `${year}-${month}-${i} (${weekday})`,
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

const HREmployeeSalaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employeesData.find((emp) => String(emp.id) === id);
  const empCode = employee.employeeCode || String(employee.id).padStart(5, "0");

  // ✅ เงินเดือน
  const [baseSalary, setBaseSalary] = useState(employee.baseSalary || 0);
  const [positionAllowance, setPositionAllowance] = useState(employee.positionAllowance || 0);
  const [ot, setOt] = useState(employee.ot || 0);
  const [bonus, setBonus] = useState(employee.bonus || 0);
  const [tax, setTax] = useState(employee.tax || 0);
  const [socialSecurity, setSocialSecurity] = useState(employee.socialSecurity || 0);
  const [fund, setFund] = useState(employee.fund || 0);
  const [otherDeduct, setOtherDeduct] = useState(employee.otherDeduct || 0);

  // ✅ แท็บ
  const [activeTab, setActiveTab] = useState("salary");

  // ✅ ข้อมูลเวลาทำงาน
  const [selectedMonth, setSelectedMonth] = useState(10);
  const [workData, setWorkData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const newData = generateMonthlyData(2023, selectedMonth);
    setWorkData(newData);
  }, [selectedMonth]);

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

  // ✅ เงินเดือน
  const totalIncome =
    Number(baseSalary) + Number(positionAllowance) + Number(ot) + Number(bonus);
  const totalDeduct =
    Number(tax) + Number(socialSecurity) + Number(fund) + Number(otherDeduct);
  const netSalary = totalIncome - totalDeduct;

  const handleSave = () => {
    alert(`✅ บันทึกข้อมูลสำเร็จ!\nเงินเดือนสุทธิ: ${netSalary.toLocaleString()} บาท`);
    navigate("/employeedetail");
  };

  return (
    <div className="salary-page">
      {/* ===== Header ===== */}
      <div className="title-bar">
        <button className="back-btn" onClick={() => navigate("/employeedetail")}>
          <FaArrowLeft /> กลับ
        </button>
        <h2>
          <FaMoneyCheckAlt className="title-icon" /> จัดการเงินเดือนพนักงาน
        </h2>
      </div>

      {/* ===== Employee Info ===== */}
      <div className="salary-employee-info">
        <div>
          <strong>ชื่อ-นามสกุล:</strong> {employee.name}
        </div>
        <div>
          <strong>รหัสพนักงาน:</strong> {empCode}
        </div>
        <div>
          <strong>แผนก:</strong> {employee.department}
        </div>
        <div>
          <strong>ตำแหน่ง:</strong> {employee.role === "hr" ? "ฝ่ายบุคคล (HR)" : "พนักงาน"}
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="tab-container">
        <button
          className={`tab-btn ${activeTab === "salary" ? "active" : ""}`}
          onClick={() => setActiveTab("salary")}
        >
          <FaUser /> ข้อมูลเงินเดือน
        </button>
        <button
          className={`tab-btn ${activeTab === "time" ? "active" : ""}`}
          onClick={() => setActiveTab("time")}
        >
          <FaClock /> ข้อมูลเวลาการทำงาน
        </button>
      </div>

      {/* ===== Content ===== */}
      <div className="salary-card">
        {activeTab === "salary" ? (
          <>
            {/* ----- ข้อมูลเงินเดือน ----- */}
            <div className="salary-section income">
              <h4>รายรับ</h4>
              <div className="salary-grid">
                <label>เงินเดือนพื้นฐาน</label>
                <input type="number" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />
                <label>ค่าตำแหน่ง / ค่าสวัสดิการ</label>
                <input type="number" value={positionAllowance} onChange={(e) => setPositionAllowance(e.target.value)} />
                <label>ค่าล่วงเวลา (OT)</label>
                <input type="number" value={ot} onChange={(e) => setOt(e.target.value)} />
                <label>เบี้ยขยัน (Bonus)</label>
                <input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} />
              </div>
              <div className="total-box">รวมรายรับ: <strong>{totalIncome.toLocaleString()} บาท</strong></div>
            </div>

            <div className="salary-section deduct">
              <h4>รายการหัก</h4>
              <div className="salary-grid">
                <label>ภาษีหัก ณ ที่จ่าย</label>
                <input type="number" value={tax} onChange={(e) => setTax(e.target.value)} />
                <label>ประกันสังคม</label>
                <input type="number" value={socialSecurity} onChange={(e) => setSocialSecurity(e.target.value)} />
                <label>กองทุนสำรองเลี้ยงชีพ</label>
                <input type="number" value={fund} onChange={(e) => setFund(e.target.value)} />
                <label>อื่น ๆ</label>
                <input type="number" value={otherDeduct} onChange={(e) => setOtherDeduct(e.target.value)} />
              </div>
              <div className="total-box deduct-box">รวมรายการหัก: <strong>{totalDeduct.toLocaleString()} บาท</strong></div>
            </div>

            <div className="net-salary">เงินเดือนสุทธิ: <span>{netSalary.toLocaleString()} บาท</span></div>
          </>
        ) : (
          <>
            {/* ----- ข้อมูลเวลาทำงาน ----- */}

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
                <h4>วันลา</h4><p>0</p>
              </div>
              <div className="summary-card teal">
                <h4>วันหยุดนักขัตฤกษ์</h4><p>{summary.holiday}</p>
              </div>
              <div className="summary-card red">
                <h4>ขาดงาน</h4><p>{summary.absent}</p>
              </div>
              <div className="summary-card gray">
                <h4>รวมทั้งหมด</h4><p>{summary.total} วัน</p>
              </div>
            </div>

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
                        <td colSpan="7" className="holiday">{d.date} - วันหยุด</td>
                      ) : d.absent ? (
                        <td colSpan="7" className="absent">{d.date} - ขาดงาน</td>
                      ) : (
                        <>
                          <td>{d.date}</td>
                          <td>{d.entry}</td>
                          <td>{d.exit}</td>
                          <td>{d.hours}</td>
                          <td>{d.ot}</td>
                          <td>
                            <span
                              className={`tag ${
                                d.status.includes("สาย") || d.status.includes("ออกก่อน")
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
          </>
        )}

      </div>
    </div>
  );
};

export default HREmployeeSalaryPage;
