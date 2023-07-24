import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import HrSidebar from './HrSidebar';

const HrStakeholders = () => {
     const[showAllSh,setShowAllSh]=useState(true);
     const[showAddSh,setShowAddSh]=useState(false);
     const[shData,setShData]=useState([]);
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     useEffect(()=>{
         employeeService.getAllStakeHolders()
         .then((res)=>{
         setShData(res.data);
     })
        
     },[])


    const handleAllSh=()=>{
        setShowAllSh(true);
    }

    const handleGoBack=()=>{
        navigate("/hr");
      }

  return (
    <div>
    <HrSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>



    {/*<div className="employee-container">
    <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllSh} >
       All StakeHolders
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
                  onClick={handleAllSh}
                >
                  StakeHolders
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>

    {showAllSh && (
            <>
        <table>
            <thead>
                <tr>
                <th>StakeHolder ID</th>
                <th>StakeHolder Name</th>
                <th>StakeHolder MailId</th>
                <th>StakeHolder Contact</th>
                </tr>
           </thead>
           <tbody>
            {
                     shData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.sh_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
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

export default HrStakeholders