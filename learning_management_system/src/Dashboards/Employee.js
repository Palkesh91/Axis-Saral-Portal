/*import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNavbar from "./EmployeeNavbar";
import { json, useNavigate } from "react-router-dom";
import '../Style.css';


const Employee = () => {
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState(null);
  const[empId,setEmpId]=useState(); // Add employee state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  /** 
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Navigate the user back to the login page
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const name = localStorage.getItem("username");

        const response1 = await axios.get(
          `http://localhost:8080/employee/Employee/getbyname/${name}`,
          config
        );
        console.log(response1.data);
        setEmployee(response1.data);
        setEmpId(response1.data.emp_id);
        localStorage.setItem("emp_id",response1.data.emp_id)
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    };


    fetchData();
  }, []);

  const handleProject = () => {
    navigate("/projects");
  };
  const handleEmployeeDetails = () => {
    navigate("/employeedetails");
  };
  const handleDocuments = () => {
    navigate("/employeedocuments");
  };

  

  return (
    <div >
      <EmployeeNavbar/>
      <br></br>
      <h2>Employee Dashboard</h2>
      <br></br>
      {loading ? (
        <p>Loading employee details...</p>
      ) : (
        <div>
          <h3>Welcome,{employee.name}</h3>
        </div>
      )}

      <div className="employee-container">
        <button className="btn btn-primary" onClick={handleProject}>
          Projects
        </button>
        <button className="btn btn-primary" onClick={handleEmployeeDetails}>
          Employee Details
        </button>
        <button className="btn btn-primary" onClick={handleDocuments}>
          My Documents
        </button>
      </div>
      <br />
    </div>
  );
};

export default Employee; */
/*
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeNavbar from "./EmployeeNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import EmployeeSidebar from "./EmployeeSidebar";

const Employee = () => {
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [empId, setEmpId] = useState(); // Add employee state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
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
        setEmpId(response1.data.emp_id);
        localStorage.setItem("emp_id", response1.data.emp_id);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
      
     <EmployeeSidebar/>
      <br></br>
      <div className="window"></div>
    </div>
  );
}; */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeNavbar from "./EmployeeNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import AdminSidebar from "./AdminSidebar";
import EmployeeService from "../Services/EmployeeService";
import EmployeeSidebar from "./EmployeeSidebar";

const Employee = () => {
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [empId, setEmpId] = useState(); // Add employee state
  const [loading, setLoading] = useState(true);
  const[proCount,setProCount]=useState();
  const[empCount,setEmpCount]=useState();
  const[shCount,setshCount]=useState();
  const[fbcount,setfbCount]=useState();
  const navigate = useNavigate();
  const employeeService=new EmployeeService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const procount=employeeService.getAllProjects()
        .then((res)=>{
          setProCount(res.data.length);
          console.log(res.data.length);
        })

        const empCount=employeeService.getAllEmployees()
        .then((res)=>{
          setEmpCount(res.data.length);
          console.log(res.data.length);
        })

        const shCount=employeeService.getAllStakeHolders()
        .then((res)=>{
          setshCount(res.data.length);
          console.log(res.data.length);
        })


        const name = localStorage.getItem("username");

        const response1 = await axios.get(
          `http://localhost:9100/employee/Employee/getbyname/${name}`,
          config
        );
        console.log(response1.data);
        setEmployee(response1.data);
        setEmpId(response1.data.emp_id);
        localStorage.setItem("emp_id", response1.data.emp_id);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSop=()=>{
    employeeService.getSop()
    .then((res)=>{
     const blob=new Blob([res.data],{type:'application/pdf'});
     //const blob=new Blob([res.data],{type:'application/pdf'});
     //const url=window.URL.createObjectURL(new Blob([blob.data]));
     const url=window.URL.createObjectURL(blob);
     const link=document.createElement('a');
    // link.download=url.replace(/^.*[\\\/]/,'')
     link.href=url;
     
     link.setAttribute('download',"SOP.pdf");
     //link.download=`file.${doc_type}`;
     document.body.appendChild(link);
     link.click();
     link.remove();
     window.URL.revokeObjectURL(url);
   

    })
   }

   const handleScd=()=>{

    employeeService.getScd()
    .then((res)=>{
     const blob=new Blob([res.data],{type:'application/pdf'});
     //const blob=new Blob([res.data],{type:'application/pdf'});
     //const url=window.URL.createObjectURL(new Blob([blob.data]));
     const url=window.URL.createObjectURL(blob);
     const link=document.createElement('a');
    // link.download=url.replace(/^.*[\\\/]/,'')
     link.href=url;
     
     link.setAttribute('download',"SCD.pdf");
     //link.download=`file.${doc_type}`;
     document.body.appendChild(link);
     link.click();
     link.remove();
     window.URL.revokeObjectURL(url);
   

    })

   }

   const handlePolicy=()=>{
    employeeService.getPolicy()
    .then((res)=>{
     const blob=new Blob([res.data],{type:'application/pdf'});
     //const blob=new Blob([res.data],{type:'application/pdf'});
     //const url=window.URL.createObjectURL(new Blob([blob.data]));
     const url=window.URL.createObjectURL(blob);
     const link=document.createElement('a');
    // link.download=url.replace(/^.*[\\\/]/,'')
     link.href=url;
     
     link.setAttribute('download',"Company Policies.pdf");
     //link.download=`file.${doc_type}`;
     document.body.appendChild(link);
     link.click();
     link.remove();
     window.URL.revokeObjectURL(url);
   

    })
   }

 

  return (
    <div>
      
     <EmployeeSidebar/>
      <br></br>
      <div
        className="window"
        style={{
          backgroundColor: "white",
          width: "1400px",
          height: "100%",
          position: "relative",
          left: "300px"
        }}
      >
        <div class="row" style={{ position: "relative", right: "10rem"}}>
          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card" style={{ width: "17rem" }}>
              <div class="card-block">
                <h6 class="m-b-20">No. Projects</h6>
                <h2 class="text-right">
                  <i class="fa fa-cart-plus f-left"></i>
                  <span>{proCount}</span>
                </h2>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card" style={{ width: "17rem" }}>
              <div class="card-block">
                <h6 class="m-b-20">No. Employees</h6>
                <h2 class="text-right">
                  <i class="fa fa-rocket f-left"></i>
                  <span>{empCount}</span>
                </h2>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card" style={{ width: "17rem" }}>
              <div class="card-block">
                <h6 class="m-b-20">No. StakeHolders</h6>
                <h2 class="text-right">
                  <i class="fa fa-refresh f-left"></i>
                  <span>{shCount}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <h1 style={{ position: "relative", top: "11rem", left: "10rem" }}>
         Important Documents
        </h1>
        <div
          class="row"
          style={{ position: "relative", top: "5rem", right: "10rem" }}
        >
          <div class="col-md-4 col-xl-3" onClick={handleSop}>
            <div class="card bg-c-white order-card" style={{ width: "17rem",cursor:"pointer" }}>
              <div class="card-block">
                <h6 class="m-b-20">SOP</h6>
                <h2 class="text-right">
                  <i class="fa-solid fa-file-arrow-down"></i>
                </h2>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3" onClick={handleScd}>
            <div class="card bg-c-white order-card" style={{ width: "17rem",cursor:"pointer" }}>
              <div class="card-block">
                <h6 class="m-b-20">SCD</h6>
                <h2 class="text-right">
                  <i class="fa-solid fa-file-arrow-down"></i>
                </h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xl-3" onClick={handlePolicy}>
            <div class="card bg-c-white order-card" style={{ width: "17rem",cursor:"pointer" }}>
              <div class="card-block">
                <h6 class="m-b-20">Policies</h6>
                <h2 class="text-right">
                  <i class="fa-solid fa-file-arrow-down"></i>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};
export default Employee; 
