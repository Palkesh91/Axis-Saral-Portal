import React, { useState } from "react";
import "../Style.css";
import Navbar from "./Navbar";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 
  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:9100/login", {
        username,
        password,
      });

      //const { token, role } = response.data;
      const token = response.data.jwttoken;
      const role = response.data.role;
      const authenticatedUsername = username;

      /** 
       * // JWT Decode library
       * import jwt from 'jwt-decode' // import dependency
...
// some logic
axios.post(`${axios.defaults.baseURL}/auth`, { email, password })
    .then(res => {
      const token = res.data.token;
      const user = jwt(token); // decode your token here
      localStorage.setItem('token', token);
      dispatch(actions.authSuccess(token, user));
    })
    .catch(err => {
      dispatch(actions.loginUserFail());
  }); */

      console.log(token);
      console.log(authenticatedUsername);

      localStorage.setItem("token", token);
      //localStorage.setItem("token", JSON.stringify(token)); //store the token
      localStorage.setItem("username", authenticatedUsername);
      localStorage.setItem("role",role);

      // Debug: Check if the token is stored correctly
      console.log(
        "Token stored in localStorage:",
        localStorage.getItem("token")
      );
      
       if (role === "Manager") {
        navigate("/manager");
      } else if (role === "Hr") {
        navigate("/hr");
      }
      else if (role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
        //setError("Invalid role received");
      }
      //navigate("/employee"); // Replace "/dashboard" with your desired route
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a
          class="navbar-brand"
          href="/"
          style={{ position: "relative", left: "20px" }}
        >
         <strong>AXIS SARAL PORTAL</strong>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            marginBottom: "0",
            left: "41rem",
            position: "absolute",
          }}
        >
          <ul style={{ listStyleType: "none", display: "flex" }}>
            <li style={{ marginRight: "30px" }} onClick={handleHome}>
              Home
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",

            left: "100rem",
            position: "absolute",
          }}
        >
          <button
            style={{
              backgroundColor: "orange",
              borderRadius: "30px",
              width: "80px",
              height: "40px",
              border: "none",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </nav>
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100'>
    <div className='form-container2 p-5 rounded bg-white'>
       <form>
          <h2 className='text-center'>User Login</h2>
          {error ? (
        <p>Invalid email and password</p>
      ) : (<h3></h3>)}
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter email" value={username} onChange={(event) => { setUsername(event.target.value); }}
             />
          </div>
          <br></br>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input type="password"  class="form-control" id="Password" placeholder="Enter Password" value={password} onChange={(event) => {setPassword(event.target.value);}}
            />
          </div>
          <br></br>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={login}>Sign In</button>
          </div>
       </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
