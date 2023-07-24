import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import EmployeeService from "../Services/EmployeeService";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";
import ManagerSidebar from "./ManagerSidebar";

const ManagerDocuments = () => {
  const[docdata,setdocData]=useState([]);
   const employeeService=new EmployeeService();
   const navigate=useNavigate();
  useEffect(()=>{
    const empId=localStorage.getItem("emp_id")
    employeeService.getDocById(empId).
    then((res)=>{
      console.log(res.data);
      setdocData(res.data);
    })
  },[])

  const handleDownload=async (doc_id,doc_type)=>{
    const empId=localStorage.getItem("emp_id")
    await employeeService.getDownloadById(empId,doc_id)
   .then((res)=>{
    const blob=new Blob([res.data],{type:'application/pdf'});
   // console.log(blob.data);
      if("image/png"===doc_type){
      doc_type="png";
      const blob=new Blob([res.data],{type:'image/png'});
     }
     else if("application/pdf"===doc_type){
      doc_type="pdf";
      const blob=new Blob([res.data],{type:'application/pdf'});
     }
     else if("image/jpeg"==doc_type) {
      doc_type="jpeg";
      const blob=new Blob([res.data],{type:'image/jpeg'});
     }
     else if("image/jpg"==doc_type) {
      doc_type="jpg";
      const blob=new Blob([res.data],{type:'image/jpg'});
     }
     else if("text/plain"==doc_type) {
      doc_type="txt";
      const blob=new Blob([res.data],{type:'text/plain'});
     }
     else{
      doc_type="docx";
      const blob=new Blob([res.data]);
     }
    //const blob=new Blob([res.data],{type:'application/pdf'});
    //const url=window.URL.createObjectURL(new Blob([blob.data]));
    const url=window.URL.createObjectURL(blob);
    const link=document.createElement('a');
   // link.download=url.replace(/^.*[\\\/]/,'')
    link.href=url;
    
    link.setAttribute('download',`filename.${doc_type}`);
    //link.download=`file.${doc_type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    })
  }
  const handleGoBack=()=>{
    navigate("/manager");
  }


  return (
    <div>
    <ManagerSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>
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
                 My Documents
                </button>
              </li>
            </ul>
          </nav>
        </div>
     {/* <table>
            <thead>
                <tr>
                <th>Serial NO</th>
                <th>Document Name</th>
                <th>Document type</th>
                <th>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                     docdata.map((emp,index)=>(
                      <tr key={index} >
                          <td>{index+1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.type}</td>
                          <td>
                          <button className="btn btn-success" onClick={()=>handleDownload(emp.doc_id,emp.type)}>Download</button>
                          </td>
                      </tr>
                  ))           
            }
           </tbody>
          </table> */}
          <br></br>
          <br></br>
          <div className='news-list' style={{gridTemplateColumns: "repeat(4, 1fr)"}}>
         {docdata.map((emp)=>(
            <div className="news-card" key={emp.id}>
                <div className='news-content'>
                <div style={{display:"flex",justifyContent:"space-evenly",columnGap:"10px"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    <div>
                    <i className="fa-solid fa-file fa-xl"/>
                    </div>
                    <div>
                    <h4 className='news-description'><strong>Name : </strong>{emp.name}</h4>
                    <h4 className='news-description'><strong>Type : </strong>{emp.type}</h4>
                    </div>
                    
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                <button className="btn btn-success" onClick={()=>handleDownload(emp.doc_id,emp.type)}>
                <i className="fa fa-download"/>
                </button>
                </div>
                </div>
                </div>
            </div>
         ))}            
        </div>
    </div>
    </div>
  );
};

export default ManagerDocuments