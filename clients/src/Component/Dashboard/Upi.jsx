/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import "./Upi.css";
import { useNavigate } from "react-router-dom";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import UpiListTable from "./commonComponents/UpiListTable";
import { ENDPOINTS } from "../../utils/apiConfig";
import Pagination from "../Pagination";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";

function Upi() {
  const [upiList, setUpiList] = useState([]);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
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
        const response = await axios.post(ENDPOINTS.GET_UPI_LIST, {
          range: [startDateISO, currentDate],
          pagination: {
            skip: (page - 1) * (itemsPerPage ? itemsPerPage : 10),
            limit: itemsPerPage ? itemsPerPage : 10,
          },
          sessionid: sessionid,
        });
        setLoader(false);

        const responseData = response.data;

        console.log("Result: ", responseData.data);

        const resDataT = responseData.split("[");
        const resDataPg = responseData.split(",");
        let dataCount = resDataPg[3].replace(/\\/g, "");
        let dataCurrentPage = resDataPg[4].replace(/\\/g, "").replace("}", "");
        console.log("Count data: ", dataCount.replace('"totalCount":', ""));
        console.log(
          "Pagination data: ",
          dataCurrentPage.replace('"currentPage":', "")
        );
        var dataT = JSON.stringify(resDataT[1].replace("]", ""));
        setTotalItems(dataCount.replace('"totalCount":', ""));
        setItemsPerPage(responseData.itemsPerPage);

        setCurrentPage(dataCurrentPage.replace('"currentPage":', ""));

        const parsedData = JSON.parse("[" + JSON.parse(dataT) + "]");

        if (!loadMore) {
          setUpiList(parsedData.slice(0, itemsPerPage));
        } else {
          setUpiList((prevList) => [...prevList, ...parsedData]);
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
      let upiID = account.upi_id;
      const response = await fetch(ENDPOINTS.UPDATE_UPI_ID_STATUS, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upi_id: upiID,
          sessionid: sessionid,
        }),
      });

      const resData = await response.json();
      if (resData && resData.StatusCodes === "00") {
        // Updating the specific item in the state
        setUpiList((prevList) =>
          prevList.map((item) =>
            item.upi_id === upiID
              ? { ...item, status: item.status === "enabled" ? "disabled" : "enabled" }
              : item
          )
        );

        // Re-fetch data to ensure consistency
        fetchData(currentPage); // Refresh the data after updating the status
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(1);
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
    });
  }, [isFetching, fetchData, currentPage]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchUpi = async () => {
    setLoader(true);

    try {
      const response = await fetch(ENDPOINTS.SEARCH_UPI_ID, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: sessionid,
          upi_id: searchText,
        }),
      });

      const resData = await response.json();
      setLoader(false);

      if (resData.StatusCodes) {
        if (resData.StatusCodes === "00") {
          // Convert the single object response to an array
          const responseArray = [resData.responsed];
          setUpiList(responseArray);
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

          <div class="row">
            <div class="col-lg-12 col-md-12 col-12">
              <div class="card pb-0 account-details border-0 shadow-lg">
                <div class="row">
                  <div class="col-xl-4 col-lg-12 col-md-12 col-12">
                    <h4 class="bg-transparent mt-0 p-3">UPIs</h4>
                  </div>
                  <div class="col-xl-8 col-lg-12 col-md-12 col-12">
                    <div class="d-flex justify-content-end align-items-center pt-2">
                      {/* <div class="d-flex mr-2">
                        <input
                          type="text"
                          class="searchTerm"
                          placeholder="Search ID/Ref Number"
                          value={searchText}
                          onChange={(e) => {
                            setSearchText(e.target.value);
                          }}
                        />
                        <button
                          class="searchIconBtn"
                          onClick={() => {
                            console.log(searchText);
                            handleSearchUpi();
                          }}
                        >
                          <FiSearch />
                        </button>
                      </div> */}
                      <button class="btn btn1 mr-2 btn-outline-secondary">
                        UPI Prefixes
                        <i class="fa fa-address-book ml-2"></i>
                      </button>
                      <button class="btn btn1 mr-2 btn-outline-secondary">
                        Create UPI<i class="fa fa-plus ml-2"></i>
                      </button>
                      <button class="btn btn1 bg-dark text-white mr-2">
                        Filter <i class="fa fa-filter ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body p-3">
                  <div class="table-responsive">
                    {loader ? (
                      <div class="text-center p-5">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UpiListTable
                          data={upiList}
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
}

export default Upi;