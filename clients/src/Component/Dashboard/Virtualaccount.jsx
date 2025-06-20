import React, { useEffect, useState, useCallback } from "react";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import "./Virtualaccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import VirtualAccountTable from "./commonComponents/VirtualAccountTable"; // Adjust the path as necessary
import { ENDPOINTS } from "../../utils/apiConfig";
import Pagination from "../Pagination";
import { FiSearch } from "react-icons/fi";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";

function VirtualAccount() {
  const [acList, setAcList] = useState([]);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isFetching, setIsFetching] = useState(false);

  const [searchText, setSearchText] = useState("");

  const fetchData = useCallback(
    async (page = 1, loadMore = false) => {
      setLoader(true);
      try {
        const currentDate = new Date().toISOString();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // Adjust range as needed
        const startDateISO = startDate.toISOString();
        const response = await axios.post(ENDPOINTS.GET_VIRTUAL_ACCOUNT_LIST, {
          range: [startDateISO, currentDate],
          pagination: {
            skip: (page - 1) * (itemsPerPage ? itemsPerPage : 5),
            limit: itemsPerPage ? itemsPerPage : 5,
          },
          sessionid: sessionid,
        });
        setLoader(false);

        const responseData = await response.data;

        const resDataT = responseData.split("[");
        const resDataPg = responseData.split(",");
        let dataCount = resDataPg[3].replace(/\\/g, "");
        let dataCurentP = resDataPg[4].replace(/\\/g, "").replace("}", "");
        console.log("Count data: ", dataCount.replace('"totalCount":', ""));
        console.log(
          "Pagination data: ",
          dataCurentP.replace('"currentPage":', "")
        );
        var dataT = JSON.stringify(resDataT[1].replace("]", ""));
        setTotalItems(dataCount.replace('"totalCount":', ""));
        setItemsPerPage(responseData.itemsPerPage);

        setCurrentPage(dataCurentP.replace('"currentPage":', ""));

        if (!loadMore) {
          setAcList(
            JSON.parse("[" + JSON.parse(dataT) + "]").slice(0, itemsPerPage)
          );
        } else {
          setAcList((prevList) => [
            ...prevList,
            ...JSON.parse("[" + JSON.parse(dataT) + "]"),
          ]);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error:", error);
      }
    },
    [sessionid, itemsPerPage]
  );

  const toggleStatus = async (account) => {
    try {
      let accountNumber = account.AC_id;
      const response = await fetch(ENDPOINTS.UPDATE_VIRTUAL_ACCOUNT_STATUS, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AC_id: accountNumber,
          sessionid: sessionid,
        }),
      });

      const resData = await response.json();
      if (resData && resData.StatusCodes === "00") {
        setAcList((prevList)=>
         prevList.map((item) => 
          item.AC_id === accountNumber ? {...item, status: item.status === "enabled" ? "disabled" : "enabled" }
              : item
          )
        );
        fetchData(currentPage); // Refresh the data after updating the status
      } else {
        console.log("status code not match")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    fetchData(currentPage + 1, true).then(() => {
      setIsFetching(false);
      setCurrentPage((prevPage) => prevPage + 1);
    });
  }, [isFetching, currentPage, fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchAcc = async () => {
    setLoader(true);

    try {
      const response = await fetch(ENDPOINTS.SEARCH_VIRTUAL_ACC, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: sessionid,
          AC_id: searchText,
        }),
      });

      const resData = await response.json();
      setLoader(false);

      if (resData.StatusCodes) {
        if (resData.StatusCodes === "00") {
          // Convert the single object response to an array
          const responseArray = [resData.responsed];
          setAcList(responseArray);
        } else {
          console.log(resData.mess.message);
        }
      }
    } catch (error) {
      setLoader(false);
      console.error("Error during account search:", error);
    }
  };
  // Timeout Activity
  const isInactive = useInactivityTimeout(600000); // 10 minutes
  let navigate = useNavigate();

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
          <div className="top bg-white mt-0 p-2">
            <DashboardTopbar />
          </div>

          <div className="row mb-3">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="card pb-0 account-details border-0 shadow-lg">
                <div className="row">
                  <div className=" col-xl-4 col-lg-4 col-md-12 col-12">
                    <h4 className="bg-transparent mt-0 p-3">
                      Virtual Accounts
                    </h4>
                  </div>

                  <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                    <div className="d-flex justify-content-end align-items-center pt-2">
                      {/* <div className="d-flex mr-2">
                        <input
                          type="text"
                          className="searchTerm"
                          placeholder="Search ID/Ref Number"
                          value={searchText}
                          onChange={(e) => {
                            setSearchText(e.target.value);
                          }}
                        />
                        <button
                          className="searchIconBtn"
                          onClick={() => {
                            console.log(searchText);
                            handleSearchAcc();
                          }}
                        >
                          <FiSearch />
                        </button>
                      </div> */}
                      <button className="btn btn1 mr-2 btn-outline-secondary">
                        Add Virtual Account<i className="fa fa-plus ml-2"></i>
                      </button>
                      <button className="btn btn1 mr-2 btn-outline-secondary">
                        Export <i className="fa fa-external-link ml-2"></i>
                      </button>
                      <button className="btn btn1 bg-dark text-white mr-2">
                        Filter <i className="fa fa-filter ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    {loader ? (
                      <div className="text-center p-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                      <VirtualAccountTable
                      data={acList}
                      toggleStatus={toggleStatus}
                    />
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      onPageChange={handlePageChange}
                    />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dfooter />
        </div>
      </div>
    </div>
  );
};

export default VirtualAccount;