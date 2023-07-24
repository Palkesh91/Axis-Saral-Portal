import React from "react";
import { Link } from "react-router-dom";
import "../Style.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
          <Link className="btn btn-primary" to="/">
              Home
            </Link>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/login">
              Employee
            </Link>
            <Link className="btn btn-primary" to="/login">
              Manager
            </Link>
            <Link className="btn btn-primary" to="/login">
              HR
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
