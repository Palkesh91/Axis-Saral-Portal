import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import AdminSidebar from './AdminSidebar';

const AdminNewsfeed = () => {
  const[title,setTitle]=useState()
    const[description,setDescription]=useState();
     const[showAllNf,setShowAllNf]=useState(true);
     const[showAddNf,setShowAddNf]=useState(false);
     const[NfData,setNfData]=useState([]);
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     useEffect(()=>{
         employeeService.getAllNewsFeed()
         .then((res)=>{
         setNfData(res.data);
         console.log(res.data);
     })
        
     },[])


    const handleAllNf=()=>{
        setShowAllNf(true);
        setShowAddNf(false);
    }
    const handleAddNf=()=>{
        setShowAllNf(false);
        setShowAddNf(true);
    }

    const handleSubmit=()=>{
        if(!title || !description){
            alert("Please enter all fields")
        }else{
          const hr_id=localStorage.getItem('emp_id');
       employeeService.addNewsfeed(title,description,hr_id)
        .then((res)=>{
             console.log(res.data);
             alert("Added Successfully");
        })

        }
    }



    const handleGoBack=()=>{
      navigate("/admin");
    }
    
  return (
    <div>
    <AdminSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>



    <div className="employee-container">
    <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> */}
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllNf} >
       All Newsfeed
      </button>
      <button className="btn btn-primary" onClick={handleAddNf}>
        Add Newsfeed
      </button>
    </div>

    {showAllNf && (
            <>
        <table>
            <thead>
                <tr>
                <th>NewsFeed ID</th>
                <th>NewsFeed Title</th>
                <th>NewsFeed Description</th>
                <th>Added By Hr Id</th>
                <th>Hr Name</th>
                <th>Hr Email</th>
                </tr>
           </thead>
           <tbody>
            {
                     NfData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.n_id}</td>
                          <td>{emp.title}</td>
                          <td>{emp.description}</td>
                          <td>{emp.hr.emp_id}</td>
                          <td>{emp.hr.name}</td>
                          <td>{emp.hr.email}</td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}

{showAddNf && (
        <>
        <h3 className='text-center'>Add Newsfeed</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='title'>Title</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Title" required value={title} onChange={(event) => { setTitle(event.target.value); }}
             />
          </div>
          <br></br>
          <div className='mb-2'>
            <label htmlFor='description'>Description</label>
            <input type="text"  class="form-control" id="Description" placeholder="Enter Description" required value={description} onChange={(event) => { setDescription(event.target.value); }}
             />
          </div> 
          <br></br>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Add Newsfeed</button>
          </div>
          </form>
          </div>
          </div>
        </>
    )}
    </div>
    </div>
  )
}

export default AdminNewsfeed