import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const ParticipatedContest = () => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const myJoinUrl = `/user/contest?participant=${user.email}`
    const { data: myJoinContest = [], refetch } = useQuery({
        queryKey: ['myParticipant'],
        queryFn: async () => {
            const res = await axiosSecure.get(myJoinUrl);
            return res.data;
        }
    })

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
                title="My Participated Contests"
                columns={columns}
                data={myJoinContest}
                searchable={true}
                searchPlaceholder="Type to search..."
                pagination
                // onRowClicked={handleRowClicked}
                progressComponent={<CustomLoader />}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}

            />

        </>
    );
};

export default ParticipatedContest;