import axios, { Axios } from 'axios';

const BASE_PATH_URL="http://localhost:9100/employee";

class EmployeeService{
    
    getConfig(){
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
        return config;
      }

      getAppConfig(){
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType:'arraybuffer'
        };
      return config;

      }

  getEmpByProjId(id){
    return axios.get(BASE_PATH_URL+`/getEmpByProjId/${id}`,this.getConfig());
  }

  getProjByEmp(empId){
    return axios.get(BASE_PATH_URL+`/getProjByEmp/${empId}`,this.getConfig());
  }

  getDocById(id){
    return axios.get(BASE_PATH_URL+`/documentByEmpId/${id}`,this.getConfig())
  }


  getDownloadById(empId,doc_id){
    return axios.get(BASE_PATH_URL+`/${empId}/documents/${doc_id}`,this.getAppConfig())
  }

  getAllEmployees(){
    return axios.get(BASE_PATH_URL+"/getAllEmployees",this.getConfig())
  }

  getEmployeeById(id){
    return axios.get(BASE_PATH_URL+`/Employee/getbyid/${id}`,this.getConfig())
  }
  updateEmployee(id,name,email,password,role,date_of_birth,gender,salary,address,contact){
    return axios.put(BASE_PATH_URL+`/Employee/update/${id}`,{name,email,password,role,date_of_birth,gender,salary,address,contact},this.getConfig());
  }

  getAllManagers(){
    return axios.get(BASE_PATH_URL+"/Employee/getAllManager",this.getConfig())
  }

  getAllHrs(){
    return axios.get(BASE_PATH_URL+"/Employee/getAllHr",this.getConfig())
  }

  getAllProjects(){
    return axios.get(BASE_PATH_URL+"/getAllProjects",this.getConfig())
  }

  updateProject(id,title,description,m_id,hr_id,stakeholder_id,owner_id,startDate,endDate,status){
    return axios.put(BASE_PATH_URL+`/project/update/${id}`,{title,description,m_id,hr_id,stakeholder_id,owner_id,startDate,endDate,status},this.getConfig())
  }

  getAllStakeHolders(){
    return axios.get(BASE_PATH_URL+"/getAllStakeHolders",this.getConfig())
  }

  updateStakeholder(id,name,email,contact){
   return axios.put(BASE_PATH_URL+`/stakeholder/update/${id}`,{name,email,contact},this.getConfig())
  }

  getAllOwners(){
    return axios.get(BASE_PATH_URL+"/getAllOwners",this.getConfig())
  }

  updateOwner(id,name,email,contact){
    return axios.put(BASE_PATH_URL+`/owner/update/${id}`,{name,email,contact},this.getConfig())
  }

  getAllNewsFeed(){
    return axios.get(BASE_PATH_URL+"/getAllNewsfeed",this.getConfig())
  }

  getAllFeedback(){
    return axios.get(BASE_PATH_URL+"/getAllFeedback",this.getConfig());
  }

  getAllJobs(){
    return axios.get(BASE_PATH_URL+"/getAllJobs",this.getConfig());
  }

  register(name,email,password,date_of_birth,role,gender,salary,contact,address){
    return axios.post("http://localhost:9100/register",{name,email,password,date_of_birth,role,gender,salary,contact,address},this.getConfig())
  }

  addStakeHolder(name,email,contact){
    return axios.post(BASE_PATH_URL+"/stakeholder",{name,email,contact},this.getConfig())
  }

  addOwner(name,email,contact){
    return axios.post(BASE_PATH_URL+"/owner",{name,email,contact},this.getConfig())
  }

  addProject(title,description,m_id,hr_id,stakeholder_id,owner_id,startDate,endDate,status){
    return axios.post(BASE_PATH_URL+"/project",{title,description,m_id,hr_id,stakeholder_id,owner_id,startDate,endDate,status},this.getConfig())
  }

  addNewsfeed(title,description,hr_id){
    return axios.post(BASE_PATH_URL+"/Newsfeed",{title,description,hr_id},this.getConfig());
  }

  addJob(job_role,description,vacancies,hr_id){
    return axios.post(BASE_PATH_URL+"/JobVacancy",{job_role,description,vacancies,hr_id},this.getConfig())
  }

  addFeedback(type,description,emp_id){
    return axios.post(BASE_PATH_URL+"/feedback",{type,description,emp_id},this.getConfig());
  }

  assignProject(emp_ids,proj_id){
    return axios.post(BASE_PATH_URL+"/EmpProject",{emp_ids,proj_id},this.getConfig());
  }

  deleteEmp(id){
    return axios.delete(BASE_PATH_URL+`/Employee/delete/${id}`,this.getConfig());
  }

  getSop(){
    return axios.get(BASE_PATH_URL+"/policies/1",this.getAppConfig());
  }

  getScd(){
    return axios.get(BASE_PATH_URL+"/policies/3",this.getAppConfig());
  }

  getPolicy(){
    return axios.get(BASE_PATH_URL+"/policies/2",this.getAppConfig());
  }

  getNewsById(newsId){
    return axios.get(BASE_PATH_URL+`/getComments/${newsId}`,this.getConfig())
  }
   
  addComment(newsId,empId,comment){
    return axios.post(BASE_PATH_URL+`/addComment/${newsId}/${empId}/${comment}`,{},this.getConfig())
  }
 /* addFile(emp_id,filename,formData){
    return axios.post(BASE_PATH_URL+`/uploadFile/${emp_id}/${filename}`,{formData},this.getFileConfig())
  }*/
}

export default EmployeeService;