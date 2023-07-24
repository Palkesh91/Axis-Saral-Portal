import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../ManagerStyle.css";

const HrSidebar = () => {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // Redirect to login page
    } else {
      const fetchData = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const name = localStorage.getItem("username");

          const response1 = await axios.get(
            `http://localhost:9100/employee/Employee/getbyname/${name}`,
            config
          );
          console.log(response1.data);
          setEmployee(response1.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [navigate]);
  const empId=localStorage.getItem("emp_id");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  return (
    <div style={{ position: "relative", zIndex: 9999 }}>
      <nav id="sidebar" style={{ backgroundColor:"#2f4050", color: "white" }}>
        <div
          className="sidebar-header"
          style={{ backgroundColor: "#20b2aa", color: "white" }}
        >
          <h2 className="sidebar-heading">AXIS SARAL PORTAL</h2>
        </div>
        {employee && (
          <ul
            className="list-unstyled components"
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          > 
            <h4>{employee.name}'s</h4>
            <p>Dashboard</p>
            <li>
              <Link
                className="custom-link"
                to={"/hr"}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                  
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa fa-home"></li>
                Home
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={"/hrprofile"}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa-solid fa-user"></li>
                Profile
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/employees/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fas fa-users"></li>
                Employees
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/projects/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa-solid fa-diagram-project"></li>
                Projects
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/files/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa fa-upload"></li>
                Upload Files
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={"/hrdocuments"}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa-solid fa-file"></li>
                My Documents
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/stakeholders/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fas fa-users"></li>
                Stakeholders
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/owners/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fas fa-users"></li>
                Owners
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/newsfeed/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa-solid fa-newspaper"></li>
                NewsFeed
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={`/hr/jobs/${empId}`}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa-solid fa-briefcase"></li>
                Jobs
              </Link>
            </li>
            <li>
              <Link
                className="custom-link"
                to={"/"}
                onClick={handleLogout}
                style={{
                  backgroundColor: "#2f4050",
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  columnGap:"10px"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#293846";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4050")}
              >
                <li className="fa fa-sign-out"></li>
                Logout
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );

}

export default HrSidebar