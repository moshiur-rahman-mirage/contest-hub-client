import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CustomLoader from '../../components/CustomLoader/CustomLoader';




const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [pending, setPending] = useState(true);
    const userUrl = '/users'

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(userUrl);
            setPending(false);
            return res.data;
        }
    })





    const handleMakeAdmin = (name, _id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${_id}`)
                    .then(res => {

                        if (res.status == 200) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${name} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        }
        )
    }
    const handleMakeCreator = (name, _id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/creator/${_id}`)
                    .then(res => {
console.log(res)
                        if (res.status == 200) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${name} is a creator Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        }
        )
    }





    const handleDeleteUser = (name, id) => {
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

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} has been deleted.`,
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
            name: "Name",
            selector: row => row.name,

        },
        {
            name: "Email Address",
            selector: row => row.email,
        },
        {
            name: "Make Admin",
            cell: (row) => (
                row.role === 'admin' ? <h1 className=''>Admin </h1> :
                    <button
                        className="btn btn-secondary hover:btn-accent btn-xs"
                        onClick={() => handleMakeAdmin(row.name, row._id)}
                    >
                        Make Admin
                    </button>
            ),
        },
        {
            name: "Make Creator",
            cell: (row) => (
                row.role === 'creator' ? <h1 className=''>Creator </h1> :
                    <button
                        className="btn btn-secondary hover:btn-accent btn-xs"
                        onClick={() => handleMakeCreator(row.name, row._id)}
                    >
                        Make Creator
                    </button>
            ),
        },
        {
            name: "Delete",
            cell: (row) => (

                <button
                    className="btn btn-secondary hover:btn-accent btn-xs"
                    onClick={() => handleDeleteUser(row.name, row._id)}
                >
                    Delete
                </button>
            ),
        }

    ]

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

            <div style={{ backgroundColor: '#555555' }}>
                <DataTable
                    title="User List"
                    columns={columns}
                    data={users}
                    searchable={true}
                    searchPlaceholder="Type to search..."
                    pagination
                    progressPending={pending}
                    progressComponent={<CustomLoader />}
                    customStyles={customStyles}

                />
            </div>
        </>
    );
};

export default Users;