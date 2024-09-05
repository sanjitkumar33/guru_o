/* eslint-disable react-hooks/exhaustive-deps */
// UpiListTable.js
import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useTable } from 'react-table';
import { ENDPOINTS } from '../../../utils/apiConfig';


const UpiListTable = ({ data, toggleStatus  }) => {

  const [search, setSearch] = useState('');
  const [acList, setAcList] = useState([]);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);


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
          AC_id: search,
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

  // Filter data based on search input
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);


  const handleStatusToggle = (rowData) => {
    toggleStatus(rowData); // Call the function from parent
  };

  const columns = React.useMemo(
    () => [
    //   { Header: 'ID', accessor: '_id' },
    {
      Header: 'S.No',
      id: 'row',
      Cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      }
    },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Time', accessor: 'time' },
    //   { Header: 'Timestamp', accessor: 'timestamp' },
      { Header: 'Bank', accessor: 'upi_bank' },
      { Header: 'UPI Address', accessor: 'upi_id' },
      { Header: 'Status', accessor: 'upistatus' },
      { Header: 'Request Type', accessor: 'request_type' },
      {
        Header: 'Action',
        accessor: '  ',
        Cell: ({ row }) => (
          <button
            onClick={() => handleStatusToggle(row.original)}
            style={{
              padding: '5px 10px',
              backgroundColor: row.original.upistatus === 'Y' ? 'green' : 'linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)',
              color: row.original.upistatus === 'N' ? 'black' : 'white',
              border: 'none',
              borderRadius: '25px',
            }}
          >
            {row.original.upistatus === 'Y' ? 'Active' : 'Disable'}
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  return (

    <div>
        <div style={{ margin:'20px',padding: '10px', width: '250px', borderRadius: '4px', textAlign:'center', justifyItems: 'right' ,alignItems:'center' , alignContent:'center' }}> 
          <div className="d-flex mr-2">
                    <input
                        type="text"
                        className="searchTerm"
                        placeholder="Search ID/Ref Number"
                        value={search}
                        onChange={(e) => {
                        setSearch(e.target.value);
                        }}
                        />
                      <button
                        className="searchIconBtn"
                        onClick={() => {
                        console.log(search);
                        handleSearchAcc();
                        }}
                      >
                      <FiSearch />
                      </button>
            </div>
      </div>
    {/* <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        style={{ margin:'20px',padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' ,alignItems:'center' , alignContent:'center' }}
      />
    </div> */}
    <table {...getTableProps()} style={{ border: 'solid 1px blue', width: '100%', overflowY: true }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '5px', textAlign:'center'}}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ background: row.original.upistatus === 'Y' ? 'lightgreen' : 'lightcoral' }}>
            {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                    fontSize: '13px',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
          </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default UpiListTable;