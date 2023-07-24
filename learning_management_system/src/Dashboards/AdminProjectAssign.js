import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import "../Style.css";
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import AdminSidebar from './AdminSidebar';

const AdminProjectAssign = () => {
    const[empData,setEmpdata]=useState([]);
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
},[])

const handleGoBack=()=>{
    navigate("/admin");
}

const handleSelect=(opti)=>{
    const selectIds=opti ? opti.map(opt=>opt.value):[];
    setselectEmpIds(selectIds);
    console.log(selectIds);

}

const options=empData.map((emp)=>({
    value:emp.emp_id,
    label:`${emp.emp_id}`+" "+emp.name.toString(),
}))

const handleAssign=(event)=>{
    event.preventDefault();
    const emp_ids=selectEmpIds;
    const proj_id=projId;
    console.log(emp_ids);
    console.log(proj_id);
    employeeService.assignProject(emp_ids,proj_id)
    .then((res)=>{
        console.log(res.data);
        alert("Assigned Project Successfully");
    })


}
  return (
    <div>
    <AdminSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>



    {/*<button style={{marginLeft:"20px"}} onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
              {/* <i className="fas fa-paper-plane"></i> 
             <i class="fa fa-arrow-left" aria-hidden="true"></i> 
    </button>
    <h2>Admin Dashboard</h2>
    */}
    <br></br>
        <h3 className='text-center'>Assign Project</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
    <form>
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
            <input class='form-control' type="text" required value={projId} placeholder='Enter Project Id' onChange={(event)=>{setProjId(event.target.value)}}>
            </input>
            <br></br>
            <div>
            <button className='btn btn-primary' onClick={handleAssign}>Assign Project</button><br/>
            </div>
          </div>
    </form>
    </div>
    </div>
    <h1 style={{marginLeft:"30px"}}>All Employees</h1>
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

export default AdminProjectAssign