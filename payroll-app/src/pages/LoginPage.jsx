import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeesData } from "../data/employeesData";
import Swal from "sweetalert2"; // ✅ เพิ่มตรงนี้
import "./style/LoginPage.css";
 
function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    const u = username.trim().toLowerCase();
    const p = password.trim();
 
    const user = employeesData.find(
      (emp) =>
        (emp.username || "").toLowerCase().trim() === u &&
        (emp.password || "").trim() === p
    );
 
    if (user) {
      // ✅ ล็อกอินสำเร็จ
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ!",
        text: `ยินดีต้อนรับ ${user.username}`,
        timer: 1500,
        showConfirmButton: false,
      });
 
      setUser(user);
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);
 
      const lastPath = localStorage.getItem("lastPath");
      if (lastPath && lastPath !== "/") {
        navigate(lastPath, { replace: true });
      } else if (user.role.toLowerCase() === "hr") {
        navigate("/hr", { replace: true });
      } else {
        navigate("/employee", { replace: true });
      }
    } else {
      // ❌ username / password ผิด
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!",
        confirmButtonText: "ตกลง",
      });
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