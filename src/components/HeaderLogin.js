import { useState } from 'react';
import Cookies from 'universal-cookie';

import errortrans from "../translate/error";

const HeaderLogin = (props)=>{
    
    return(
    <header className="main-header">
        <div className="container position-sticky z-index-sticky top-0">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                <div className="container-fluid ps-2 pe-0">
                  <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " 
                    href="../pages/dashboard.html">
                    Admin Panel
                  </a>
                  <button className="navbar-toggler shadow-none ms-2" type="button"
                  onClick={()=>console.log("navbar")}>
                    <span className="navbar-toggler-icon mt-2">
                      <span className="navbar-toggler-bar bar1"></span>
                      <span className="navbar-toggler-bar bar2"></span>
                      <span className="navbar-toggler-bar bar3"></span>
                    </span>
                  </button>
                  <div className="collapse navbar-collapse" id="navigation">
                    <ul className="navbar-nav mx-auto">
                      <li className="nav-item">
                        <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                          <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link me-2" href="../pages/profile.html">
                          <i className="fa fa-user opacity-6 text-dark me-1"></i>
                          Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link me-2" href="../pages/sign-up.html">
                          <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                          Sign Up
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link me-2" href="../pages/sign-in.html">
                          <i className="fas fa-key opacity-6 text-dark me-1"></i>
                          Sign In
                        </a>
                      </li>
                    </ul>
                    <ul className="navbar-nav d-lg-flex d-none">
                      <li className="nav-item d-flex align-items-center">
                        <a className="btn btn-outline-primary btn-sm mb-0 me-2" target="_blank" 
                            href="#">Support</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="btn btn-sm mb-0 me-1 bg-gradient-dark">Visit Site</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>    
    </header>
    )
}
export default HeaderLogin