import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import EmployeeNavbar from './EmployeeNavbar';
import { useNavigate } from 'react-router-dom';
import "../Style.css";
import HrSidebar from './HrSidebar';
import AdminSidebar from './AdminSidebar';
import { ToastContainer, toast } from 'react-toastify';

const AdminStakeholder = () => {
    const[name,setName]=useState()
    const[email,setEmail]=useState();
    const[contact,setContact]=useState();
     const[showAllSh,setShowAllSh]=useState(true);
     const[showAddSh,setShowAddSh]=useState(false);
     const[showEditsh,setshowEditsh]=useState(false);
     const[shData,setShData]=useState([]);
     const[sh,setsh]=useState([]);
     const employeeService=new EmployeeService();
     const navigate=useNavigate();

     useEffect(()=>{
         employeeService.getAllStakeHolders()
         .then((res)=>{
         setShData(res.data);
     })
        
     },[])


    const handleAllSh=()=>{
        setShowAllSh(true);
        setShowAddSh(false);
        setshowEditsh(false);
    }
    const handleAddSh=()=>{
        setShowAllSh(false);
        setShowAddSh(true);
        setshowEditsh(false);
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
        employeeService.addStakeHolder(name,email,contact)
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
          toast.warning(error,{
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
     sh.name=event.target.value;
     setsh((prevState)=>{
      return {...prevState,sh:event.target.value}
     })
  }
  const emailChangeHandler=(event)=>{
      console.log(event.target.value)
     // setEmpName(event.target.value)
     sh.email=event.target.value;
     setsh((prevState)=>{
      return {...prevState,sh:event.target.value}
     })
  }

  const contactChangeHandler=(event)=>{
    console.log(event.target.value)
   // setEmpName(event.target.value)
   sh.contact=event.target.value;
   setsh((prevState)=>{
    return {...prevState,sh:event.target.value}
   })
}

    const handleEdit=(emp)=>{
      setsh(emp);
      setShowAllSh(false);
      setShowAddSh(false);
      setshowEditsh(true);
    }

    const handleEditSubmit=(event)=>{
      event.preventDefault();
      
      employeeService.updateStakeholder(sh.sh_id,sh.name,sh.email,sh.contact)
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
      <button className="btn btn-primary" onClick={handleAllSh} >
       All StakeHolders
      </button>
      <button className="btn btn-primary" onClick={handleAddSh}>
        Add StakeHolder
      </button>
  </div> */}
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
                    width: "13rem",
                    backgroundColor: "#2f4050",
                    color: "white",
                    fontSize: "20px",
                  }}
                  onClick={handleAllSh}
                >
                  All StakeHolders
                </button>
              </li>
              <li style={{ marginRight: "20px" }}>
                <button
                  style={{
                    border: "none",
                    height: "40px",
                    width: "13rem",
                    backgroundColor: "#2f4050",
                    color: "white",
                    fontSize: "20px",
                  }}
                  onClick={handleAddSh}
                >
                  Add StakeHolder
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>

    {showAllSh && (
            <>
        <table>
            <thead>
                <tr>
                <th>StakeHolder ID</th>
                <th>StakeHolder Name</th>
                <th>StakeHolder MailId</th>
                <th>StakeHolder Contact</th>
                <th>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                     shData.map(emp=>(
                      <tr key={emp.id}>
                          <td>{emp.sh_id}</td>
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

{showEditsh && (
        <>
        {/*<h3 className='text-center'>Update StakeHolder</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="name" placeholder="Enter Name" required value={sh.name} onChange={nameChangeHandler}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter Email" required value={sh.email} onChange={emailChangeHandler}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="text"  class="form-control" id="Contact" placeholder="Enter Contact" required value={sh.contact} onChange={contactChangeHandler}
             />
          </div>   
          <br></br>      
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleEditSubmit}>Update StakeHolder</button>
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
                Update StakeHolder
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
                      value={sh.name}
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
                      value={sh.email}
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
                      value={sh.contact}
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
                      Update StakeHolder
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </>
    )}

{showAddSh && (
        <>
       {/* <h3 className='text-center'>Add StakeHolder</h3>
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
            <button className='btn btn-primary'onClick={handleSubmit}>Add StakeHolder</button>
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
                Add StakeHolder
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
                  <div className="mb-2">
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
                  <div className="mb-2">
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
                  <div className="mb-2">
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
                  <br></br>
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
                      Add StakeHolder
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

export default AdminStakeholder