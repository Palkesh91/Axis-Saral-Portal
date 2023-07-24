import axios from "axios";
const baseEmployeesURL = "http://localhost:9999/employees";
const baseDepartmentsURL = "http://localhost:9999/departments";

class ApiService {
  getConfig() {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  }
  login = (userlogin) => {
    return axios.post("http://localhost:9999/login", userlogin);
  };
}
export default ApiService;
