import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dheader from '../Dheader';
import Dfooter from '../Dfooter';
import './Invoices.css';
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";

function Invoices(){
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
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="card pb-0 account-details border-0 shadow-lg">
                                <h4 className="bg-transparent mt-0 p-3">Invoices</h4>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered ">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Number</th>
                                                    <th>Month</th>
                                                    <th>Generated At</th>
                                                    <th>Charges</th>
                                                    <th>GST</th>
                                                    <th>Total Amount</th>
                                                    <th>Download Report</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>HYP-INV-2022-06-42073</td>
                                                    <td>June 2022</td>
                                                    <td>01-July-2022</td>
                                                    <td>₹ 8</td>
                                                    <td>₹ 1.44</td>
                                                    <td>₹ 9.44</td>
                                                    <td><a href="">Download</a></td>
                                                </tr>
                                                <tr>
                                                    <td>HYP-INV-2022-05-39770</td>
                                                    <td>May 2022</td>
                                                    <td>01-June-2022</td>
                                                    <td>₹ 48</td>
                                                    <td>₹ 8.44</td>
                                                    <td>₹ 56.44</td>
                                                    <td><a href="">Download</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>       
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

export default Invoices;