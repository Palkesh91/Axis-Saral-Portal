import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import HrSidebar from './HrSidebar';
import EmployeeSidebar from './EmployeeSidebar';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeFeedback = () => {
  const[type,setType]=useState()
    const[description,setDescription]=useState();
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     


    const handleSubmit=(event)=>{
      event.preventDefault();
        if(!type || !description){
            //alert("Please enter all fields")
            toast.warning("Please enter all fields",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
        }else{
          const emp_id=localStorage.getItem('emp_id');
       employeeService.addFeedback(type,description,emp_id)
        .then((res)=>{
             console.log(res.data);
             //alert("Added Successfully");
             toast.success("Feedback/report sent",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
            setType('');
            setDescription('');
        })


        }
    }



    
  return (
    <div>
    <EmployeeSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>


   <br></br>
   <br></br>
   <ToastContainer/>
    <div className="employee-container">
    

    {/*</div>
        <h3 className='text-center'>Add Feedback</h3>
        <br></br>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='title'>Enter Type</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Type" required value={type} onChange={(event) => { setType(event.target.value); }}
             />
          </div>
          <br></br>
          <div className='mb-2' style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor='description'>Enter Description</label>
           {/* <input type="text"  class="form-control" id="Description" placeholder="Enter Description" required value={description} onChange={(event) => { setDescription(event.target.value); }}
             /> }
             <textarea required value={description} onChange={(event) => { setDescription(event.target.value); }} 
               placeholder="Enter Description" rows={8} cols={30}
             />
          </div> 
          <br></br>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Send Feedback</button>
          </div>
          </form>
  </div>*/}
  <div
              style={{
                position: "absolute",
                left: "40rem",
                width: "46rem",
                height: "40rem",
                backgroundColor: "#d5edfb",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignContent: "center",
                borderRadius: "20px",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <h3 style={{ position: "absolute", top: "5rem" }}>
                Add Feedback
              </h3>
              <form
                style={{
                  position: "absolute",
                  top: "5rem",
                  left: "23rem",
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
                    <div>
                      <label htmlFor="type">Type</label>
                      <input
                        type="text"
                        class="form-control"
                        id="Name"
                        placeholder="Enter Type"
                        required
                        value={type}
                        onChange={(event) => {
                          setType(event.target.value);
                        }}
                        style={{ width: "400px" }}
                      />
                    </div>
                    <br></br>
                    <div style={{display:"flex",flexDirection:"column"}}>
                      <label htmlFor="description">Description</label>
                      <textarea required value={description} onChange={(event) => { setDescription(event.target.value); }} 
                         placeholder="Enter Description" rows={8} cols={30}
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
                      Send Feedback
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
   
  </div>
  )
}


export default EmployeeFeedback