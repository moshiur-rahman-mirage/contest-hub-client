import React from 'react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';

import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import useAuth from '../../hooks/useAuth';




const ParticipatedContest = () => {


const contestData=useLoaderData();

console.log(contestData)


  const columns = [
    {
      name: 'Sl',
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px"
    },
    {
      name: 'Deadline',
      selector: row => row.contestDeadline,
      sortable: true,

    },
    {
      name: "Contest Name",
      selector: row => row.contestName,
    },
    {
      name: "Prize",
      selector: row => row.contestPrize,
      width: '100px'
    },
    ]

const conditionalRowStyles = [

  {
    when: (row) => row.index % 2 === 0,
    style: {
      backgroundColor: 'rgba(120, 0, 0, 0.05)',
    },
  },
];
const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#4CAF50', // Set the background color of the header
      color: 'white', // Set the text color of the header
    },
  },
};
return (
  <>
    {/* <DataTable
      title="My Submitted Contests"
      columns={columns}
      data={contestData}
      pagination
      progressComponent={<CustomLoader />}
      conditionalRowStyles={conditionalRowStyles}
      customStyles={customStyles}

    /> */}

  </>
);
  };

export default ParticipatedContest;