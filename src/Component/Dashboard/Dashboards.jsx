import React, { useState, useEffect, useContext } from "react";
import "./Dashboards.css";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import lodingImg from "../../assets/img/loading.gif";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../context/ApplicationContext"; 
import { ENDPOINTS } from "../../utils/apiConfig";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import { Button } from "@mui/material";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";

function Dashboard() {
  const { setKycStatus } = useContext(ApplicationContext);
  const dash_index = ENDPOINTS.DASH_BOARD;
  const add_upi = ENDPOINTS.CREATE_UPI_ID;
  const add_acc = ENDPOINTS.CREATE_VIRTUAL_BANK_ACCOUNT;
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [dashboardIndex, setDashboardIndex] = useState({});
  const [mainBalance, setMainBalance] = useState("");
  const [totalSettalment, setTotalSettalment] = useState("");
  const [upiID, setUpiId] = useState("");
  const [accountDetails, setAccountDetials] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    dashboardIndexData();
  },[sessionid]);

  const dashboardIndexData = async () => {
    setLoader(true);
    try {
      const response = await fetch(dash_index, {
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
      setLoader(false);

      if (resData.mess) {
        if (resData.mess.StatusCodes === "DI00") {
          setDashboardIndex(resData.mess);
          setMainBalance(resData.mess.mainbalance);
          setTotalSettalment(resData.mess.settelment);
          setKycStatus(resData.mess.kyc_status); 
        } else {
          // navigate(`/login`);

        }
        if (resData.mess.kyc_status === "N")
        {
          const myModal = new window.bootstrap.Modal(
            document.getElementById("docsReqModal")
          );
          myModal.show();
        }
      } else {
        // Handle unexpected response structure
        console.error("Unexpected response structure:", resData);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error :", error);
    }
  };


  const add_UPI_id = async () => {
    if (dashboardIndex.kyc_status === "N") {
      const myModal = new window.bootstrap.Modal(
        document.getElementById("docsReqModal")
      );
      myModal.show();
    }
    else{
      setLoader(true);
      try {
        const response = await fetch(add_upi, {
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
        setLoader(false);

        if (resData.StatusCodes) {
          if (resData.StatusCodes === "00") {
            setUpiId(resData.responsed.upi_id);
            const myModal = new window.bootstrap.Modal(
              document.getElementById("upiModal")
            );
            myModal.show();
          } else {
            console.log("If status code not 00, then go to this else condition");
          }
        } else {
          // Handle unexpected response structure
          alert(resData.mess.message);
          console.error("Unexpected response structure:", resData);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error during OTP verification:", error);
      }
    }
  };

  const add_Account = async () => {
    if (dashboardIndex.kyc_status === "N") {
      const myModal = new window.bootstrap.Modal(
        document.getElementById("docsReqModal")
      );
      myModal.show();
    }
    else {
      setLoader(true);
      try {
        const response = await fetch(add_acc, {
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
        setLoader(false);

        if (resData.StatusCodes) {
          if (resData.StatusCodes === "00") {
            setAccountDetials(resData.responsed);
            const myModal = new window.bootstrap.Modal(
              document.getElementById("accountDetailsModal")
            );
            myModal.show();
          } else {
            console.log("If status code not 00, then go to this else condition");
          }
        } else {
          // Handle unexpected response structure
          alert(resData.mess.message);
          console.error("Unexpected response structure:", resData);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error during OTP verification:", error);
      }
    }
  };

  const copyToClipboard = async () => {
    const tokenInput = document.getElementById("upi_id");
    try {
      await navigator.clipboard.writeText(tokenInput.innerHTML);
      alert("UPI ID copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  // Timeout activity
  const isInactive = useInactivityTimeout(600000); // 10 minutes
  

  useEffect(() => {
    if (isInactive) {
      sessionStorage.removeItem("sessionid");
      navigate("/login");
    }
  }, [isInactive, navigate]);
  

  return (
    <div>
      <div className="wrapper">
        <Dheader />
        <div className="main-content">
          <div className="top bg-white rounded-lg p-2 dashboardTopbar">
            <DashboardTopbar />
          </div>

          <div className="row">
            <div className="card account-card mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-12 my-auto">
                    <p>Account Balance</p>
                    <h3>{mainBalance }</h3>
                  </div>
                  <div className="col-lg-5 col-md-5 col-12 my-auto">
                    <p>Total Settlement</p>
                    <h3>{totalSettalment}</h3>
                  </div>
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="img-bg">
                      <img
                        src="https://i.ibb.co/Fx8FHCd/account-card-img.png"
                        alt="account-card-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-4 col-12">
              <button
                type="button"
                className="btn btn-light-blue"
                onClick={add_Account}
              >
                <i className="fa fa-plus"></i> Add New Account
              </button>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <button type="button" className="btn btn-light-grey">
                <i className="fa fa-user"></i> Settlements
              </button>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <button
                type="button"
                className="btn btn-light-pink"
                onClick={add_UPI_id}
              >
                <i className="fa fa-plus"></i> Add New UPI ID
              </button>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="card pb-0 account-details border-0 shadow-lg">
                <h4 className="card-header mt-0 py-3">
                  Transfer funds to the following account to use PayUGuru
                </h4>
                <div className="card-body p-0 table-responsive">
                {dashboardIndex.kyc_status !== "Y" ? (
                  <p className="text-dark text-start ps-5">
                    <i className="fa fa-info-circle"></i> Please update your KYC.
                  </p>
                ) : (
                  <table className="table table-borderless account-table">
                    <tbody>
                      <tr>
                        <td>
                          Company Name:<b> Arena Itech</b>
                        </td>
                        <td>Modes UPI/IMPS/NEFT/RTGS</td>
                      </tr>
                      <tr>
                        <td>
                          A/C No:<b> 708090731181</b>{" "}
                          <i className="fa fa-copy"></i>
                        </td>
                        <td>
                          UPI ID:<b> xxxxxxxx@cccc</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          IFSC:<b> YESB0CMSN0C</b>{" "}
                          <i className="fa fa-copy"></i>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                )}
                  
                </div>
              </div>
            </div>
          </div> */}

          <div className="row mt-3">
      <div className="col-lg-12 col-md-12 col-12">
        <div className="card pb-0 account-details border-0 shadow-lg">
          <div className="card-header">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                <h5 className="font-weight-bold mt-0">
                  Account Statement
                </h5>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                <p className="float-right">
                  *Date: 8 Nov-23, 0:00:00 to 2 Dec-23, 23:59:59
                </p>
              </div>
            </div>
          </div>
          <div className="card-body p-3">
            <div className="table-responsive">
              <table
                id="example"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Transaction Time</th>
                    <th>Transaction Type</th>
                    <th>Payment Mode</th>
                    <th>Transaction Amount</th>
                    <th>Fees & GST</th>
                    <th>Settlement Amount</th>
                    <th>Closing Amount</th>
                    <th>Credit/Debit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>79214204</td>
                    <td>5:40 am</td>
                    <td>Time Activity</td>
                    <td>Visa</td>
                    <td>₹ 5,600.00</td>
                    <td>₹ 1.23</td>
                    <td>₹ 2,500.00</td>
                    <td>₹ 3,666.71</td>
                    <td>₹ 855.00</td>
                    <td>closed</td>
                  </tr>
                  <tr>
                    <td>79212231</td>
                    <td>7:30 am</td>
                    <td>Credit Memo</td>
                    <td>Paypal</td>
                    <td>₹ 16,500.00</td>
                    <td>₹ 5.33</td>
                    <td>₹ 16,500.00</td>
                    <td>₹ 102.00</td>
                    <td>₹ 232,000.00</td>
                    <td>closed</td>
                  </tr>
                  <tr>
                    <td>79214079</td>
                    <td>8:20 am</td>
                    <td>Invoice</td>
                    <td>Mastercard</td>
                    <td>₹ 1,380.00</td>
                    <td>₹ 2.33</td>
                    <td>₹ 349.00</td>
                    <td>₹ 16,500.00</td>
                    <td>₹ 349.00</td>
                    <td>Overdue</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

          <div className="loaderContainer">
            <div className="inputbox text-center loader-box">
              {loader && (
                <img src={lodingImg} alt="loading..." className="loaderImg" />
              )}
            </div>
          </div>

          <Dfooter />
        </div>
      </div>

      {/* create UPI Modal */}
      <div
        className="modal fade docReqModal"
        id="upiModal"
        aria-labelledby="upiModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content docsReqModal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="upiModalLabel">
                Your UPI Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modalBodySection">
              <div className="text-center mb-3">
                <h6>Your UPI ID - </h6>
                <div className="d-flex justify-content-center align-items-center">
                  <h6 id="upi_id" className="me-2">{upiID} </h6>
                      <Button
                        variant="contained"
                        color="success"
                        title="Copy"
                        onClick={copyToClipboard}
                      >
                        <i className="fa fa-copy"></i>
                      </Button>
                </div>
                
                <p className="mt-5 text-success">
                  {" "}
                  Please copy it or save screenshot.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Modal */}
      <div
        className="modal fade docReqModal"
        id="accountDetailsModal"
        aria-labelledby="accountDetailsModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content docsReqModal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="accountDetailsModalLabel">
                Your Account Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modalBodySection">
              <div className="row">
                <div className="col-4">Bank -</div>
                <div className="col-8">{accountDetails.AC_bank}</div>
              </div>
              <div className="row">
                <div className="col-4">IFSC -</div>
                <div className="col-8">{accountDetails.AC_ifsc}</div>
              </div>
              <div className="row">
                <div className="col-4">Swift -</div>
                <div className="col-8">{accountDetails.AC_swift}</div>
              </div>
              <div className="row">
                <div className="col-4">Account ID -</div>
                <div className="col-8">{accountDetails.AC_id}</div>
              </div>

              <p className="mt-5 text-success">
                {" "}
                Please copy it or save screenshot.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;