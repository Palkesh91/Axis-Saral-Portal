import React, { useEffect, useState } from "react";
import axios from "axios";
import ManagerSidebar from "./ManagerSidebar";
import EmployeeService from "../Services/EmployeeService";
import HrSidebar from "./HrSidebar";
import EmployeeSidebar from "./EmployeeSidebar";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const employeeService = new EmployeeService();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empId= localStorage.getItem("emp_id");
        employeeService.getEmployeeById(empId).then((res) => {
          console.log(res.data);
          setEmployee(res.data);
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  /* <p class="text-muted font-size-sm">{employee.address}</p> */
  const handleSelfEdit=()=>{
    const empId= localStorage.getItem("emp_id");
    navigate(`/editform/${empId}`)
  }
  return (
    <div style={{overflowX:"hidden"}}>
      <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>
  
      <EmployeeSidebar />
      <div>
          <nav
            style={{
              height: "70px",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#2f4050",
            }}
          >
            <ul
              style={{
                position: "absolute",
                top: "12px",
                listStyle: "none",
                display: "flex",
              }}
            >
              <li style={{ marginRight: "20px" }}>
                <button
                  style={{
                    border: "none",
                    height: "40px",
                    width: "10rem",
                    backgroundColor: "#2f4050",
                    color: "white",
                    fontSize: "20px",
                  }}
                
                >
                 MY PROFILE
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br/>
     {/* <h2 class="profile">PROFILE</h2>
      {employee && (
        <>
          <div class="card" style={{left:"30rem"}}>
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  class="rounded-circle"
                  style={{ width: "150px" }}
                />
                <div class="mt-3">
                  <h4>{employee.name}</h4>
                  <p class="text-secondary mb-1">ID: {employee.emp_id}</p>
                  <p class="text-secondary mb-1">Role: {employee.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="details" style={{left:"40rem"}}>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{employee.name}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{employee.email}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {employee.contact}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Date of Birth</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {employee.date_of_birth}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{employee.gender}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {employee.address}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-12">
                      <a
                        class="btn btn-info "
                        onClick={handleSelfEdit}
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}*/}
      <div
        style={{
          position: "absolute",
          left: "22rem",
          top: "5rem",
          width: "80rem",
          height: "40rem",
          backgroundColor: "#E9F1FA",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          overflowX:"hidden",
          overflowY:"hidden",
          marginTop:"50px"
        }}
      >
        <h2
          class="profile"
          style={{ top: "3rem", position: "absolute", right: "3rem" }}
        >
          PROFILE
        </h2>
        {employee && (
          <>
            <div class="card" style={{ left: "10rem" }}>
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    class="rounded-circle"
                    style={{ width: "150px" }}
                  />
                  <div class="mt-3">
                    <h4>{employee.name}</h4>
                    <p class="text-secondary mb-1">ID: {employee.emp_id}</p>
                    <p class="text-secondary mb-1">{employee.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="details" style={{left:"20rem"}}>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Full Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{employee.name}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {employee.email}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Phone</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {employee.contact}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Date of Birth</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {employee.date_of_birth}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Gender</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {employee.gender}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Address</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {employee.address}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-12">
                        <a class="btn btn-info " onClick={handleSelfEdit}>
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      </div>
      </div>
  );
}

export default EmployeeProfile
