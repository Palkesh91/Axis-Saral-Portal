import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeSidebar from './EmployeeSidebar';

const EmployeeJobs = () => {
    const employeeService=new EmployeeService();
    const[jobData,setJobData]=useState([]);
    const navigate=useNavigate();
   
  
    useEffect(()=>{
     
       employeeService.getAllJobs()
       .then((res)=>{
        console.log(res.data);
        setJobData(res.data);
       })
  
    },[])
  
  
    const handleGoBack=()=>{
       navigate("/employee");
    }
  
    return (
        <div>
        <EmployeeSidebar/>
       
        <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>
        
        {/*<button onClick={handleGoBack} style={{marginLeft:"30px"}} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> 
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>  */}
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
                 Job Vacancies
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>
        <div className='news-list' style={{gridTemplateColumns: "repeat(4, 1fr)"}}>
         {jobData.map((newsItem)=>(
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
         </div>
         </div>
    )
}

export default EmployeeJobs