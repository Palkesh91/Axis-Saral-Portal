import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style.css";

export default function EmployeeNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Navigate the user back to the login page
    navigate("/");
  };
  return (
    <div>
     <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="navbar-brand">LEARNING MANAGEMENT SYSTEM</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="container">
            <Link className="btn btn-primary" to="/newsfeed">
              <i class="fa-solid fa-bell"></i>
              Newsfeed
            </Link>
            <br></br>
            <Link className="btn btn-primary" to="/jobs">
              <i class="fa-solid fa-briefcase"></i>
              Jobs
            </Link>
            <br></br>
            <button className="btn btn-primary" onClick={handleLogout}>
            <i class="fa-solid fa-sign-out"></i>
            Logout
            </button>
            <Link className="btn btn-primary" to="/login">
              Profile
            </Link>
          </div>
        </div>
  </nav>
    </div>
  );
}
