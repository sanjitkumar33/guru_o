import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Mwelcomeverify.css';
import Header from "../../Header";
import Footer from "../../Footer";

const Mwelcomeverify = () => {
  return (
    <div>
      <Header />
      <div className="register-success-container">
      <Link to="/" className="text-white">
      <img
        src="https://demo.payu.guru/favicon_512.png"
        alt="home-icon"
        className="home-icon"
      />
    </Link>
        <h2>Welcome To PayuGuru!</h2>
        <p>Your mobile number has been successfully verified and registered!</p>
        <span>Verify your email</span>
        <p>Please check your email inbox/spam folder to verify your email address.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Mwelcomeverify;