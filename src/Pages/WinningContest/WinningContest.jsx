import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import { BallTriangle } from 'react-loader-spinner';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../providers/AuthProvider';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const WinningContest = () => {
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingParticipated, setLoadingParticipated] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  const [participated, setParticipated] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/users/${user.email}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, [user.email, axiosPublic]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        if (userData[0]?._id) {
          const response = await axiosPublic.get(`submission/participated-contests/${userData[0]._id}`);
          setParticipated(response.data);
        }
      } catch (error) {
        console.error('Error fetching participated contests:', error);
      } finally {
        setLoadingParticipated(false);
      }
    };

    if (!loadingUserData) {
      fetchData2();
    }

    return () => {
      // Cleanup if needed
    };
  }, [userData, loadingUserData, axiosPublic]);

  if (loadingParticipated) {
    return <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" visible={true} />;
  }

  const columns = [
    {
      name: 'Sl',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Deadline',
      selector: (row) => row.contestDeadline,
      sortable: true,
    },
    {
      name: 'Contest Name',
      selector: (row) => row.contestName,
    },
    {
      name: 'Prize',
      selector: (row) => row.contestPrize,
      width: '100px',
    },
  ];

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
        backgroundColor: '#4CAF50',
        color: 'white',
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

export default WinningContest;
