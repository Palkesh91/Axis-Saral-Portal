import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import HrSidebar from './HrSidebar';
import AdminSidebar from './AdminSidebar';

const AdminFeedbacks = () => {
    
     const[fbData,setFbData]=useState([]);
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     useEffect(()=>{
         employeeService.getAllFeedback()
         .then((res)=>{
         setFbData(res.data);
     })
        
     },[])


    

  return (
    <div>
    <AdminSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>

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
                 Reports/Feedbacks
                </button>
              </li>
            </ul>
          </nav>
        </div>
    {/*<button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> 
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllSh} >
       All StakeHolders
      </button> */}
        <table>
            <thead>
                <tr>
                <th>Feedback ID</th>
                <th>Feedback Type</th>
                <th>Description</th>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                </tr>
           </thead>
           <tbody>
            {
                     fbData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.fb_id}</td>
                          <td>{emp.type}</td>
                          <td>{emp.description}</td>
                          <td>{emp.emp.emp_id}</td>
                          <td>{emp.emp.name}</td>
                          <td>{emp.emp.email}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
    
       </div>
       </div>
  )
}

export default AdminFeedbacks