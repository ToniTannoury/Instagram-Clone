import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const logout = await fetch(`http://127.0.0.1:8000/api/user/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await logout.json();
    console.log(data);
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <div>
      <button onClick={handleLogout} className="logout-button">
        <span className="logout-icon">
          <FaSignOutAlt />
        </span>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
