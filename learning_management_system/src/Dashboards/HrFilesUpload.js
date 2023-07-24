import React, { useEffect, useState } from 'react'
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmployeeService from '../Services/EmployeeService';
import HrSidebar from './HrSidebar';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';

const HrFilesUpload = () => {
    const[emp_id,setEmpId]=useState();
    const[empData,setempData]=useState([]);
    const[selectFile,setSelectFile]=useState(null);
    const[filename,setfilename]=useState();
    const navigate=useNavigate();
    const employeeService=new EmployeeService();

    useEffect(()=>{
      employeeService.getAllEmployees()
      .then((res)=>{
        setempData(res.data);
        console.log(res.data);
      })

    },[])

    const handleFileChange=(event)=>{
        setSelectFile(event.target.files[0]);
    }


    const handleSubmit=(event)=>{
      event.preventDefault();
        
        const id=emp_id;
        const name=filename;
        const formData=new FormData();
            formData.append('file',selectFile);
            console.log(formData);
            formData.forEach((value,key)=>{
                console.log(key,value);
            })
            if(!id || !filename || !selectFile){
              toast.warning("Please enter all fields",{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:3000,
              })

            }
            else{
         axios.post(`http://localhost:9100/employee/uploadFile/${id}/${name}`,formData,employeeService.getConfig())
           .then((res)=>{
             // alert("Uploaded Succesfully");
             toast.success("Uploaded Successfully",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
            setEmpId('');
            setSelectFile('');
            setfilename('');

          }) 
          .catch(error=>{
            console.error(error);
            toast.error(error,{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
          }
          )
        }
            
    }

    const handleGoBack=()=>{
        navigate("/hr");
      }


      const handleEmpChange=(selectedOption)=>{
        setEmpId(selectedOption.value);
        console.log(selectedOption.value);
    
    
    }
    
    const options=empData.map((emp)=>({
        value:emp.emp_id,
        label:`${emp.emp_id}`+" "+emp.name.toString(),
    }))
    
  return (
    <div>
      <HrSidebar/>
     
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
                
                >
                  Files Upload
                </button>
              </li>
            </ul>
          </nav>
        </div>
    {/*<div className="employee-container">
       {/* <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> 
        <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button> }
        </div>
        <h3 className='text-center'>Add Files for Employees</h3>
        <div className='d-flex justify-content-center align-items-center 100-w' style={{marginTop:"30px"}}>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='Emp Id'>Employee Id</label>
           {/* <input type="text"  class="form-control" id="Employee Id" placeholder="Enter Employee Id" required value={emp_id} onChange={(event) => { setEmpId(event.target.value); }}
             /> }
             <div className='dropdown-container'>
            {empData.length >0 ? (
            <Select  
               onChange={handleEmpChange}
               options={options}
                isSearchable={true}
                />
        ):(
           <p>Loading Employees</p>
        )}
            </div>
          </div>
          <br></br>
          <div className='mb-2'>
            <label htmlFor='file'>File</label>
            <input type="file"  class="form-control" id="File" placeholder="Choose File" onChange={handleFileChange}
             />
          </div> 
          <br></br>
          <div className='mb-2'>
            <label htmlFor='file name'>File Name</label>
            <input type="text"  class="form-control" id="File Name" placeholder="Enter Filename" required value={filename} onChange={(event) => { setfilename(event.target.value); }}
             />
          </div> 
          <br></br>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Upload Document</button>
          </div>
          </form>
        </div>
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
            marginTop:"50px"
          }}
        >
          <h3 style={{ position: "absolute", top: "5rem" }}>
            Add Files for Employees
          </h3>
          <form
            style={{
              position: "absolute",
              top: "5rem",
              left: "25rem",
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
              <br />
              <br />
              <div className="d-grid">
                <div className="mb-2">
                  <label htmlFor="Emp Id">Employee Id</label>
                  <div className='dropdown-container'>
            {empData.length >0 ? (
            <Select  
               onChange={handleEmpChange}
               options={options}
                isSearchable={true}
                />
        ):(
           <p>Loading Employees</p>
        )}
            </div>    
                </div>
                <br></br>
                <div className="mb-2">
                  <label htmlFor="file">File</label>
                  <input
                    type="file"
                    class="form-control"
                    id="File"
                    placeholder="Choose File"
                    onChange={handleFileChange}
                  />
                </div>
                <br></br>
                <div className="mb-2">
                  <label htmlFor="file name">File Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="File Name"
                    placeholder="Enter Filename"
                    required
                    value={filename}
                    onChange={(event) => {
                      setfilename(event.target.value);
                    }}
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
                  Upload File
                </button>
              </div>
            </div>
          </form>
        </div>
    </div>
         </div>
  )
}

export default HrFilesUpload