import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';

const Jobs = () => {
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
        const Role=localStorage.getItem('role')
        if(Role==="Manager"){
            navigate("/manager");
        }
        else if(Role==="Hr"){
            navigate("/hr");
        }else if(Role=="Admin"){
         navigate("/admin");
        }
        else{
            navigate("/employee");
        }
    }
  
    return (
      <div>
        <EmployeeNavbar/>
        <h2 style={{marginTop:"30px"}}>Job Vacancies</h2>
        <button onClick={handleGoBack} style={{marginLeft:"30px"}} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> */}
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
        <br />
        <br />
        <br />
        <div className='news-list'>
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
    )
}

export default Jobs