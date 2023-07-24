/*import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../Style.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="homepage-content">
      <div className="cont1">
        <div style={{paddingTop:"20px"}}>
        <h1 style={{fontSize:"50px",fontWeight:"bold"}}>WELCOME TO SARAL PORTAL</h1>
        <h2>Be a part of Saral family</h2>
        </div>
      </div>

      <div className="cont2">
        
        
        
      </div>

      <div className="cont2" style={{alignItems:"center",justifyContent:"center",columnGap:"30px"}}>
        
        
      </div>

      <div className="cont3">
        <div className="">
        </div>
        
      </div>

      <footer>
      <Footer />
      </footer>
      </div>
    </div>
  );
};

export default HomePage; */
import React from "react";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";

const Home1 = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };
  return (
    <div style={{overflowX:"hidden"}}>
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
      <section
        className="section1"
        style={{ width: "100%", height: "50rem", backgroundColor: "black" }}
      >
        
      <div className="cont1">
        <div style={{paddingTop:"20px"}}>
        <h1 style={{fontSize:"50px",fontWeight:"bold"}}>WELCOME TO SARAL PORTAL</h1>
        <h2>Be a part of Saral family</h2>
        </div>
      </div>
      
      </section>
      <section
        className="section2"
        style={{ width: "100%", height: "40rem", backgroundColor: "white" }}
      >
        <br />
        <br />
        <h1 className="service" style={{ textAlign: "center" }}>
          SERVICES
        </h1>
        <div
          style={{
            display: "flex",
            columnGap: "50px",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <div className="service1">
            <br />
            <h2> Data Backup Services</h2>
            <br />

            <p
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                fontSize: "15px",
              }}
            >
              No matter how strong your data security protocol may be, there is
              always a risk of data damage and loss. Since data is such an
              important entity for businesses, they take this aspect rather
              seriously and invest in data backup services. These services
              enable companies and businesses to make copies of their data which
              is then stored off site. This way, if anything goes wrong or the
              data suffers in any way, the companies can always rely on the
              backup and retrieve whatever is needed.{" "}
            </p>
            <br />
          </div>
          <div className="service1">
            <br />
            <h2> Network Security</h2>
            <br />

            <p
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                fontSize: "15px",
              }}
            >
              Data is the backbone for any business and company. Although, data
              is a valuable resource that becomes the crux of many important
              decisions, strategies and business action plans, it also comes
              with a huge responsibility. Companies have to ensure that their
              data as well as the data related to their clients and customers
              remains protected and safeguarded. Therefore, one of the most
              demanded IT support companies for small businesses offers network
              security.{" "}
            </p>
            <br />
          </div>
          <div className="service1">
            <br />
            <h2> Data Storage</h2>
            <br />

            <p
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                fontSize: "15px",
              }}
            >
              Another important service related to data is data storage and
              management. As mentioned earlier, data is important for all
              businesses and companies no matter what their scope and
              background. Therefore one of the highest paying Managed IT
              Services for small business is data storage and management.{" "}
            </p>
            <br />
          </div>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home1;
