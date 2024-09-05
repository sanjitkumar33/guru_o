import React, { useEffect } from "react";
import Dheader from '../Dheader';
import Dfooter from '../Dfooter';
import './Webhook.css';
import { useNavigate } from "react-router-dom";
import ProfileTopbar from "./commonComponents/ProfileTopbar";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";

function Webhook(){

    // Timeout Activity
    const isInactive = useInactivityTimeout(600000); // 10 minutes
    let navigate = useNavigate();

    useEffect(() => {
        if (isInactive) {
         sessionStorage.removeItem("sessionid");
        navigate("/login");
        }
    }, [isInactive, navigate]);
    return(
        <div>
            <div className="wrapper">
                <Dheader/>
                <div className="main-content">
                    <div className="top bg-white mt-0 p-2">
                        <DashboardTopbar />
                    </div>

                    <div className="row">
                        <ProfileTopbar />
                    </div>

                    <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                            <div className="card pb-0 account-details border-0 shadow-lg">
                                <h3 className=" mt-0 p-3">Webhooks Settings</h3>
                                <div className="card-body p-3">
                                    {/* <form action="#" className="user_profile">
                                        <div className="table-responsive">
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <th>Credit UPI</th>
                                                        <td>NOT_CONFIGURED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2 "><i className="fa fa-wrench mr-2"></i>configure</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Credit Virtual Account</th>
                                                        <td>BLOCKED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2"><i className="fa fa-pencil mr-2"></i>Edit</a>
                                                                <a type="button" className="btn btn1 btn-outline-secondary text-danger mr-2"><i className="fa fa-times mr-2"></i>Disable</a>
                                                                <a type="button" className="btn btn1 btn-outline-secondary text-success mr-2"><i className="fa fa-check mr-2"></i>Enable</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bank Account Verification</th>
                                                        <td>NOT_CONFIGURED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2 "><i className="fa fa-wrench mr-2"></i>configure</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Funds Added</th>
                                                        <td>ENABLED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2"><i className="fa fa-pencil mr-2"></i>Edit</a>
                                                                <a type="button" className="btn btn1 btn-outline-secondary text-danger mr-2"><i className="fa fa-times mr-2"></i>Disable</a>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Funds Transfer Status</th>
                                                        <td>ENABLED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2"><i className="fa fa-pencil mr-2"></i>Edit</a>
                                                                <a type="button" className="btn btn1 btn-outline-secondary text-danger mr-2"><i className="fa fa-times mr-2"></i>Disable</a>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Low Balance Alert</th>
                                                        <td>NOT_CONFIGURED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2 "><i className="fa fa-wrench mr-2"></i>configure</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>UPI ID Verification</th>
                                                        <td>NOT_CONFIGURED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2 "><i className="fa fa-wrench mr-2"></i>configure</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>UPI Collection Status</th>
                                                        <td>NOT_CONFIGURED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2 "><i className="fa fa-wrench mr-2"></i>configure</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Invali VA Credit</th>
                                                        <td>NOT_CONFIGURED</td>
                                                        <td>
                                                            <div className="d-flex float-right">
                                                                <a type="button" className="btn btn1 btn-outline-secondary mr-2 "><i className="fa fa-wrench mr-2"></i>configure</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </form>	 */}
                                </div>
                            </div>
                        </div>
                    </div>

                    
                  <Dfooter/>  
                </div>
            </div>
        </div>
    )
}

export default Webhook;