import React, { useState } from "react";
import { employeesData } from "../data/employeesData";
import "./style/EmployeeListPage.css";
import { Link } from "react-router-dom";

function EmployeeListPage() {
  const [search, setSearch] = useState("");

  const filteredEmployees = employeesData.filter(
    (emp) =>
      emp.username.toLowerCase().includes(search.toLowerCase()) ||
      emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 รายชื่อพนักงานทั้งหมด</h2>
      <input
        type="text"
        placeholder="ค้นหาพนักงาน..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredEmployees.map((emp) => (
          <li key={emp.id}>
            {emp.name} ({emp.department}) -{" "}
            <Link to={`/hr/employee/${emp.username}`}>รายละเอียด</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeListPage;
