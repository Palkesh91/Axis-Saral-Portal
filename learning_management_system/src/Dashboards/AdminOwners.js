import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import "../Style.css";
import HrSidebar from './HrSidebar';
import AdminSidebar from './AdminSidebar';
import { ToastContainer, toast } from 'react-toastify';

const AdminOwners = () => {

    const[name,setName]=useState()
    const[email,setEmail]=useState();
    const[contact,setContact]=useState();
    const[own,setOwn]=useState([]);
     const[showAllOwn,setShowAllOwn]=useState(true);
     const[showAddOwn,setShowAddOwn]=useState(false);
     const[showEditOwn,setshowEditOwn]=useState(false)
     const[ownerData,setOwnerData]=useState([]);
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     useEffect(()=>{
         employeeService.getAllOwners()
         .then((res)=>{
         setOwnerData(res.data);
     })
        
     })


    const handleAllOwn=()=>{
        setShowAllOwn(true);
        setShowAddOwn(false);
        setshowEditOwn(false);
    }
    const handleAddOwn=()=>{
        setShowAllOwn(false);
        setShowAddOwn(true);
        setshowEditOwn(false);
    }


    function isValidEmail(email){
      return /\S+@\S+\.\S+/.test(email);
    }

    const handleSubmit=(event)=>{

      event.preventDefault();
      
        if(!name || !email || !contact){
           // alert("Please enter all fields")
           toast.warning("Please enter all fields",{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })
          }
          else if(!isValidEmail(email)){
            //alert("Enter a valid mail");
            toast.warning("Enter a valid mail",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
          }
          else if(contact.length<10){
            //alert("please enter contact with minimum 10 digits");
            toast.warning("please enter contact with minimum 10 digits",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
          }else{
        employeeService.addOwner(name,email,contact)
        .then((res)=>{
             console.log(res.data);
             //alert("Added Successfully");
             toast.success("Added Successfully",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
             setName('');
             setEmail('');
             setContact('');
        }).catch(error=>{
          toast.error(error,{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })
        })

        }
    }
    const handleGoBack=()=>{
      navigate("/admin");
    }

    const nameChangeHandler=(event)=>{
      console.log(event.target.value)
     // setEmpName(event.target.value)
     own.name=event.target.value;
     setOwn((prevState)=>{
      return {...prevState,own:event.target.value}
     })
  }
  const emailChangeHandler=(event)=>{
      console.log(event.target.value)
     // setEmpName(event.target.value)
     own.email=event.target.value;
     setOwn((prevState)=>{
      return {...prevState,own:event.target.value}
     })
  }

  const contactChangeHandler=(event)=>{
    console.log(event.target.value)
   // setEmpName(event.target.value)
   own.contact=event.target.value;
   setOwn((prevState)=>{
    return {...prevState,own:event.target.value}
   })
}


    const handleEdit=(emp)=>{
      setOwn(emp);
      setShowAllOwn(false);
      setShowAddOwn(false);
      setshowEditOwn(true);

    }


    const handleEditSubmit=(event)=>{
      event.preventDefault();
      employeeService.updateOwner(own.o_id,own.name,own.email,own.contact)
      .then((res)=>{
        console.log(res.data);
        //alert("Updated Successfully");
        toast.success("Updated Successfully",{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        })

      }).catch(error=>{
        toast.error(error,{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        })

      })
      

    }

  return (
    <div>
    <AdminSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>


     <ToastContainer/>
    {/*<div className="employee-container">
    <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllOwn} >
       All owners
      </button>
      <button className="btn btn-primary" onClick={handleAddOwn}>
        Add Owners
      </button>
  </div>*/}
  <div>
          <nav
            style={{
              height: "70px",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
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
                  All owners
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
                  onClick={handleAddOwn}
                >
                  Add Owners
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
                <th>Actions</th>
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
                          <td>
                            <button className='btn btn-warning' onClick={()=>handleEdit(emp)}>Edit
                              <i class="fas fa-edit"></i>
                            </button>
                          </td>
                      </tr>
                  ))           
            }
           </tbody>
        </table>
        </>
       )}

{showEditOwn && (
        <>
       {/* <h3 className='text-center'>Update Owner</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="name" placeholder="Enter Name" required value={own.name} onChange={nameChangeHandler}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter Email" required value={own.email} onChange={emailChangeHandler}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="text"  class="form-control" id="Contact" placeholder="Enter Contact" required value={own.contact} onChange={contactChangeHandler}
             />
          </div>   
          <br></br>      
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleEditSubmit}>Update Owner</button>
          </div>
          </form>
          </div>
</div>*/}
        <div
              style={{
                position: "absolute",
                left: "40rem",
                width: "46rem",
                height: "41rem",
                backgroundColor: "#d5edfb",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignContent: "center",
                borderRadius: "20px",
                justifyContent: "center",
              }}
            >
              <h3 style={{ position: "absolute", top: "5rem" }}>
                Update Owner
              </h3>
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
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Enter Name"
                      required
                      value={own.name}
                      onChange={nameChangeHandler}
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
                      value={own.email}
                      onChange={emailChangeHandler}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Contact"
                      placeholder="Enter Contact"
                      required
                      value={own.contact}
                      onChange={contactChangeHandler}
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
                      onClick={handleEditSubmit}
                    >
                      Update Owner
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </>
    )}

{showAddOwn && (
        <>
       {/* <h3 className='text-center'>Add Owner</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="name" placeholder="Enter Name" required value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter Email" required value={email} onChange={(event) => { setEmail(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="text"  class="form-control" id="Contact" placeholder="Enter Contact" required value={contact} onChange={(event) => { setContact(event.target.value); }}
             />
          </div>   
          <br></br>      
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Add Owner</button>
          </div>
          </form>
          </div>
</div>*/}
         <div
              style={{
                position: "absolute",
                left: "40rem",
                width: "46rem",
                height: "41rem",
                backgroundColor: "#d5edfb",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignContent: "center",
                borderRadius: "20px",
                justifyContent: "center",
              }}
            >
              <h3 style={{ position: "absolute", top: "5rem" }}>Add Owner</h3>
              <form
                style={{
                  position: "absolute",
                  top: "5rem",
                  left: "30rem",
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
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
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
                    <label htmlFor="contact">Contact</label>
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
                      Add Owner
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </>
    )}
    </div>
    </div>
  )
}

export default AdminOwners