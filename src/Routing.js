import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import Main from './Main';
import Loginpage from './Component/Login/Loginpage';
import Registerpage from './Component/Register/Registerpage';
import Emailotp from './Component/Phone/Emailotp';
import Mobileotp from './Component/Phone/Mobileotp';
import Forgotun from './Component/ForgotUP/Forgotun';
import Dashboards from './Component/Dashboard/Dashboards';
import Virtualaccount from './Component/Dashboard/Virtualaccount';
import Upi from './Component/Dashboard/Upi';
import Reports from './Component/Dashboard/Reports';
import Invoices from './Component/Dashboard/Invoices';
import Account from './Component/Dashboard/Account';
import Api from './Component/Dashboard/Api';
import Webhook from './Component/Dashboard/Webhook';
import Userprofile from './Component/Dashboard/Userprofile';
import KybForm from './Component/KycForms/KybForm';
import KycForm from './Component/KycForms/KycForm';
import Enquiry from './Component/Enquiry/Enquiry';
import Success from './Component/Success/Success';
import Otppage from './Component/Otp/Otppage';
import Resetpassword from './Component/Rpassword/Resetpassword';
import AmlPolicy from './Pages/AmlPolicy';
import CookiesPolicy from './Pages/CookiesPolicy';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import RedressalPolicy from './Pages/RedressalPolicy';
import TermsandCondition from './Pages/TermsandCondition';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component
import Docsmain from './docs/Docsmain';

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="login" element={<Loginpage />} />
            <Route path="register" element={<Registerpage />} />
            <Route path="emailotp" element={<Emailotp />} />
            <Route path="mobileotp" element={<Mobileotp />} />
            <Route path="Forgotun" element={<Forgotun />} />
            <Route path="success" element={<Success />} />
            <Route path="otppage" element={<Otppage />} />
            <Route path="Resetpassword" element={<Resetpassword />} />
            <Route path="Amlpolicy" element={<AmlPolicy />} />
            <Route path="CookiesPolicy" element={<CookiesPolicy />} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="RedressalPolicy" element={<RedressalPolicy />} />
            <Route path="TermsandCondition" element={<TermsandCondition />} />
            <Route path="docs" element={<Docsmain/>}/>
            

            {/* Protected Routes */}
            <Route path="/dashboard"  element={
              <ProtectedRoute>
                <Dashboards />
              </ProtectedRoute>
            
            } />
            <Route path="virtualaccount" element={
              <ProtectedRoute>
                <Virtualaccount />
              </ProtectedRoute>
            } />
            <Route path="upi" element={
              <ProtectedRoute>
                <Upi />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="invoices" element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            } />
            <Route path="account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path="api" element={
              <ProtectedRoute>
                <Api />
              </ProtectedRoute>
            } />
            <Route path="webhook" element={
              <ProtectedRoute>
                <Webhook />
              </ProtectedRoute>
            } />
            <Route path="userprofile" element={
              <ProtectedRoute>
                <Userprofile />
              </ProtectedRoute>
            } />
            <Route path="kycform" element={
              <ProtectedRoute>
                <KycForm />
              </ProtectedRoute>
            } />
            <Route path="kybform" element={
              <ProtectedRoute>
                <KybForm />
              </ProtectedRoute>
            } />
            <Route path="enquiry" element={
              <ProtectedRoute>
                <Enquiry />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;