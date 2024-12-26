import React, { useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'MobileNo', accessor: 'mobileno' },  
    { Header: 'Email', accessor: 'email' },
    { Header:'Occupation',accessor:'occupation'},
    { Header:'Address',accessor:'address'}
  
  ];
const Table = ({ data = [] }) => { // Default to empty array if no data is passed
    console.log("Data----",data);
    
  const [filterInput, setFilterInput] = useState('');
  
  // Ensure that the data passed to the table is an array
  if (!Array.isArray(data)) {
    console.error('Data passed to Table is not an array');
    return <div>Error: Data should be an array</div>;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,  // Column definitions remain the same
      data,     // Pass the data prop to the useTable hook
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
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
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
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100 transition duration-200">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-3 px-6 border-b text-sm text-gray-700">
                      {cell.render('Cell')}
                    </td>
                  ))}
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
