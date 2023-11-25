import React from 'react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

import axios from 'axios';

const ManageContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    // const [pending, setPending] = useState(true);
    console.log(user.email)
    const contestUrl = `/contest`
    console.log(contestUrl)
    const { data: allContest = [], refetch } = useQuery({
        queryKey: ['managecontest'],
        queryFn: async () => {
            const res = await axiosPublic.get(contestUrl);
            return res.data;
        }
    })


    const [records, setRecords] = useState(allContest);


    console.log(records)
    const handleDelete = (name, id) => {
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

                axiosSecure.delete(`/contest/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `Contest has been deleted.`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    const handleConfirm=(id)=>{
        Swal.fire({
            title: "Are you sure you want to confirm?",
            text: "!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.put(`/contest/admin/${id}`, {contest_status:'Accepted'})
                .then(response => {
                    refetch();
                    Swal.fire({
                        title: "Confirmed!",
                        text: `Contest has been Accepted.`,
                        icon: "success"
                    });
                })
                .catch(error => {
                  console.error('Update failed:', error.response ? error.response.data : error.message);
                });
                       
                    
            }
        });
    }




    const columns = [
        {
            name: 'Sl',
            selector: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Title",
            selector: row => row.contest_name,
            wrap: true
        },
        {
            name: "Category",
            selector: row => row.contest_category,
        },
        {
            name: "Creator",
            selector: row => row.contest_creator,
            wrap: true
        },
        {
            name: "Price",
            selector: row => row.contest_price,
            width: "80px"
        },
        {
            name: "Prize",
            selector: row => row.contest_prize,
            width: '80px'
        },
        {
            name: "Status",
            selector: row => row.contest_status,
            width: '100px'
        },
        {
            name: "Delete",
            cell: (row) => (

                <button
                    className="btn btn-secondary hover:btn-accent btn-xs"
                    onClick={() => handleDelete(row.name, row._id)}
                >
                    Delete
                </button>
            ),
        },
        {
            name: "Confirm",
            cell: (row) => (

                <button
                    className="btn btn-secondary hover:btn-accent btn-xs"
                    onClick={() => handleConfirm(row._id)}
                >
                    Confirm
                </button>
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
                title="Manage Contests"
                columns={columns}
                data={allContest}
                searchable={true}
                searchPlaceholder="Type to search..."
                pagination
                // progressPending={pending}
                progressComponent={<CustomLoader />}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}

            />
        </>
    );
};

export default ManageContest;