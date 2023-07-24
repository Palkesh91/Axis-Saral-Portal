import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import "../Style.css";
import EmployeeService from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";
import Logo1 from "../images/gender/male.png";
import Logo2 from "../images/gender/female.png";
import EmployeeSidebar from "./EmployeeSidebar";
import { ToastContainer, toast } from "react-toastify";


const EmployeeDetails = () => {
  const employeeService=new EmployeeService();
  const[showAllEmp,setShowAllEmp]=useState(true);
  const[showIndEmp,setShowIndEmp]=useState(false);
  const[showAllManager,setShowAllmanager]=useState(false);
  const[showIndMan,setShowIndman]=useState(false);
  const[showAllHr,setShowAllHr]=useState(false);
  const[showIndHr,setShowIndHr]=useState(false);
  const[empData,setempData]=useState([]);
  const[managerData,setManagerdata]=useState([]);
  const[hrData,setHrdata]=useState([]);
  const[temp,setTemp]=useState([]);

  const[searchInput,setSearchInput]=useState('');
  const[showSearch,setShowSearch]=useState('');
  const[searchData,setSearchData]=useState('');

  const navigate=useNavigate();
  

  useEffect(()=>{
   
     employeeService.getAllEmployees()
     .then((res)=>{
      //console.log(res.data);
      setempData(res.data);
     })

     employeeService.getAllManagers()
       .then((res)=>{
        setManagerdata(res.data);

       })

       employeeService.getAllHrs()
       .then((res)=>{
           setHrdata(res.data);
       })
  },[])

  const handleAllEmployees=()=>{
    setShowAllEmp(true);
    setShowAllmanager(false);
    setShowAllHr(false);
    setShowIndEmp(false);
    setShowIndman(false);
    setShowIndHr(false);
    setShowSearch(false);
  }



  const handleAllManagers=()=>{
    setShowAllmanager(true);
    setShowIndEmp(false);
    setShowAllHr(false);
    setShowAllEmp(false);
    setShowIndman(false);
    setShowIndHr(false);
    setShowSearch(false);

  }

  const handleAllHrs=()=>{
    setShowAllmanager(false);
    setShowIndEmp(false);
    setShowAllHr(true);
    setShowAllEmp(false);
    setShowIndman(false);
    setShowIndHr(false);
    setShowSearch(false);

  }

  const handleGoBack=()=>{
    navigate("/employee");
  }

  const handleEmpDetails=(id)=>{
    setShowAllEmp(false);
    setShowAllmanager(false);
    setShowAllHr(false);
    setShowIndEmp(true);
    setShowIndman(false);
    setShowIndHr(false);
    setShowSearch(false);
    console.log(id);
   const temp1= empData.filter((res)=>{return (res.emp_id===id)});
      setTemp(temp1);
  }

  const handleManDetails=(id)=>{
    setShowAllEmp(false);
    setShowAllmanager(false);
    setShowAllHr(false);
    setShowIndEmp(false);
    setShowIndman(true);
    setShowIndHr(false);
    setShowSearch(false);
    const temp2= empData.filter((res)=>{return (res.emp_id===id)});
      setTemp(temp2);
  }

  const handleHrDetails=(id)=>{
    setShowAllEmp(false);
    setShowAllmanager(false);
    setShowAllHr(false);
    setShowIndEmp(false);
    setShowIndman(false);
    setShowIndHr(true);
    setShowSearch(false);
    const temp3= empData.filter((res)=>{return (res.emp_id===id)});
      setTemp(temp3);

  }

  const handleSearch=()=>{
    if(searchInput){
    const newArray=empData.filter((emp)=>{return (emp.name.toLowerCase().includes(searchInput.toLowerCase()))});
    console.log(newArray);
    if(newArray.length>0){
      setSearchData(newArray);
      setSearchInput('');
      setShowSearch(true);
      setShowAllEmp(false);
      setShowAllmanager(false);
      setShowAllHr(false);
      setShowIndEmp(false);
      setShowIndman(false);
      setShowIndHr(false);
    }
    else{
      //alert("Please Enter a Valid Patient Name");
      toast.warning("Please Enter a Valid Employee Name",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000,
      })
      setSearchInput('');
    }
  }
  else{
    //alert("Please enter name");
    toast.warning("Please Enter a Name",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
  }
  }

  return (
    <div>
    <EmployeeSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>
        <ToastContainer/>
     {/*  <div className="employee-container">
      <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllEmployees}>All Employees Detail</button>
      <button className="btn btn-primary"onClick={handleAllManagers}>All Manager Details</button>
      <button className="btn btn-primary" onClick={handleAllHrs}>All Hr Details</button>
      <div className='Search-bar' style={{display:"flex",columnGap:"5px"}}>
        <input type='text' placeholder='Enter Employee Name' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}/>
        <button className='btn btn-success' onClick={handleSearch}>Search</button>
        </div>
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
                  onClick={handleAllEmployees}
                >
                  All Employees
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
                  onClick={handleAllManagers}
                >
                  All Managers
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
                  onClick={handleAllHrs}
                >
                  All HRs
                </button>
              </li>
              <li style={{ marginRight: "20px" }}>
                
                  <div className='Search-bar' style={{display:"flex",columnGap:"5px",border: "none",
                    height: "40px",
                    width: "10rem",
                    backgroundColor: "#2f4050",
                    color: "white",
                    fontSize: "20px",}}>
                 <input type='text' placeholder='Enter Employee Name' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}/>
                 <button className='btn btn-success' onClick={handleSearch}>Search</button>
                 </div>        
              </li>
            </ul>
          </nav>
        </div>
        <br></br>
    
    
            

     {/* {showAllEmp && (
            <>
        <table>
            <thead>
                <tr>
                <th>Employees ID</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                <th>Employee DOB</th>
                <th>Employee Gender</th>
                <th>Employee Role</th>
                <th>Employee Address</th>
                <th>Employee Contact</th>
                <th>Employee Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     empData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.date_of_birth}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.workingStatus}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
          )} */}

{showSearch && (
            <>
        <div className='news-list'>
         {searchData.map((emp)=>(
            <div className="news-card" key={emp.id} style={{width:"400px"}}>
                <div className='news-content'>
                    <div style={{display:"flex",justifyContent:"space-evenly",columnGap:"10px"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    {emp.gender == "Male" ?
                    ( <img src={Logo1} className='news-image1'/> ) :
                    ( <img src={Logo2} className='news-image1'/> ) }
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                    <h4 className='news-description'><strong>Id : </strong>{emp.emp_id}</h4>
                    <h4 className='news-description'><strong>Name : </strong>{emp.name}</h4>
                    <h4 className='news-description'><strong>Email : </strong>{emp.email}</h4>
                    <h4 className='news-description'><strong>Role : </strong>{emp.role} </h4>
                    <h4 className='news-description'><strong>Status : </strong>{emp.workingStatus}</h4>
                    </div>
                    </div>
                </div>
            </div>
         ))}            
        </div>
        </>
        
       )}

{showAllEmp && (
            <>
        <div className='news-list'>
         {empData.map((emp)=>(
            <div className="news-card" key={emp.id} style={{width:"400px"}}>
                <div className='news-content'>
                    <div style={{display:"flex",justifyContent:"space-evenly",columnGap:"10px"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    {emp.gender == "Male" ?
                    ( <img src={Logo1} className='news-image1'/> ) :
                    ( <img src={Logo2} className='news-image1'/> ) }
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                    <h4 className='news-description'><strong>Id : </strong>{emp.emp_id}</h4>
                    <h4 className='news-description'><strong>Name : </strong>{emp.name}</h4>
                    <h4 className='news-description'><strong>Email : </strong>{emp.email}</h4>
                    <h4 className='news-description'><strong>Role : </strong>{emp.role} </h4>
                    <h4 className='news-description'><strong>Status : </strong>{emp.workingStatus}</h4>
                    </div>
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                <button className="btn btn-success" onClick={()=>{handleEmpDetails(emp.emp_id)}}>
                <i className="fa-solid fa-eye"/>
                </button>
                </div>
            </div>
         ))}            
        </div>
        </>
          )}

  {/*{showAllManager && (
            <>
        <table>
            <thead>
                <tr>
                <th>Employees ID</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                <th>Employee DOB</th>
                <th>Employee Gender</th>
                <th>Employee Role</th>
                <th>Employee Address</th>
                <th>Employee Contact</th>
                <th>Employee Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     managerData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.date_of_birth}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.workingStatus}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
          )} */}
      {showAllManager && (
            <>
        <div className='news-list'>
         {managerData.map((emp)=>(
            <div className="news-card" key={emp.id} style={{width:"400px"}}>
                <div className='news-content'>
                    <div style={{display:"flex",justifyContent:"space-evenly",columnGap:"10px"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    {emp.gender == "Male" ?
                    ( <img src={Logo1} className='news-image1'/> ) :
                    ( <img src={Logo2} className='news-image1'/> ) }
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                    <h4 className='news-description'><strong>Id : </strong>{emp.emp_id}</h4>
                    <h4 className='news-description'><strong>Name : </strong>{emp.name}</h4>
                    <h4 className='news-description'><strong>Email : </strong>{emp.email}</h4>
                    <h4 className='news-description'><strong>Role : </strong>{emp.role} </h4>
                    <h4 className='news-description'><strong>Status : </strong>{emp.workingStatus}</h4>
                    </div>
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                <button className="btn btn-success" style={{float:"right"}} onClick={()=>{handleManDetails(emp.emp_id)}}>
                <i className="fa-solid fa-eye"/>
                </button>
                </div>
            </div>
         ))}            
        </div>
        </>
          )}

  {/*{showAllHr && (
            <>
        <table>
            <thead>
                <tr>
                <th>Employees ID</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                <th>Employee DOB</th>
                <th>Employee Gender</th>
                <th>Employee Role</th>
                <th>Employee Address</th>
                <th>Employee Contact</th>
                <th>Employee Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     hrData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.date_of_birth}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.workingStatus}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
          )} */}
          {showAllHr && (
            <>
        <div className='news-list'>
         {hrData.map((emp)=>(
            <div className="news-card" key={emp.id} style={{width:"400px"}}>
                <div className='news-content'>
                <div style={{display:"flex",justifyContent:"space-evenly",columnGap:"10px"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    {emp.gender == "Male" ?
                    ( <img src={Logo1} className='news-image1'/> ) :
                    ( <img src={Logo2} className='news-image1'/> ) }
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                    <h4 className='news-description'><strong>Id : </strong>{emp.emp_id}</h4>
                    <h4 className='news-description'><strong>Name : </strong>{emp.name}</h4>
                    <h4 className='news-description'><strong>Email : </strong>{emp.email}</h4>
                    <h4 className='news-description'><strong>Role : </strong>{emp.role} </h4>
                    <h4 className='news-description'><strong>Status : </strong>{emp.workingStatus}</h4>
                    </div>
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                <button className="btn btn-success" style={{float:"right"}} onClick={()=>{handleHrDetails(emp.emp_id)}}>
                <i className="fa-solid fa-eye"/>
                </button>
                </div>
            </div>
         ))}            
        </div>
        </>
          )}

{showIndEmp && (
            <>
        <table>
            <thead>
                <tr>
                <th>Employees ID</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                <th>Employee DOB</th>
                <th>Employee Gender</th>
                <th>Employee Role</th>
                <th>Employee Address</th>
                <th>Employee Contact</th>
                <th>Employee Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     temp.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.date_of_birth}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.workingStatus}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}


{showIndMan && (
            <>
        <table>
            <thead>
                <tr>
                <th>Employees ID</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                <th>Employee DOB</th>
                <th>Employee Gender</th>
                <th>Employee Role</th>
                <th>Employee Address</th>
                <th>Employee Contact</th>
                <th>Employee Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     temp.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.date_of_birth}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.workingStatus}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}

{showIndHr && (
            <>
        <table>
            <thead>
                <tr>
                <th>Employees ID</th>
                <th>Employee Name</th>
                <th>Employee MailId</th>
                <th>Employee DOB</th>
                <th>Employee Gender</th>
                <th>Employee Role</th>
                <th>Employee Address</th>
                <th>Employee Contact</th>
                <th>Employee Status</th>
                </tr>
           </thead>
           <tbody>
            {
                     temp.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.date_of_birth}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.role}</td>
                          <td>{emp.address}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.workingStatus}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}
      </div>
      
     </div>
      
  );
};

export default EmployeeDetails;
