import React, { useEffect, useRef } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useHistory  } from "react-router-dom";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../utils/apiConfig";
import "./Dheader.css";


const Header = () => {
  const Logout_API = ENDPOINTS.LOGOUT_REQUEST;
  const sessionid = sessionStorage.getItem("sessionid");
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(Logout_API, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: sessionid,
        }),
      });

      const resData = await response.json();

      if (resData.StatusCodes) {
        if (resData.StatusCodes === "U00") {
          sessionStorage.removeItem("sessionid");
          localStorage.removeItem('clientId');
          navigate(`/login`);
        } else {
          alert(resData.message);
        }
      } else {
        // Handle unexpected response structure
        console.error("Unexpected response structure:", resData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  


  return (
    <div>
      <header>
        <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-white px-5">
          <div className="navbar-brand" href="">
            <img
              src="https://i.ibb.co/GTr3w2M/logo.webp"
              alt="logo"
              width="150"
              height="25"
            />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item my-auto">
                <Link className="nav-link" to="/docs">API Docs</Link>

                {/* <a href="api" className="nav-link">
                  API Docs
                </a> */}
              </li>
              <li className="nav-item my-auto ">
                <Link className="nav-link"  to="/kybform">Status</Link>
                {/* <a href="kybform" className="nav-link">
                  Status
                </a> */}
              </li>

              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="Secondary'" id="dropdown-basic">
                    <img
                      src="https://i.ibb.co/WKxztwB/profile.png"
                      alt="imageAvtar"
                    ></img>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/userprofile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/account">Setting</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="sidebar sidebar-collapse" id="navbarSupportedContent">
        <ul>
          <li className="active">
            <Link exact to="/dashboard">
              <i className="fa fa-home bg-white text-dark rounded-circle fa-lg mr-2"></i>
              Home
            </Link>
          </li>
          <li className="">
            <Link exact to="/Virtualaccount">
              <span>
                <i className="fa fa-bank bg-blue p-xy rounded-circle fa-lg mr-2"></i>
                Virtual Account
              </span>
            </Link>
          </li>
          <li className="">
            <Link to="/upi" >
              <i className="fa fa-cube bg-primary rounded-circle fa-lg mr-2"></i>
              UPIS
            </Link>
          </li>
          <li className="">
            <Link to="/reports">
              <i className="fa fa-file bg-pink rounded-circle fa-lg mr-2"></i>
              Reports
            </Link>
          </li>
          <li className="">
            <Link to="/invoices">
              <i className="fa fa-file bg-purple rounded-circle fa-lg mr-2"></i>
              Invoices
            </Link>
          </li>
          <li className="">
            <Link to="/account">
              <i className="fa fa-cog bg-success rounded-circle fa-lg mr-2"></i>
              Settings
            </Link>
          </li>
          <li className="">
            <Link onClick={handleLogout} to='/'>
             <i
                className="fa fa-power-off bg-warning rounded-circle fa-lg mr-2"
               
              ></i>
              Logout
            </Link>
          </li>
        </ul>
        <div className="sidebar-card">
          <div className="card-body">
            <img src="https://i.ibb.co/PtMRfwP/card-img.png" alt="card-img" />
            <h3>Got Premium</h3>
            <p>Lots of Service</p>
            <button className="btn bg-white btn-rounded">Subscribe Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;