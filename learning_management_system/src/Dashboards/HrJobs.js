import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import HrSidebar from './HrSidebar';
import { ToastContainer, toast } from 'react-toastify';

const HrJobs= () => {
  const[job_role,setJobRole]=useState()
    const[description,setDescription]=useState();
    const[vacancies,setVacancies]=useState();
     const[showAllJob,setShowAllJob]=useState(true);
     const[showAddJob,setShowAddJob]=useState(false);
     const[JobData,setJobData]=useState([]);
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     useEffect(()=>{
         employeeService.getAllJobs()
         .then((res)=>{
         setJobData(res.data);
         console.log(res.data);
     })
        
     },[])


    const handleAllJob=()=>{
        setShowAllJob(true);
        setShowAddJob(false);
    }
    const handleAddJob=()=>{
        setShowAllJob(false);
        setShowAddJob(true);
    }

    const handleSubmit=()=>{
        if(!job_role || !description || !vacancies){
            //alert("Please enter all fields")
            toast.warning("Please enter all fields",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
        }else{
          const hr_id=localStorage.getItem('emp_id');
       employeeService.addJob(job_role,description,vacancies,hr_id)
        .then((res)=>{
             console.log(res.data);
             //alert("Added Successfully");
             toast.success("Added Successfully",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
        }).catch(error=>{
          toast.error(error,{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })

        })

        }
    }



    const handleGoBack=()=>{
      navigate("/hr");
    }
    
  return (
    <div>
    <HrSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>


    <ToastContainer/>
    {/*<div className="employee-container">
    <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllJob} >
       All Jobs
      </button>
      <button className="btn btn-primary" onClick={handleAddJob}>
        Add Jobs
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
                  onClick={handleAllJob}
                >
                  All Jobs
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
                  onClick={handleAddJob}
                >
                  Add Jobs
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>

    {/*{showAllJob && (
            <>
        <table>
            <thead>
                <tr>
                <th>Job ID</th>
                <th>Job Role</th>
                <th>Job Description</th>
                <th>Job Vacancies</th>
                <th>Added By Hr Id</th>
                <th>Hr Name</th>
                <th>Hr Email</th>
                </tr>
           </thead>
           <tbody>
            {
                     JobData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.job_id}</td>
                          <td>{emp.jobRole}</td>
                          <td>{emp.description}</td>
                          <td>{emp.vacancies}</td>
                          <td>{emp.hr.emp_id}</td>
                          <td>{emp.hr.name}</td>
                          <td>{emp.hr.email}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
          )} */}
          {showAllJob && (
            <>
        <div className='news-list' style={{gridTemplateColumns: "repeat(4, 1fr)"}}>
         {JobData.map((newsItem)=>(
            <div className="news-card" key={newsItem.id}>
                <div className='news-content'>
                <h4 style={{marginLeft:"90px"}}>HIRING</h4>
                    <img src='https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image2'/>
                    <h2 className='news-title'>{newsItem.jobRole}</h2>
                    <h4 className='news-description'>{newsItem.description}</h4>
                    <h4 className='news-description'>Vacancies:{newsItem.vacancies}</h4>
                </div>
                </div>
         ))}            
        </div>
        </>
       )}

{showAddJob && (
        <>
       {/* <h3 className='text-center'>Add Jobs</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='job role'>Job Role</label>
            <input type="text"  class="form-control" id="Job Role" placeholder="Enter JobRole" required value={job_role} onChange={(event) => { setJobRole(event.target.value); }}
             />
          </div>
          <br></br>
          <div className='mb-2'>
            <label htmlFor='description'>Description</label>
            <input type="text"  class="form-control" id="Description" placeholder="Enter Description" required value={description} onChange={(event) => { setDescription(event.target.value); }}
             />
          </div> 
          <br></br>
          <div className='mb-2'>
            <label htmlFor='vacancies'>Vacancies</label>
            <input type="text"  class="form-control" id="Vacancies" placeholder="Enter Vacancies" required value={vacancies} onChange={(event) => { setVacancies(event.target.value); }}
             />
          </div> 
          <br></br>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Add Job</button>
          </div>
          </form>
          </div>
       </div>*/}
       <div
              style={{
                position: "absolute",
                left: "40rem",
                width: "46rem",
                height: "42rem",
                backgroundColor: "#d5edfb",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignContent: "center",
                borderRadius: "20px",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <h3 style={{ position: "absolute", top: "2rem" }}>Add Jobs</h3>
              <form
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "24rem",
                }}
              >
                <br />
                <div
                  className="d-grid"
                  style={{
                    position: "relative",
                    right: "12rem",
                    top: "5rem",
                  }}
                >
                  <div className="d-grid">
                    <div className="mb-2">
                      <label htmlFor="job role">Job Role</label>
                      <input
                        type="text"
                        class="form-control"
                        id="Job Role"
                        placeholder="Enter JobRole"
                        required
                        value={job_role}
                        onChange={(event) => {
                          setJobRole(event.target.value);
                        }}
                        style={{ width: "350px" }}
                      />
                    </div>
                    <br></br>
                    <div className="mb-2" style={{display:"flex",flexDirection:"column"}}>
                      <label htmlFor="description">Description</label>
                      <textarea required value={description} onChange={(event) => { setDescription(event.target.value); }} 
                         placeholder="Enter Description" rows={8} cols={30}
                        />
                    </div>
                    <br></br>
                    <div className="mb-2">
                      <label htmlFor="vacancies">Vacancies</label>
                      <input
                        type="text"
                        class="form-control"
                        id="Vacancies"
                        placeholder="Enter Vacancies"
                        required
                        value={vacancies}
                        onChange={(event) => {
                          setVacancies(event.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <br />
                    <button
                      style={{
                        backgroundColor: "#118dda",
                        color: "white",
                        height: "60px",
                        border: "none",
                        borderRadius: "20px",
                        fontSize: "16px",
                      }}
                      onClick={handleSubmit}
                    >
                      Add Job
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </>
    )}
    </div>
    </div>
  )
}

export default HrJobs