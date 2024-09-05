import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Emailotp.css'; 

import { ENDPOINTS } from '../../utils/apiConfig';

let url = ENDPOINTS.VERIFY_EMAIL;

  const EmailVerifyOtp = ({ email }) =>{
    const[otp,setOtp] = useState('');
    const[ message,setMessage ] = useState('');
    const emailVerifyOtp= async () => {
        try {
          const response = await axios.post(url, { email, otp });
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Invalid OTP. Please try again.');
        }
    };
// allow form submission for enter button
  document.addEventListener('keydown', function(event){
  if (event.key === 'Enter') {
    document.getElementById('email-button').click();
  }
  });
  

  return (
    <div>
    
    <section className="mt-5 py-5 enquiry-section1">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2 col-12 "></div>
                <div className="col-lg-6 col-md-8 col-12">
                    <form className="form">
                        <h3 className="text-center">Email Verification</h3>
                        <p className="text-center"><a href="/" className="text-white"><img src="https://i.ibb.co/vzTTh9B/home.png" alt="home-icon"/> Home</a> </p>

                        <div className="inputbox">
                        <label>Enter Your Email OTP</label>
                        <input type="text" id="" name="" value={otp}
                        maxLength="6" onChange={(e) => setOtp(e.target.value)}/>
                         </div>

                         <input type="Submit" value="Resend Otp" className="submit"/>
                         <div className="inputbox text-center">
                        
                        </div>
                        <button type='submit' id='email-button' className="submitButton" onClick={emailVerifyOtp}>
                        Submit
                      </button>
                      {message && <p>{message}</p>}
                         <div className="inputbox text-center">
                        
                        </div>

                         
                    </form>
                </div>
                <div className="col-lg-3 col-md-2 col-12 "></div>
            </div>
        </div>
    </section>
    


    </div>
  )
}

export default EmailVerifyOtp;
