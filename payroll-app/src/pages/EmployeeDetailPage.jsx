import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import { payrollData } from "../data/payrollData";

function EmployeeDetailPage() {
  const { username } = useParams();
  const employee = employeesData.find((e) => e.username === username);

  const [records, setRecords] = useState(
    payrollData.filter((p) => p.username === username)
  );

  const [newSalary, setNewSalary] = useState("");

  const handleAddSalary = () => {
    if (newSalary) {
      const newRecord = {
        id: payrollData.length + 1,
        username,
        month: new Date().toISOString().slice(0, 7),
        amount: parseFloat(newSalary),
      };
      setRecords([...records, newRecord]);
      setNewSalary("");
    }
  };

  if (!employee) {
    return <p>ไม่พบข้อมูลพนักงาน</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>รายละเอียดพนักงาน</h2>
      <p>👤 {employee.name}</p>
      <p>📂 แผนก: {employee.department}</p>

      <h3>ประวัติเงินเดือน</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>เดือน</th>
            <th>จำนวนเงิน (บาท)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.month}</td>
              <td>{r.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>เพิ่ม/แก้ไขเงินเดือน</h3>
      <input
        type="number"
        placeholder="จำนวนเงิน"
        value={newSalary}
        onChange={(e) => setNewSalary(e.target.value)}
      />
      <button onClick={handleAddSalary}>บันทึก</button>
    </div>
  );
}

export default EmployeeDetailPage;
