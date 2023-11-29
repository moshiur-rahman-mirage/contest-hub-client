import React from 'react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useNavigate } from 'react-router-dom';
import UpdateModal from '../UpdateModal/UpdateModal';

const MyContest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [selectedData, setSelectedData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [pending, setPending] = useState(true);
    console.log(user.email)
    const contestUrl = `/contest?contest_creator=${user.email}`
    console.log(contestUrl)
    const { data: mySubmittedContest = [], refetch } = useQuery({
        queryKey: ['mycontest'],
        queryFn: async () => {
            const res = await axiosPublic.get(contestUrl);
            return res.data;
        }
    })

    console.log(mySubmittedContest)
    const [isActive, setActive] = useState('');



    // console.log(records)
    const handleDelete = (contest_status, id) => {
        if (contest_status === 'Accepted') {
            Swal.fire({
                title: "Already Accepted",
                text: "You won't be able to delete this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                // confirmButtonText: "Yes, delete it!"
            })
        } else {
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
    }


    const navigateSubmission = (id) => {
        navigate(`/dashboard/contestsubmitted/${id}`);
    };


    const handleUpdate = (contest_status, id) => {
        if (contest_status === 'Accepted') {
            Swal.fire({
                title: "Already Accepted",
                text: "You won't be able to delete this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                // confirmButtonText: "Yes, delete it!"
            })
        } else {
            console.log('hello')
        }
    }

    const handleRowClicked = (row, status) => {
        if (status === 'Accepted') {
            Swal.fire({
                title: "Already Accepted",
                text: "You won't be able to delete this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                // confirmButtonText: "Yes, delete it!"
            })
        } else {
            setSelectedData(row);
            setIsModalOpen(true);
        }
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
                    className="btn btn-secondary hover:btn-accent btn-xs "
                    onClick={() => handleRowClicked(row, row.contest_status)}
                >
                    Update
                </button>
            ),
        },
        {
            name: "Delete",
            cell: (row) => (

                <button
                    className="btn btn-secondary hover:btn-accent btn-xs"
                    onClick={() => handleDelete(row.contest_status, row._id)}
                >
                    Delete
                </button>
            ),
        },
        {
            name: "See Submission",
            cell: (row) => (

                <button
                    className="btn btn-secondary hover:btn-accent btn-xs"
                    onClick={() => navigateSubmission(row._id)}
                >
                    See Submission
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
                title="My Submitted Contests"
                columns={columns}
                data={mySubmittedContest}
                searchable={true}
                searchPlaceholder="Type to search..."
                pagination
                // onRowClicked={handleRowClicked}
                progressComponent={<CustomLoader />}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}

            />
            {isModalOpen && (
                <UpdateModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    selectedData={selectedData}
                />
            )}
        </>
    );
};

export default MyContest;