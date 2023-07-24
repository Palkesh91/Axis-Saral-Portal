import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeService from '../Services/EmployeeService';
import "../Style.css";
import HrSidebar from './HrSidebar';
import EmployeeSidebar from './EmployeeSidebar';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeEditForm = () => {

    const {id}=useParams();
  const[employee,setEmployee]=useState([]);
  const employeeService=new EmployeeService();
  const navigate=useNavigate();

 useEffect(()=>{
    employeeService.getEmployeeById(id)
    .then((res)=>{
        setEmployee(res.data);
    })
 },[]);

  //const test=empData.filter((res)=>{return (res.emp_id==id)});
    //setTempData(test); 
    const nameChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.name=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }
    const emailChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.email=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }
    const passChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.password=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }
    const dobChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.date_of_birth=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }
    const genderChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.gender=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }
    const contactChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.contact=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }
    const addressChangeHandler=(event)=>{
        console.log(event.target.value)
       // setEmpName(event.target.value)
       employee.address=event.target.value;
       setEmployee((prevState)=>{
        return {...prevState,employee:event.target.value}
       })
    }


  const handleGoBack=()=>{
    const Role=localStorage.getItem('role')
    if(Role==="Manager"){
        navigate("/manager");
    }
    else if(Role==="Hr"){
        navigate("/hr");
    }else{
     navigate("/admin");
    }
    

  }

  function isValidEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    const crdate=new Date();
    const minDate=new Date(crdate.getFullYear()-22,crdate.getMonth(),crdate.getDate());
    const enterDate=new Date(employee.date_of_birth);
    console.log(crdate);
    console.log(minDate);
    console.log(enterDate);

    if(!employee.name || !employee.email || !employee.password || !employee.date_of_birth || !employee.role || !employee.gender || !employee.salary || !employee.contact || !employee.address){
      //alert("Please Enter All Fields");
      toast.warning("Please Enter All Fields",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000,
      })
  }
  else if(enterDate>minDate){
    //alert("User should have minimum 22 years age");
    toast.warning("User should have minimum 22 years age",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
  }
  else if(!isValidEmail(employee.email)){
    //alert("Enter a valid mail");
    toast.warning("Enter a valid mail",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
  }
  else if(employee.password.length<8){
    //alert("please enter password with minimum 8 characters");
    toast.warning("please enter password with minimum 8 characters",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
  }
  else if(employee.contact.length<10){
    //alert("please enter contact with minimum 10 digits");
    toast.warning("please enter contact with minimum 10 digits",{
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000,
    })
  }
   else{
   employeeService.updateEmployee(id,
    employee.name,
    employee.email,
    employee.password,
    employee.role,
    employee.date_of_birth,
    employee.gender,
    employee.salary,
    employee.address,
    employee.contact,
   )
    .then((res)=>{
       const empId=localStorage.getItem('emp_id')
       const role=localStorage.getItem('role')
       
        //alert("Updated succesfully");
        toast.success("Updated succesfully",{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        })
        console.log(res.data);
    }).catch(error=>{
      //alert("Email/Contact already exists");
      toast.error("Email/Contact already exists",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000,
      })
    })
  }

  }
  return (
    <div>
    <EmployeeSidebar/>
   
    <div className="cont" style={{marginLeft:"200px",backgroundColor:"white"}}>


      {/*<button onClick={handleGoBack} style={{marginLeft:"30px"}} id="button-addon2" type='button' className='btn btn-primary' >
        <i className="fas fa-paper-plane"></i>
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>  */}
        <br></br>
        <br></br>
        <ToastContainer/>
        {/*<h3 className='text-center'>Edit Employee</h3>
        <div className="employee-container" style={{justifyContent:"center"}}>
        <div className='d-flex justify-content-center align-items-center 100-w' >
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label>Name</label>
            <input type="text"  class="form-control" placeholder="Enter Name" required value={employee.name} onChange={nameChangeHandler}
             />
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input type="email"  class="form-control" placeholder="Enter Email" required value={employee.email} onChange={emailChangeHandler}
             />
          </div>
         {/*} <div className='mb-2'>
            <label>Password</label>
            <input type="password"  class="form-control" placeholder="Enter password" required value={employee.password} onChange={passChangeHandler}
             />
  </div>}
          <div className='mb-2'>
            <label >Date Of Birth</label>
            <input type="date"  class="form-control" placeholder="Enter Date Of Birth" required value={employee.date_of_birth} onChange={dobChangeHandler}
             />
          </div>
          
          <div className='mb-2'>
            <label>Gender</label>
            <select type="text" class="form-control"  placeholder="Select Gender"required value={employee.gender} onChange={genderChangeHandler}>
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
          </div>
         <div className='mb-2'>
            <label >Contact</label>
            <input type="text"  class="form-control"  placeholder="Enter Contact" required value={employee.contact} onChange={contactChangeHandler}
            />
          </div>
          <div className='mb-2'>
            <label >Address</label>
            <input type="text"  class="form-control" placeholder="Enter Address" required value={employee.address} onChange={addressChangeHandler}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Update Employee</button>
          </div>
          </form>
          </div>
          </div>
      </div>*/}
      <div
          style={{
            position: "absolute",
            left: "40rem",
            width: "46rem",
            height: "55rem",
            backgroundColor: "#d5edfb",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignContent: "center",
            borderRadius: "20px",
            justifyContent: "center",
          }}
        >
          <h3 style={{ position: "absolute", top: "5rem" }}>Update Employee</h3>
          <form
            style={{
              position: "absolute",
              top: "5rem",
              left: "28rem",
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
              <div className="mb-2">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Name"
                  required
                  value={employee.name}
                  onChange={nameChangeHandler}
                />
              </div>
              <br />
              <div className="mb-2">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Email"
                  required
                  value={employee.email}
                  onChange={emailChangeHandler}
                />
              </div>
              <br />
              <div className="mb-2">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Enter Date Of Birth"
                  required
                  value={employee.date_of_birth}
                  onChange={dobChangeHandler}
                />
              </div>
              <br />
              <div className="mb-2">
                <label>Gender</label>
                <select
                  type="text"
                  class="form-control"
                  placeholder="Select Gender"
                  required
                  value={employee.gender}
                  onChange={genderChangeHandler}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <br />
              <div className="mb-2">
                <label>Contact</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Contact"
                  required
                  value={employee.contact}
                  onChange={contactChangeHandler}
                />
              </div>
              <br />
              <div className="mb-2">
                <label>Address</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Address"
                  required
                  value={employee.address}
                  onChange={addressChangeHandler}
                />
              </div>
              <br />
              <br />
              <div className="d-grid">
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
                  Update Employee
                </button>
              </div>
            </div>
          </form>
        </div>
        <br />
          </div>
          </div>
  )
}

export default EmployeeEditForm