import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
// import Swal from "sweetalert2";
import "./style/LoginPage.css";


function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const u = username.trim().toLowerCase();
    const p = password.trim();


    // ตรวจสอบ username / password โดยไม่ต้องเลือก role
    const user = employeesData.find(
      (emp) =>
        (emp.username || "").toLowerCase().trim() === u &&
        (emp.password || "").trim() === p
    );

    if (user) {
      setUser(user);
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);

      // ✅ ถ้ามี lastPath → ไปหน้านั้นเลย
      const lastPath = localStorage.getItem("lastPath");

      if (lastPath && lastPath !== "/") {
        navigate(lastPath, { replace: true });
      } else if (user.role.toLowerCase() === "hr") {
        navigate("/hr", { replace: true });
      } else {
        navigate("/employee", { replace: true });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>เข้าสู่ระบบ</h2>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
