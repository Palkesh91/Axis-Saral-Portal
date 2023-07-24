import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import "../Style.css";
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ManagerSidebar from './ManagerSidebar';
import { ToastContainer, toast } from 'react-toastify';

const ProjectAssign = () => {
    const[empData,setEmpdata]=useState([]);
    const[projData,setProjdata]=useState([]);
    const[projId,setProjId]=useState();
    const[showAllEmp,setShowAllEmp]=useState(true);
    const[selectEmpIds,setselectEmpIds]=useState([]);
    const employeeService=new EmployeeService();
    const navigate=useNavigate();

    useEffect(()=>{
   
        employeeService.getAllEmployees()
        .then((res)=>{
         console.log(res.data);
         setEmpdata(res.data);

        })

        employeeService.getAllProjects()
        .then((res)=>{
            console.log(res.data);
            setProjdata(res.data);
        })
},[])

const handleGoBack=()=>{
    navigate("/manager");
}

const handleSelect=(opti)=>{
    const selectIds=opti ? opti.map(opt=>opt.value):[];
    setselectEmpIds(selectIds);
    console.log(selectIds);

}

const handleProjChange=(selectedOption)=>{
    setProjId(selectedOption.value);
    console.log(selectedOption.value);


}

const options=empData.map((emp)=>({
    value:emp.emp_id,
    label:`${emp.emp_id}`+" "+emp.name.toString(),
}))

const options2=projData.map((proj)=>({
    value:proj.proj_id,
    label:proj.title
    
}))

const handleAssign=(event)=>{
    event.preventDefault();
    const emp_ids=selectEmpIds;
    const proj_id=projId;
    console.log(emp_ids);
    console.log(proj_id);

    if(emp_ids.length==0 || !proj_id){

    toast.warning("Please Select Employees and Project",{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })
    }
    else{
    employeeService.assignProject(emp_ids,proj_id)
    .then((res)=>{
        console.log(res.data);
        //alert("Assigned Project Successfully");
        toast.success("Assigned Project Successfully",{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })
    })
    .catch(error=>{
        //alert("Employee Already assigned in other project")
        toast.error("Employee Already assigned in other project",{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })
        
    })
}


}
  return (
    <div>
      <ManagerSidebar/>
     
      <div className="cont" style={{marginLeft:"280px",backgroundColor:"white"}}>

     {/* <button style={{marginLeft:"20px"}} onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
              <i className="fas fa-paper-plane"></i> 
             <i class="fa fa-arrow-left" aria-hidden="true"></i> 
    </button> */}
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
                 Assign Project
                </button>
              </li>
            </ul>
          </nav>
        </div>
    <ToastContainer/>
    <br></br>
        <h3 className='text-center'>Assign Project</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
    <form style={{width:"300px"}}>
       {/* <label>
            Select Employees:
            <select multiple value={selectEmpIds} onChange={handleSelect}>
                {empData.map(emp =>(
                    <option key={emp.emp_id} value={emp.emp_id}>{emp.name}</option>
                ))}
            </select>
        </label>
        <br/>
        <label>
            Project Id:
            <input type="text"required value={projId} onChange={(event)=>{setProjId(event.target.value)}}>
            </input>
        </label>
                <br/> */}
        <div className='mb-2'>
            <label htmlFor='selected'>Selected emp_list</label>
            <div className='dropdown-container'>
        {empData.length >0 ? (
            <Select  
               onChange={handleSelect}
               options={options}
                value={options.filter(opt=>selectEmpIds.includes(opt.value))}
                isSearchable={true}
                isClearable={true}
                isMulti
                />
        ):(
           <p>Loading Employees</p>
        )}
            </div>
          </div>
         <div className='mb-2'>
            <label htmlFor='Project id'>Project Id</label>
           {/* <input class='form-control' type="text" required value={projId} placeholder='Enter Project Id' onChange={(event)=>{setProjId(event.target.value)}}>
            </input> */}
            <div className='dropdown-container'>
            {projData.length >0 ? (
            <Select  
               onChange={handleProjChange}
               options={options2}
                isSearchable={true}
                />
        ):(
           <p>Loading Employees</p>
        )}
            </div>

            <br></br>
            <div>
            <button className='btn btn-primary' onClick={handleAssign}>Assign Project</button><br/>
            </div>
          </div>
    </form>
    </div>
    </div>
    <h3 style={{marginLeft:"30px"}}>All Employees</h3>
    {showAllEmp && (
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
       )}
       <br></br>
       <br></br>
    </div>
    </div>
    

  )
}

export default ProjectAssign