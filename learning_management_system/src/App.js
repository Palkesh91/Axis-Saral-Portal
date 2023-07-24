import "./App.css";
import HomePage from "./components/HomePage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
//import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./Dashboards/Admin";
import Employee from "./Dashboards/Employee";
import Manager from "./Dashboards/Manager";
import Hr from "./Dashboards/Hr";
import EmployeeProjects from "./Dashboards/EmployeeProjects";
import EmployeeDetails from "./Dashboards/EmployeeDetails";
import EmployeeDocuments from "./Dashboards/EmployeeDocuments";
import ManagerEmployees from "./Dashboards/ManagerEmployees";
import ManagerProjects from "./Dashboards/ManagerProjects";
import ManagerStakeHolders from "./Dashboards/ManagerStakeHolders";
import ManagerOwners from "./Dashboards/ManagerOwners";
import ProjectAssign from "./Dashboards/ProjectAssign";
import HrEmployees from "./Dashboards/HrEmployees";
import HrProjects from "./Dashboards/HrProjects";
import HrStakeholders from "./Dashboards/HrStakeholders";
import HrOwners from "./Dashboards/HrOwners";
import HrNewsfeed from "./Dashboards/HrNewsfeed";
import HrJobs from "./Dashboards/HrJobs";
import Newsfeed from "./Dashboards/Newsfeed";
import Jobs from "./Dashboards/Jobs";
import HrFilesUpload from "./Dashboards/HrFilesUpload";
import EmployeeEditForm from "./Dashboards/EmployeeEditForm";
import AdminEmployees from "./Dashboards/AdminEmployees";
import AdminProjects from "./Dashboards/AdminProjects";
import AdminStakeholder from "./Dashboards/AdminStakeholder";
import AdminOwners from "./Dashboards/AdminOwners";
import AdminNewsfeed from "./Dashboards/AdminNewsfeed";
import AdminJobs from "./Dashboards/AdminJobs";
import AdminProjectAssign from "./Dashboards/AdminProjectAssign";
import ManagerProfile from "./Dashboards/ManagerProfile";
import HrProfile from "./Dashboards/HrProfile";
import EmployeeProfile from "./Dashboards/EmployeeProfile";
import EmployeeNewsfeed from "./Dashboards/EmployeeNewsfeed";
import EmployeeJobs from "./Dashboards/EmployeeJobs";
import AdminProfile from "./Dashboards/AdminProfile";
import AdminEmpEditForm from "./Dashboards/AdminEmpEditForm";
import ManagerEmpEditForm from "./Dashboards/ManagerEmpEditForm";
import ManagerNewsfeed from "./Dashboards/ManagerNewsfeed";
import ManagerJobs from "./Dashboards/ManagerJobs";
import HrEditForm from "./Dashboards/HrEditForm";
import EmployeeFeedback from "./Dashboards/EmployeeFeedback";
import AdminFeedbacks from "./Dashboards/AdminFeedbacks";
import ManagerDocuments from "./Dashboards/ManagerDocuments";
import HrDocuments from "./Dashboards/HrDocuments";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/manager" element={<Manager />} />
          <Route exact path="/newsfeed" element={<Newsfeed />} />
          <Route exact path="/jobs" element={<Jobs />} />
          <Route exact path="/employee/newsfeed" element={<EmployeeNewsfeed />} />
          <Route exact path="/employee/jobs" element={<EmployeeJobs />} />
          <Route exact path="/editform/:id" element={<EmployeeEditForm />} /> 
          <Route exact path="/employeeprofile" element={<EmployeeProfile />} />
          <Route exact path="/managerprofile" element={<ManagerProfile />} />
          <Route exact path="/manager/employees/:empId" element={<ManagerEmployees />} />
          <Route exact path="/manager/editform/:id" element={<ManagerEmpEditForm />} />
          <Route exact path="/manager/projects/:empId" element={<ManagerProjects />} />
          <Route exact path="/manager/stakeholders/:empId" element={<ManagerStakeHolders />} />
          <Route exact path="/manager/owners/:empId" element={<ManagerOwners/>} />
          <Route exact path="/manager/newsfeed/:empId" element={<ManagerNewsfeed />} />
          <Route exact path="/manager/jobs/:empId" element={<ManagerJobs />} />
          <Route exact path="/manager/projectAssign/:empId" element={<ProjectAssign/>} />

          <Route exact path="/adminprofile" element={<AdminProfile />} />
          <Route exact path="/admin/editform/:id" element={<AdminEmpEditForm />} />
          <Route exact path="/admin/employees/:empId" element={<AdminEmployees />} />
          <Route exact path="/admin/projects/:empId" element={<AdminProjects />} />
          <Route exact path="/admin/stakeholders/:empId" element={<AdminStakeholder />} />
          <Route exact path="/admin/owners/:empId" element={<AdminOwners/>} />
          <Route exact path="/admin/projectAssign/:empId" element={<AdminProjectAssign/>} />
          <Route exact path="/admin/newsfeed/:empId" element={<AdminNewsfeed />} />
          <Route exact path="/admin/jobs/:empId" element={<AdminJobs/>} />
          <Route exact path="/admin/feedbacks" element={<AdminFeedbacks />} />

          <Route exact path="/hr" element={<Hr />} />
          <Route exact path="/hrprofile" element={<HrProfile />} />
          <Route exact path="/hr/editform/:id" element={<HrEditForm />} />
          <Route exact path="/hr/employees/:empId" element={<HrEmployees />} />
          <Route exact path="/hr/projects/:empId" element={<HrProjects/>} />
          <Route exact path="/hr/stakeholders/:empId" element={<HrStakeholders />} />
          <Route exact path="/hr/owners/:empId" element={<HrOwners/>} />
          <Route exact path="/hr/newsfeed/:empId" element={<HrNewsfeed />} />
          <Route exact path="/hr/jobs/:empId" element={<HrJobs/>} />
          <Route exact path="/hr/files/:empId" element={<HrFilesUpload/>} />

          <Route exact path="/projects" element={<EmployeeProjects />} />
          <Route exact path="/employeedetails" element={<EmployeeDetails />} />
          <Route exact path="/employeefeedback" element={<EmployeeFeedback />} />
          <Route
            exact
            path="/employeedocuments"
            element={<EmployeeDocuments />}
          />
          <Route
            exact
            path="/managerdocuments"
            element={<ManagerDocuments />}
          />
          <Route
            exact
            path="/hrdocuments"
            element={<HrDocuments />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
