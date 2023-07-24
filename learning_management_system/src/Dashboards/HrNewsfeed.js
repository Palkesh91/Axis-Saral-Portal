import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import HrSidebar from './HrSidebar';
import { ToastContainer, toast } from 'react-toastify';

const HrNewsfeed = () => {
  const[title,setTitle]=useState()
    const[description,setDescription]=useState();
     const[showAllNf,setShowAllNf]=useState(true);
     const[showAddNf,setShowAddNf]=useState(false);
     const[showIndNews,setshowIndNews]=useState(false);
     const[news,setNews]=useState([]);
     const[comments,setComments]=useState([]);
     const[cmt,setcmt]=useState();
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
        setshowIndNews(false);
    }
    const handleAddNf=()=>{
        setShowAllNf(false);
        setShowAddNf(true);
        setshowIndNews(false);
        
        
    }

    const handleSubmit=(event)=>{
      event.preventDefault();
        if(!title || !description){
            //alert("Please enter all fields")
            toast.warning("Please Enter All Fields",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
        }else{
          const hr_id=localStorage.getItem('emp_id');
       employeeService.addNewsfeed(title,description,hr_id)
        .then((res)=>{
             console.log(res.data);
             //alert("Added Successfully");
             toast.success("Added Successfully",{
              position:toast.POSITION.TOP_RIGHT,
              autoClose:3000,
            })
            setTitle('');
            setDescription('');
        }).catch(error=>{
          toast.error(error,{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000,
          })

        })

        }
    }



    const handleGoBack=()=>{
      navigate("/hr");
    }

    const handleNewsView=(newsItem)=>{
    setNews(newsItem);
      setShowAllNf(false);
      setShowAddNf(false);
      setshowIndNews(true);
      const newsId=newsItem.n_id;
      employeeService.getNewsById(newsId)
      .then((res)=>{
        setComments(res.data);
        console.log(res.data);
      })
    }

    const handleAddComment=()=>{
      
      const newsId=news.n_id;
      console.log(newsId);
      const hr_id=localStorage.getItem('emp_id')
      console.log(hr_id);
      const comment=cmt
      console.log(cmt);
      if(!comment){
        toast.warning("Add comment to post",{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        })

      }
      else{
      employeeService.addComment(newsId,hr_id,comment)
      .then((res)=>{
        console.log(res.data);
        //alert('Comment added Sucessfully')
        toast.success("Comment Added Successfully",{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        })
        setcmt('');
      })}
    }
    
  return (
    <div>
    <HrSidebar/>
   
    <div className="cont" style={{marginLeft:"300px",backgroundColor:"white"}}>


     <ToastContainer/>
    {/*<div className="employee-container">
    <button onClick={handleGoBack} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> }
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button>
      <button className="btn btn-primary" onClick={handleAllNf} >
       All Newsfeed
      </button>
      <button className="btn btn-primary" onClick={handleAddNf}>
        Add Newsfeed
      </button>
  </div>*/}
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
                  onClick={handleAllNf}
                >
                  All Newsfeed
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
                  onClick={handleAddNf}
                >
                  Add Newsfeed
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>
    {/*
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
          )}  */}


{showAllNf && (
            <>
        {/*<div className='news-list' style={{gridTemplateColumns: "repeat(4, 1fr)"}}>
         {NfData.map((newsItem)=>(
            <div className="news-card" key={newsItem.id}>
                <div className='news-content'>
                    <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image2'/>
                    <h4 className='news-title' style={{textAlign:"center"}}>{newsItem.title}</h4>
                    {/*<h4 className='news-description'>{newsItem.description}</h4>}
                    <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                    <button className='btn btn-success' onClick={()=>{handleNewsView(newsItem)}}>View</button>
                    </div>
                </div>
            </div>
         ))}            
         </div>*/}
          <div className='news-list' style={{gridTemplateColumns: "repeat(4, 1fr)"}}>
         {NfData.map((newsItem)=>(
            <div className="news-card" key={newsItem.id}>
                <div className='news-content'>
                <div style={{display:"flex",justifyContent:"space-between",columnGap:"10px"}}>
                   {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV  ufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image'/> */}
                   {/* <div className="news-image">
                    <i class="fa fa-user-tie fa-lg"></i>
                    </div>*/}
                    <div>
                    <i className="fa-solid fa-newspaper fa-2xl"/>
                    </div>
                    <div>
                    <h4 className='news-description'><strong>{newsItem.title}</strong></h4>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
                    <button className='btn btn-success' onClick={()=>{handleNewsView(newsItem)}}>
                      <i className='fa-solid fa-eye'></i>
                    </button>
                    </div>
                </div>
                </div>
            </div>
         ))}            
        </div>
        </>
          )} 

{showIndNews && (
            <>
            <div style={{display:"flex",flexDirection:"column"}}>{
              
              <div>
               <div style={{backgroundColor:"#f1f1f1",padding:"20px",borderRadius:"8px",marginBottom:"20px",
               boxShadow:"0 2px 4px rgba(0,0,0,0.1)",width:"500px",marginLeft:"300px"}}>
                
                <br></br>
                   <p><strong>NewsFeed Name : </strong>{news.title}</p>
                   <p><strong>Description : </strong>{news.description}</p>
                 </div>
                 
                 <h3 style={{marginLeft:"300px"}}>Comments <i className='fa-solid fa-comment'></i></h3>
                 
                 <br></br>
              <div style={{display:"flex",flexDirection:"column"}}>{
              comments.map(com=>(
              <div style={{backgroundColor:"#f1f1f1",padding:"20px",borderRadius:"8px",marginBottom:"20px",
               boxShadow:"0 2px 4px rgba(0,0,0,0.1)",width:"500px",marginLeft:"300px"}} key={com.id}>
                   <p><strong>{com.employee.name} </strong>{com.employee.email}</p>
                   <p><strong></strong>{com.description}</p>
                 </div>
              ))}
              <form style={{width:"500px",marginLeft:"300px"}}>
              <label htmlFor='comment'>Comment</label>
            <input type="text"  class="form-control" id="comment" placeholder="Enter Comment" required value={cmt} onChange={(event) => { setcmt(event.target.value); }}
             />
             <br></br>
             <button className='btn btn-primary'onClick={handleAddComment}>Add Comment</button>
             
             </form>

             <br></br>
             <br></br>
                 


              </div>
              </div>

                 
                   
     }
   </div>
        </>
       )}

{showAddNf && (
        <>
        {/*<h3 className='text-center'>Add Newsfeed</h3>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container rounded bg-white'>
        <form >
          <div className='mb-2'>
            <label htmlFor='title'>Headlines</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Title" required value={title} onChange={(event) => { setTitle(event.target.value); }}
             />
          </div>
          <br></br>
          <div className='mb-2' style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor='description'>Description</label>
            {/*<input type="text"  class="form-control" id="Description" placeholder="Enter Description" required value={description} onChange={(event) => { setDescription(event.target.value); }}
             /> }
             <textarea required value={description} onChange={(event) => { setDescription(event.target.value); }} 
               placeholder="Enter Description" rows={8} cols={30}
             />
          </div> 
          <br></br>
          <div className='d-grid'>
            <button className='btn btn-primary'onClick={handleSubmit}>Add Newsfeed</button>
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
              }}
            >
              <h3 style={{ position: "absolute", top: "5rem" }}>
                Add Newsfeed
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
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        class="form-control"
                        id="Name"
                        placeholder="Enter Title"
                        required
                        value={title}
                        onChange={(event) => {
                          setTitle(event.target.value);
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
                      Add Newsfeed
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

export default HrNewsfeed
