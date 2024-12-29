'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'MobileNo', accessor: 'mobileno' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Occupation', accessor: 'occupation' },
  { Header: 'Address', accessor: 'address' },
];

const Table = () => {
  const [filterInput, setFilterInput] = useState('');
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState('');

  const getUserId = () => {
    const userJson = localStorage.getItem('userInfo');

    // Parse the JSON string to get the object
    if (userJson) {
      const userInfo = JSON.parse(userJson);
      getTableInfo(userInfo?.userId);
      setUserInfo(userInfo);
    } else {
      console.log('No user found in localStorage');
    }
  };

  const getTableInfo = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/ifa/clientInfo/${userId}`);
      console.log('Response data---', response);
      setData(response?.data?.data[0]?.clientInfo || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Input */}
      <div className="mb-6 flex justify-center mt-8">
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search table..."
          className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-6 text-left font-semibold text-sm cursor-pointer"
                  >
                    {column.render('Header')}
                    <span className="ml-2">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? '🔽'
                          : '🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr key={key} {...rowProps} className="hover:bg-gray-100 transition duration-200">
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...cellProps} className="py-3 px-6 border-b text-sm text-gray-700">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
