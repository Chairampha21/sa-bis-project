import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import Swal from "sweetalert2";
import "./style/LoginPage.css";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // บังคับให้เลือกเอง จะไม่ล็อกเป็น employee โดยอัตโนมัติ
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const u = username.trim().toLowerCase();
    const p = password.trim();
    const r = (role || "").trim().toLowerCase();

    const user = employeesData.find(
      (emp) =>
        (emp.username || "").toLowerCase().trim() === u &&
        (emp.password || "").trim() === p &&
        (emp.role || "").toLowerCase().trim() === r
    );

    if (user) {
      setUser(user);

      // เก็บ username และ role ลง localStorage
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);

      const roleKey = (user.role || "").toLowerCase();
      if (roleKey === "hr") navigate("/hr", { replace: true });
      else if (roleKey === "employee") navigate("/employee", { replace: true });
      else {
        Swal.fire({ icon: "warning", title: "Role ไม่รองรับ", text: user.role });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลผิดพลาด",
        text: "โปรดตรวจสอบ Username, Password หรือ Role",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>โปรดเลือกตำแหน่ง</option>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
