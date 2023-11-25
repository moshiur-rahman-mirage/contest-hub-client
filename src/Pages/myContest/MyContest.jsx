import React from 'react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure'

const MyContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic=useAxiosPublic();
    // const [pending, setPending] = useState(true);
    console.log(user.email)
    const contestUrl = `/contest?contest_creator=${user.email}`
    console.log(contestUrl)
    const { data: mySubmittedContest = [], refetch } = useQuery({
        queryKey: ['mycontest'],
        queryFn: async () => {
            const res = await axiosPublic.get(contestUrl);
            // console.log(res)
            // setPending(false);
            return res.data;
        }
    })
    // console.log(myContest)
console.log(mySubmittedContest)
    const [records, setRecords] = useState(mySubmittedContest);
    // if (records.length < 1) {
    //     setRecords(books)
    // }
// console.log(records)
    // const handleFilter = (e) => {
    //     const newData = books.filter(row => {
    //         return (
    //             row.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //             row.author.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //             row.subject.toLowerCase().includes(e.target.value.toLowerCase()))
    //     })
    //     setRecords(newData);
    // }

console.log(records)
    const handleDeleteBooks = (name, id) => {
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

                axiosSecure.delete(`/books/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `Book has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
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
            name: "Price",
            selector: row => row.contest_price,
        },
        {
            name: "Prize",
            selector: row => row.contest_prize,
            width: '100px'
        },
        {
            name: "Status",
            selector: row => row.contest_status,
            width: '100px'
        },
         {
            name: "Update",
            cell: (row) => (

                <button
                    className="btn btn-secondary hover:btn-accent btn-xs"
                    onClick={() => handleUpdate(row.name, row._id)}
                >
                    Delete
                </button>
            ),
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
// onChange={handleFilter}
    return (
        <>
            <div className="join text-end">
                <div>
                    <div>
                        <input  className="input focus:outline-none input-bordered join-item" placeholder="" />
                    </div>
                </div>
                <div className="indicator">
                    <p className="btn join-item">Search Contest</p>
                </div>
            </div>
            <DataTable
                title="My Submitted Contests"
                columns={columns}
                data={mySubmittedContest}
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

export default MyContest;