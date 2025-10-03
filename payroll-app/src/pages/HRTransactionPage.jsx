import React, { useState } from "react";
import "./style/HRTransactionPage.css";

const initialData = [
  { code: "01", detail: "เงินเดือน", amount: 15000, income: 7500, deduction: 0 },
  { code: "32", detail: "เงินประกันสังคม", amount: 0, income: 0, deduction: 0 },
];

const HRTransactionPage = () => {
  const [transactions, setTransactions] = useState(initialData);

  const handleChange = (index, field, value) => {
    const newData = [...transactions];
    newData[index][field] = value;
    setTransactions(newData);
  };

  const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const totalIncome = transactions.reduce((sum, t) => sum + Number(t.income || 0), 0);
  const totalDeduction = transactions.reduce((sum, t) => sum + Number(t.deduction || 0), 0);
  const netPay = totalIncome - totalDeduction;

  return (
    <div className="transaction-page">
      <h2>Transaction Entry</h2>

      {/* Employee Info */}
      <div className="employee-info">
        <div>
          <label>รหัสพนักงาน:</label>
          <input type="text" value="1" readOnly />
        </div>
        <div>
          <label>ชื่อพนักงาน:</label>
          <input type="text" value="ขนิษฐ์ จักรงาน" readOnly />
        </div>
        <div>
          <label>ประเภทพนักงาน:</label>
          <input type="text" value="เงินเดือน @15,000.00 บาท" readOnly />
        </div>
        <div>
          <label>รหัสแผนก:</label>
          <input type="text" value="01-บัญชีการเงิน" readOnly />
        </div>
        <div>
          <label>ตำแหน่ง:</label>
          <input type="text" value="" readOnly />
        </div>
        <div>
          <label>งวดการจ่าย:</label>
          <input type="text" value="เดือนละ 2 ครั้ง (เดือนที่ 9 งวดที่ 2)" readOnly />
        </div>
      </div>

      {/* Transaction Table */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>รายละเอียด</th>
            <th>จำนวน</th>
            <th>รายได้</th>
            <th>รายการหัก</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={index}>
              <td>{t.code}</td>
              <td>{t.detail}</td>
              <td>
                <input
                  type="number"
                  value={t.amount}
                  onChange={(e) => handleChange(index, "amount", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={t.income}
                  onChange={(e) => handleChange(index, "income", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={t.deduction}
                  onChange={(e) => handleChange(index, "deduction", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="transaction-summary">
        <div>รวมจำนวนเงิน = {totalAmount.toFixed(2)}</div>
        <div>รวมรายได้ = {totalIncome.toFixed(2)}</div>
        <div>รวมรายการหัก = {totalDeduction.toFixed(2)}</div>
        <div>จ่ายเงินสุทธิ = {netPay.toFixed(2)}</div>
      </div>

      {/* Buttons */}
      <div className="transaction-buttons">
        <button className="btn confirm">ตกลง</button>
        <button className="btn cancel">ยกเลิก</button>
        <button className="btn exit">ออก</button>
      </div>
    </div>
  );
};

export default HRTransactionPage;
