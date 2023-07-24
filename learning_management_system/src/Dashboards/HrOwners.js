import React, { useEffect, useState } from 'react'
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import HrSidebar from './HrSidebar';

const HrOwners = () => {

   const[showAllOwn,setShowAllOwn]=useState(true);
   const[ownerData,setOwnerData]=useState([]);
   const employeeService=new EmployeeService();
   const navigate=useNavigate();


   useEffect(()=>{
       employeeService.getAllOwners()
       .then((res)=>{
       setOwnerData(res.data);
   })
      
   },[])


  const handleAllOwn=()=>{
      setShowAllOwn(true);
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
    <button className="btn btn-primary" onClick={handleAllOwn} >
     All owners
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
                  onClick={handleAllOwn}
                >
                  Owners
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>

  {showAllOwn && (
          <>
      <table>
          <thead>
              <tr>
              <th>Owner ID</th>
              <th>Owner Name</th>
              <th>Owner MailId</th>
              <th>Owner Contact</th>
              </tr>
         </thead>
         <tbody>
          {
                   ownerData.map(emp=>(
                    <tr key={emp.id}>
                        <td>{emp.o_id}</td>
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

export default HrOwners