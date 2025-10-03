import React, { useState } from "react";
import { payrollData } from "../data/payrollData";

function SalaryHistoryPage({ user }) {
  const [filter, setFilter] = useState("");
  const salaries = payrollData.filter(
    (p) =>
      p.username === user.username &&
      (filter === "" || p.month.includes(filter))
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 ประวัติเงินเดือนย้อนหลัง</h2>
      <input
        type="month"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>เดือน</th>
            <th>จำนวนเงิน (บาท)</th>
          </tr>
        </thead>
        <tbody>
          {salaries.length > 0 ? (
            salaries.map((s) => (
              <tr key={s.id}>
                <td>{s.month}</td>
                <td>{s.amount.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">ไม่พบข้อมูล</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryHistoryPage;
