import React, { useEffect, useState } from 'react'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeSidebar from './EmployeeSidebar';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeNewsfeed = () => {
    const employeeService=new EmployeeService();
    const[newsData,setnewsData]=useState([]);
    const[showAllNf,setShowAllNf]=useState(true);
     const[showIndNews,setshowIndNews]=useState(false);
     const[news,setNews]=useState([]);
     const[comments,setComments]=useState([]);
     const[cmt,setcmt]=useState();
    const navigate=useNavigate();
   
  
    useEffect(()=>{
     
       employeeService.getAllNewsFeed()
       .then((res)=>{
        console.log(res.data);
        setnewsData(res.data);
       })
  
    },[])
  
  
    const handleGoBack=()=>{
       
            setShowAllNf(true);
            setshowIndNews(false);
    }

    const handleNewsView=(newsItem)=>{
        setNews(newsItem);
          setshowIndNews(true);
          setShowAllNf(false);
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
              toast.success("Comment added Sucessfully",{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:3000,
              })
              setcmt('');
            })
          }
          }
  
    return (
        <div>
        <EmployeeSidebar/>
       
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
                 NewsFeed
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br></br>
        {showAllNf && (
            <>
       {/* <div className='news-list' style={{gridTemplateColumns: "repeat(4, 1fr)"}}>
         {newsData.map((newsItem)=>(
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
         {newsData.map((newsItem)=>(
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
            <button onClick={handleGoBack} style={{marginLeft:"30px"}} id="button-addon2" type='button' className='btn btn-primary' >
       {/* <i className="fas fa-paper-plane"></i> */}
       <i class="fa fa-arrow-left" aria-hidden="true"></i> 
        </button> 
            <div style={{display:"flex",flexDirection:"column"}}>{
                
              
              <div>
               <div style={{backgroundColor:"#f1f1f1",padding:"20px",borderRadius:"8px",marginBottom:"20px",
               boxShadow:"0 2px 4px rgba(0,0,0,0.1)",width:"500px",marginLeft:"300px"}}>
              {/* <img src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' className='news-image2'/>*/}
                <br></br>
                   <p><strong>Headlines : </strong>{news.title}</p>
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
         </div>
         </div>
    )
}

export default EmployeeNewsfeed