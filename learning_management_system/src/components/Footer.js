import React from "react";

import "../Style.css";

const Footer = () => {
  return (
    <div>
      <div className="d-flex flex-column h-100">
        <footer className="oldContainer w-100 py-4 flex-shrink-0">
          <div className="newcontainer py-4">
            <div className="row gy-4 gx-5">
              <div className="col-lg-4 col-md-6">
                <h5 className="h1 text-white">Axis Saral Portal</h5>
                <h1 className="h6 text-white">
                  This website is a web-based portal for learning management
                  designed for employee.
                </h1>
                <p className="small text-muted mb-0">
                  &copy; Copyrights. All rights reserved.{" "}
                </p>
              </div>
              <div className="col-lg-2 col-md-6">
                <h5 className="text-white mb-3">Connect us</h5>
                <ul className="list-unstyled text-muted">
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">LinkedIn</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6">
                <h5 className="text-white mb-3">Quick links</h5>
                <ul className="list-unstyled text-muted">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Get started</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6">
                <h5 className="text-white mb-3">Newsletter</h5>
                <p className="small text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </p>
                <form action="#">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      className="btn btn-primary"
                      id="button-addon2"
                      type="button"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
