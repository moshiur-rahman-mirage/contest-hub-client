import React from 'react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';

import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CustomLoader from '../../components/CustomLoader/CustomLoader';




const ContestSubmitted = () => {
  const contestData = useLoaderData();


  const axiosSecure = useAxiosSecure();





  const handleUpdate = (user_id, contest_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.patch(`submission/contest-users-winner?userId=${user_id}&contestId=${contest_id}`)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              // refetch();
              Swal.fire({
                title: "Modified!",
                text: `Contest has been Updated.`,
                icon: "success"
              });
              // refetch();
            }
          })
      }

    })
  }

  const columns = [
    {
      name: 'Sl',
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px"
    },
    {
      name: 'User Email',
      selector: row => row.userEmail,
      sortable: true,

    },
    {
      name: 'User Name',
      selector: row => row.userName,
      sortable: true,

    },

    // {
    //   name: "Title",
    //   selector: row => row,
    //   wrap: true
    // },
    {
      name: "Contest Name",
      selector: row => row.contest_name,
    },
    {
      name: "Price",
      selector: row => row.contest_price,
    },
    {
      name: "Prize",
      selector: row => row.contest_prize,
      width: '100px'
    },

    {
      name: "Winner",
      cell: (row) => (
        row.contest_winner===''?
          <button
            className="btn btn-secondary hover:btn-accent btn-xs "
            onClick={() => handleUpdate(row._id, row.contest_id)}
          >
            Winner
          </button>:
          <p>Closed</p>
   
        ),
         
      }



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
    <DataTable
      title="My Submitted Contests"
      columns={columns}
      data={contestData}
      searchable={true}
      searchPlaceholder="Type to search..."
      pagination
      progressComponent={<CustomLoader />}
      conditionalRowStyles={conditionalRowStyles}
      customStyles={customStyles}

    />

  </>
);
  };

export default ContestSubmitted;