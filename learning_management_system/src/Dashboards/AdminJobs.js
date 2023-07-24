import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import AdminSidebar from './AdminSidebar';
import { ToastContainer, toast } from 'react-toastify';

const AdminJobs= () => {
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
            toast.warning("Please Enter all fields",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
        }else{
          const hr_id=localStorage.getItem('emp_id');
       employeeService.addJob(job_role,description,vacancies,hr_id)
        .then((res)=>{
             console.log(res.data);
            // alert("Added Successfully");
            toast.success("Added Successfully",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
        }).catch(error=>{
          toast.warning("Already Exists",{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })

        })

        }
    }



    const handleGoBack=()=>{
      navigate("/admin");
    }
    
  return (
    <div>
    <AdminSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>



     <ToastContainer/>
    <div className="employee-container">
    <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> */}
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllJob} >
       All Jobs
      </button>
      <button className="btn btn-primary" onClick={handleAddJob}>
        Add Jobs
      </button>
    </div>

    {showAllJob && (
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
       )}

{showAddJob && (
        <>
        <h3 className='text-center'>Add Jobs</h3>
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
          </div>
        </>
    )}
    </div>
    </div>
  )
}

export default AdminJobs