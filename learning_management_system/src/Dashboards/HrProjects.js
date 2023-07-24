import React, { useEffect, useState } from 'react'
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import HrSidebar from './HrSidebar';

const HrProjects = () => {
    const[projData,setAllProjdata]=useState([]);
    const[showAllProj,setShowAllProj]=useState(true);
    const[showprojDetails,setShowprojDetails]=useState(false);
    const[indvProjData,setIndvProjData]=useState([]);
    const[indvEmpData,setIndvEmpData]=useState([]);
   const employeeService=new EmployeeService();
   const navigate=useNavigate();


   useEffect(()=>{
    employeeService.getAllProjects()
    .then((res)=>{
      setAllProjdata(res.data);
    })

   },[])


   const handleAllProjects=()=>{
    setShowAllProj(true);
    setShowprojDetails(false);
   }
   
   const handleGoBack=()=>{
    navigate("/hr");
  }

  const handleProjectDetails=(id)=>{
    
    //const newArray=patients.filter((patient)=>{return (patient.name.toLowerCase()===searchInput.toLowerCase())});
    const prodata=projData.filter((res)=>{
      return (res.proj_id === id)
    });
    console.log(prodata);
    setIndvProjData(prodata);
    //const empData=axios.get(`http://localhost:8080/employee/getEmpByProjId/${id}`)

    //console.log(empData);
    employeeService.getEmpByProjId(id).
    then((res)=>{
        console.log(res.data);
        setIndvEmpData(res.data.emp_list);
    });
    
    setShowAllProj(false);
    setShowprojDetails(true);

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
      <HrSidebar/>
     
      <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>
  
  
  
         {/* <div className="employee-container">
          <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
            <button className="btn btn-primary" onClick={handleAllProjects} >
             All Projects
            </button>
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
                  onClick={handleAllProjects}
                >
                  All Projects
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>

         {/* {showAllProj && (
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
                <th>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                     projData.map(project=>(
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
                          <td>
                          <button className="btn btn-success" onClick={()=>handleProjectDetails(project.proj_id)}>View Details</button>
                          </td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
          )} */}
           {showAllProj && (
            <>
            <div style={{display:"flex",flexDirection:"column"}}>{
              
                     projData.map(project=>(
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
                          <div style={{display:"flex",alignContent:"flex-start",justifyContent:"space-evenly"}}>
                          <button className="btn btn-primary" onClick={handleSop}>View SOP
                          <i className='fa-solid fa-download'></i>
                          </button> 
                          <button className="btn btn-success" onClick={()=>handleProjectDetails(project.proj_id)}>View Details
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


{showprojDetails && (
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
                     indvProjData.map(pro=>(
                      <tr key={pro.id}>
                          <td>{pro.proj_id}</td>
                          <td>{pro.title}</td>
                          <td>{pro.description}</td>
                          <td>{pro.manager.emp_id}</td>
                          <td>{pro.manager.name}</td>
                          <td>{pro.manager.email}</td>
                          <td>{pro.hr.emp_id}</td>
                          <td>{pro.hr.name}</td>
                          <td>{pro.startDate}</td>
                          <td>{pro.endDate}</td>
                          <td>{pro.status}</td>
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
                     indvEmpData.map((emp,index)=>(
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

        </div>
        </div>
  )
}

export default HrProjects