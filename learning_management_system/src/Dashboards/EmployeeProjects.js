import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import "../Style.css";
import axios from "axios";
import EmployeeService from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";

const EmployeeProjects = () => {

  const[projects,setProjects]=useState([]);
  const[showMyProjects,setshowMyProjects]=useState(true);
  const[showMyProjectDetails,setshowMyProjectDetails]=useState(false);
  const[showAllProjects,setShowAllProjects]=useState(false);
  const[projectId,setProjectId]=useState();
  const[projData,setProjdata]=useState([]);
  const[empData,setEmpdata]=useState([]);
  const[allProjData,setAllProjData]=useState([]);
  const employeeService=new EmployeeService();
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
       /* const token = localStorage.getItem("token");
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }; */
        const empId=localStorage.getItem("emp_id");

       // const response = await axios.get(
         // `http://localhost:8080/employee/getProjByEmp/${empId}`,
         // config
       // );
       employeeService.getProjByEmp(empId)
       .then((res)=>{
        console.log(res.data);
        setProjects(res.data);
       })
       // console.log(response.data);


      } catch (error) {
        console.log(error);
      }
    };


    fetchData();
  },[]);

  const handleMyProjects=()=>{
    setshowMyProjects(true);
    setshowMyProjectDetails(false);
    setShowAllProjects(false);
  }

  const handleAllProjects=()=>{
setShowAllProjects(true);
    setshowMyProjects(false);
    setshowMyProjectDetails(false);

    employeeService.getAllProjects()
    .then((res)=>{
      setAllProjData(res.data);
    })
  }

  const handleProjectDetails=(id)=>{

    setshowMyProjects(false);
    setshowMyProjectDetails(true);
    setShowAllProjects(false);
    //const newArray=patients.filter((patient)=>{return (patient.name.toLowerCase()===searchInput.toLowerCase())});
    const prodata=projects.filter((res)=>{
      return (res.project.proj_id === id)
    });
   // console.log(projData);
   setProjdata(prodata);
    //const empData=axios.get(`http://localhost:8080/employee/getEmpByProjId/${id}`)

    //console.log(empData);
    employeeService.getEmpByProjId(id).
    then((res)=>{
        console.log(res.data);
        setEmpdata(res.data.emp_list);
    });
   // setEmpdata(empData);
    
  }
  const handleGoBack=()=>{
    navigate("/employee");
  }

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

  return (
    <div>
    <EmployeeSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>

      {/*<div className="employee-container">
      <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i>}
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleMyProjects}>My Projects</button>
      <button className="btn btn-primary" onClick={handleAllProjects}>All Projects</button>
      </div>*/}
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
                  onClick={handleMyProjects}
                >
                  My Projects
                </button>
              </li>
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
                  onClick={handleAllProjects}
                >
                  All Projects
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>
      
      {/* {showMyProjects && (
            <>
        <table>
            <thead>
                <tr>
                <th>Project ID</th>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Manager ID</th>
                <th>Manager Name</th>
                <th>Manager MailId</th>
                <th>Hr Id</th>
                <th>Hr Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                     projects.map(project=>(
                      <tr key={project.id}>
                          <td>{project.project.proj_id}</td>
                          <td>{project.project.title}</td>
                          <td>{project.project.description}</td>
                          <td>{project.project.manager.emp_id}</td>
                          <td>{project.project.manager.name}</td>
                          <td>{project.project.manager.email}</td>
                          <td>{project.project.hr.emp_id}</td>
                          <td>{project.project.hr.name}</td>
                          <td>{project.project.startDate}</td>
                          <td>{project.project.endDate}</td>
                          <td>{project.project.status}</td>
                          <td>
                          <button className="btn btn-success" onClick={()=>handleProjectDetails(project.project.proj_id)}>View Details</button>
                          </td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}
          */}
          {showMyProjects && (
            <>
            <div style={{display:"flex",flexDirection:"column"}}>{
              
                     projects.map(project=>(
                      <div style={{backgroundColor:"#f1f1f1",padding:"20px",borderRadius:"8px",marginBottom:"20px",
                      boxShadow:"0 2px 4px rgba(0,0,0,0.1)",width:"700px",marginLeft:"300px"}} key={project.id}>

                          <h3><strong>Project Name : </strong>{project.project.title}</h3>
                          <p><strong>Project Description : </strong>{project.project.description}</p>
                          <div>
                          <p><strong>Manager Name : </strong>{project.project.manager.name}</p>
                          <p><strong>Manager Email : </strong>{project.project.manager.email}</p>
                          <p><strong>Hr Name : </strong>{project.project.hr.name}</p>
                          <p><strong>Hr Email : </strong>{project.project.hr.email}</p>
                          <p><strong>Stakeholder : </strong>{project.project.stakeHolder.name}</p>
                          <p><strong>Stakeholder Email: </strong>{project.project.stakeHolder.email}</p>
                          <p><strong>Owner : </strong>{project.project.owner.name}</p>
                          <p><strong>Owner Mail : </strong>{project.project.owner.email}</p>
                          <p><strong>Start Date : </strong>{project.project.startDate}</p>
                          <p><strong>End Date : </strong>{project.project.endDate}</p>
                          <p><strong>Status : </strong>{project.project.status}</p>
                          <div style={{display:"flex",alignContent:"flex-start",justifyContent:"space-evenly"}}>
                          <button className="btn btn-primary" onClick={handleSop}>View SOP
                          <i className='fa-solid fa-download'></i>
                          </button> 
                          <button className="btn btn-success" onClick={()=>handleProjectDetails(project.project.proj_id)}>View Details
                          <i className='fa-solid fa-eye'></i>
                          </button>
                          </div>
                          </div>
                        </div>
                  ))           
            }
          </div>
        </>
       )}
       {showMyProjectDetails && (
            <>
            <h3>Project Details</h3>
        <table>
            <thead>
                <tr>
                <th>Project ID</th>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Manager ID</th>
                <th>Manager Name</th>
                <th>Manager MailId</th>
                <th>Hr Id</th>
                <th>Hr Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     projData.map(pro=>(
                      <tr key={pro.id}>
                          <td>{pro.project.proj_id}</td>
                          <td>{pro.project.title}</td>
                          <td>{pro.project.description}</td>
                          <td>{pro.project.manager.emp_id}</td>
                          <td>{pro.project.manager.name}</td>
                          <td>{pro.project.manager.email}</td>
                          <td>{pro.project.hr.emp_id}</td>
                          <td>{pro.project.hr.name}</td>
                          <td>{pro.project.startDate}</td>
                          <td>{pro.project.endDate}</td>
                          <td>{pro.project.status}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        <h3>Employees Details</h3>
        <table>
            <thead>
                <tr>
                <th>Serial NO</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
                <th>Contact</th>
                </tr>
           </thead>
           <tbody>
            {
                     empData.map((emp,index)=>(
                      <tr key={index} >
                          <td>{index+1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}
     {/*  {showAllProjects && (
            <>
        <table>
            <thead>
                <tr>
                <th>Project ID</th>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Manager Name</th>
                <th>Manager MailId</th>
                <th>Hr Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     allProjData.map(project=>(
                      <tr key={project.id}>
                          <td>{project.proj_id}</td>
                          <td>{project.title}</td>
                          <td>{project.description}</td>
                          <td>{project.manager.name}</td>
                          <td>{project.manager.email}</td>            
                          <td>{project.hr.name}</td>
                          <td>{project.startDate}</td>
                          <td>{project.endDate}</td>
                          <td>{project.status}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
          )}  */}
          {showAllProjects && (
            <>
            <div style={{display:"flex",flexDirection:"column"}}>{
              
                     allProjData.map(project=>(
                      <div style={{backgroundColor:"#f1f1f1",padding:"20px",borderRadius:"8px",marginBottom:"20px",
                      boxShadow:"0 2px 4px rgba(0,0,0,0.1)",width:"700px",marginLeft:"300px"}} key={project.id}>

                          <h3><strong>Project Name : </strong>{project.title}</h3>
                          <p><strong>Project Description : </strong>{project.description}</p>
                          <div>
                          <p><strong>Manager Name : </strong>{project.manager.name}</p>
                          <p><strong>Manager Email : </strong>{project.manager.email}</p>
                          <p><strong>Hr Name : </strong>{project.hr.name}</p>
                          <p><strong>Hr Email : </strong>{project.hr.email}</p>
                          <p><strong>Stakeholder : </strong>{project.stakeHolder.name}</p>
                          <p><strong>Stakeholder Email: </strong>{project.stakeHolder.email}</p>
                          <p><strong>Owner : </strong>{project.owner.name}</p>
                          <p><strong>Owner Mail : </strong>{project.owner.email}</p>
                          <p><strong>Start Date : </strong>{project.startDate}</p>
                          <p><strong>End Date : </strong>{project.endDate}</p>
                          <p><strong>Status : </strong>{project.status}</p>
                          </div>
                        </div>
                  ))           
            }
          </div>
        </>
       )}
    </div>
    </div>
  );
};

export default EmployeeProjects;
