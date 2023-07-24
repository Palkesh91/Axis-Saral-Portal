import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeNavbar from "./EmployeeNavbar";
import axios from "axios";
import EmployeeService from "../Services/EmployeeService";
import "../Style.css";
import { useNavigate } from "react-router-dom";
import Logo1 from "../images/gender/male.png";
import Logo2 from "../images/gender/female.png";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer, toast } from "react-toastify";

const AdminEmployees = () => {
  const [projects, setProjects] = useState([]);
  const[name,setName]=useState();
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[date_of_birth,setdateOfBirth]=useState();
  const[role,setRole]=useState();
  const[gender,setGender]=useState();
  const[salary,setSalary]=useState();
  const[address,setAddress]=useState();
  const[contact,setContact]=useState();
  const [employee, setEmployee] = useState(null);
  const[showAllEmp,setShowAllEmp]=useState(true);
  const[showAddEmp,setshowAddEmp]=useState(false);
  const[showIndEmp,setshowIndEmp]=useState(false);
  const[tempData,setTempData]=useState([]);
  const[empData,setempData]=useState([]);
  const[empId,setEmpId]=useState(); // Add employee state
  const [loading, setLoading] = useState(true);

  const[searchInput,setSearchInput]=useState('');
  const[showSearch,setShowSearch]=useState('');
  const[searchData,setSearchData]=useState('');

  const employeeService=new EmployeeService();
  const navigate=useNavigate();
  
  useEffect(()=>{
   
    employeeService.getAllEmployees()
    .then((res)=>{
     console.log(res.data);
     setempData(res.data);
    })

    
  }, []);


  const handleAllEmp=()=>{
    setShowAllEmp(true);
    setshowAddEmp(false);
    setshowIndEmp(false);
    setShowSearch(false);
  }

  const handleAddEmp=()=>{
    setshowAddEmp(true);
    setShowAllEmp(false);
    setshowIndEmp(false);
    setShowSearch(false);
  }
 
  const handleEmpDetails=(id)=>{
    setshowIndEmp(true);
    setshowAddEmp(false);
    setShowAllEmp(false);
    setShowSearch(false);
    const temp= empData.filter((res)=>{return (res.emp_id===id)});
      setTempData(temp);
  }

  function isValidEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(date_of_birth);
    console.log(role);
    console.log(salary);
    console.log(gender);
    console.log(address);
    console.log(contact);

    const crdate=new Date();
    const minDate=new Date(crdate.getFullYear()-22,crdate.getMonth(),crdate.getDate());
    const enterDate=new Date(date_of_birth);
    console.log(crdate);
    console.log(minDate);
    console.log(enterDate);

  if(!name || !email || !password || !date_of_birth || !role || !gender || !salary || !contact || !address){
    toast.warning("Please Enter All Fields",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
     // alert("Please Enter All Fields");
  }
  else if(enterDate>minDate){
    //alert("User should have minimum 22 years age");
    toast.warning("User should have minimum 22 years age",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })

  }
  else if(!isValidEmail(email)){
   // alert("Enter a valid mail");
   toast.warning("Enter a valid mail",{
    position:toast.POSITION.TOP_RIGHT,
    autoClose:3000,
  })
  }
  else if(password.length<8){
    //alert("please enter password with minimum 8 characters");
    toast.warning("please enter password with minimum 8 characters",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
  }
  else if(contact.length<10){
   // alert("please enter contact with minimum 10 digits");
   toast.warning("please enter contact with minimum 10 digits",{
    position:toast.POSITION.TOP_RIGHT,
    autoClose:3000,
  })


  }
   else{
        employeeService.register(name,email,password,date_of_birth,role,gender,salary,contact,address)
        .then((res)=>{
          if(res.status===400){
            return new Error(res.message);
          }
          else{
            console.log(res.data);
            toast.success("Sucessfully Added",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
            setName('');
            setEmail('');
            setPassword('');
            setdateOfBirth('');
            setRole('');
            setSalary('');
            setGender('');
            setAddress('');
            setContact('');
          }
          
        }).catch(error=>{
          //alert("Contact/Email already exists");
          toast.error("Contact/Email already exists",{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })

        })
    }

  }

  const handleGoBack=()=>{
    navigate("/admin");
  }

  const handleEdit=(emp)=>{
    setEmployee(emp);
    navigate(`/admin/editform/${emp.emp_id}`)
  }


  const handleDelete=(id)=>{

    employeeService.deleteEmp(id)
    .then((res)=>{
      console.log(res.data);
      //alert("Updated Successfully")
      toast.success("Updated Successfully",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000,
      })
    })
  }

  const handleSearch=()=>{
    if(searchInput){
    const newArray=empData.filter((emp)=>{return (emp.name.toLowerCase().includes(searchInput.toLowerCase()))});
    console.log(newArray);
    if(newArray.length>0){
      setSearchData(newArray);
      setSearchInput('');
      setShowSearch(true);
      setshowIndEmp(false);
    setshowAddEmp(false);
    setShowAllEmp(false);
    }
    else{
      //alert("Please Enter a Valid Employee Name");
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
    <AdminSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>


      <ToastContainer/>
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
                  onClick={handleAllEmp}
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
                  onClick={handleAddEmp}
                >
                  Add Employee
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
      {/*<div className="employee-container">
      <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
        <button className="btn btn-primary" onClick={handleAllEmp} >
         All Employees
        </button>
        <button className="btn btn-primary" onClick={handleAddEmp}>
          Add Employee
        </button>
        <div className='Search-bar' style={{display:"flex",columnGap:"5px"}}>
        <input type='text' placeholder='Enter Employee Name' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}/>
        <button className='btn btn-success' onClick={handleSearch}>Search</button>
        </div>
  </div> */}

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
          )}  */}

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
                  <div style={{display:"flex",columnGap:"10px",justifyContent:"space-evenly"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    <div>
                    {emp.gender == "Male" ?
                    ( <img src={Logo1} className='news-image1'/> ) :
                    ( <img src={Logo2} className='news-image1'/> ) }
                    </div>
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
                
                <i className="fa-solid fa-eye" style={{cursor:"pointer"}} onClick={()=>{handleEmpDetails(emp.emp_id)}}/>
                
               
                <i className="fas fa-edit" style={{cursor:"pointer"}} onClick={()=>handleEdit(emp)}/>
                

                <i className="fa-solid fa-trash" style={{cursor:"pointer"}} onClick={()=>handleDelete(emp.emp_id)}/>
                
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
                     tempData.map(emp=>(
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

{showAddEmp && (
        <>
        {/*<h3 className='text-center'>Add Employee</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Name" required value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter Email" required value={email} onChange={(event) => { setEmail(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input type="password"  class="form-control" id="Password" placeholder="Enter password" required value={password} onChange={(event) => { setPassword(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='role'>Role</label>
             <select class="form-control" id="Role" placeholder="Enter Role" required value={role} onChange={(event) => { setRole(event.target.value); }}>
             <option value="">--Select Role--</option>
             <option value="Frontend Developer">Frontend Developer</option>
             <option value="Backend Developer">Backend Developer</option>
             <option value="Frontend Tester">Frontend Tester</option>
             <option value="Backend Tester">Backend Tester</option>
             <option value="DevOps">DevOps</option>
             <option value="Database Analyst">Database Analyst</option>
             <option value="QA">QA</option>
             <option value="Support">Support</option>
             <option value="Hr">HR</option>
             <option value="Manager">Manager</option>
             </select>
          </div>
          <div className='mb-2'>
            <label htmlFor='date_of_birth'>Date Of Birth</label>
            <input type="date"  class="form-control" id="Date of birth" placeholder="Enter Date Of Birth" required value={date_of_birth} onChange={(event) => { setdateOfBirth(event.target.value); }}
             />
          </div>
          </form>
          <form>
            <br></br>
            <br></br>
          <div className='mb-2'>
            <label htmlFor='gender'>Gender</label>
            <select type="text" class="form-control" id="Gender" placeholder="Select Gender"required value={gender} onChange={(event)=>{setGender(event.target.value)}}>
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor='salary'>Salary</label>
            <input type="text"  class="form-control" id="Salary" placeholder="Enter Salary" required value={salary} onChange={(event) => {setSalary(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="text"  class="form-control" id="Contact" placeholder="Enter Contact" required value={contact} onChange={(event) => {setContact(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='address'>Address</label>
            <input type="text"  class="form-control" id="Address" placeholder="Enter Address" required value={address} onChange={(event) => {setAddress(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Add Employee</button>
          </div>
          </form>
          </div>
</div> */}
             <div
                style={{
                  position: "absolute",
                  left: "30rem",
                  width: "66rem",
                  height: "41rem",
                  backgroundColor: "#d5edfb",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignContent: "center",
                  borderRadius: "20px",
                  justifyContent: "center",
                }}
              >
                <form
                  style={{ position: "absolute", top: "6rem", left: "10rem" }}
                >
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Name"
                      placeholder="Enter Name"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="Email"
                      placeholder="Enter Email"
                      required
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="name">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="Password"
                      placeholder="Enter password"
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="email">Role</label>
                    <select
                      class="form-control"
                      id="Role"
                      placeholder="Enter Role"
                      required
                      value={role}
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    >
                      <option value="">--Select Role--</option>
                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>
                      <option value="Backend Developer">
                        Backend Developer
                      </option>
                      <option value="Frontend Tester">Frontend Tester</option>
                      <option value="Backend Tester">Backend Tester</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Database Analyst">Database Analyst</option>
                      <option value="QA">QA</option>
                      <option value="Support">Support</option>
                      <option value="Hr">HR</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="name">DOB</label>
                    <input
                      type="date"
                      class="form-control"
                      id="Date of birth"
                      placeholder="Enter Date Of Birth"
                      required
                      value={date_of_birth}
                      onChange={(event) => {
                        setdateOfBirth(event.target.value);
                      }}
                    />
                  </div>
                </form>
                <br />
                <form
                  style={{
                    position: "absolute",
                    top: "6.3rem",
                    right: "14rem",
                  }}
                >
                  <div>
                    <label htmlFor="email">Gender</label>
                    <select
                      type="text"
                      class="form-control"
                      id="Gender"
                      placeholder="Select Gender"
                      required
                      value={gender}
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    >
                      <option value="">--Select Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="name">Salary</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Salary"
                      placeholder="Enter Salary"
                      required
                      value={salary}
                      onChange={(event) => {
                        setSalary(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="email">Contact</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Contact"
                      placeholder="Enter Contact"
                      required
                      value={contact}
                      onChange={(event) => {
                        setContact(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="email">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Address"
                      placeholder="Enter Address"
                      required
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <br />
                  <div
                    className="d-grid"
                    style={{
                      position: "relative",
                      right: "12rem",
                      top: "5rem",
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#118dda",
                        height: "60px",
                        border: "none",
                      }}
                      onClick={handleSubmit}
                    >
                      Add Employee
                    </button>
                  </div>
                </form>
              </div>
        </>
    )}
      <br />
    </div>
    </div>
  );
}

export default AdminEmployees;