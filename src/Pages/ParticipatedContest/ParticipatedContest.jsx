import React from 'react';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';

import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../providers/AuthProvider';
import { useEffect } from 'react';
import { useContext } from 'react';
import { BallTriangle } from 'react-loader-spinner';




const ParticipatedContest = () => {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext)
  console.log('first', user.email)
  console.log(user)
  const [userData, setUserData] = useState('')
  const [participated, setParticipated] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/users/${user.email}`)
        setUserData(response.data);
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {

    };
  }, []);


  useEffect(() => {
    const fetchData2 = async () => {
      try {
        if((userData[0]._id)){
        const response = axiosPublic.get(`submission/participated-contests/${(userData[0]._id)}`);
        setParticipated(response.data);
        }
        
      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading2(false)
      }
    };
    fetchData2();
    return () => {

    };
  }, []);


  if (loading2) {
    return <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    />
  }
console.log(participated)
  // const {data: myParticipated = [], refetch} = useQuery({
  //     queryKey: ['myparticipated'], 
  //     queryFn: async() =>{
  //         const res = await axiosPublic.get(`submission/participated-contests/${(userData[0]._id)}`);
  //         return res.data;
  //     }
  // })


  // console.log(myParticipated)
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
      <DataTable
        title="My Submitted Contests"
        columns={columns}
        data={participated}
        pagination
        progressComponent={<CustomLoader />}
        conditionalRowStyles={conditionalRowStyles}
        customStyles={customStyles}

      />

    </>
  );
};

export default ParticipatedContest;