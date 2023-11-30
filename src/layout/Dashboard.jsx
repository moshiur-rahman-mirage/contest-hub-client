
import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaBook, FaBookOpen, FaCalendar, FaChartLine, FaHome, FaList, FaPaypal, FaRegHourglass, FaSearch, FaShoppingCart, FaUser, FaUsers } from 'react-icons/fa';
import useCreator from '../hooks/useCreator';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
const Dashboard = () => {
    const { brandName, user, logout } = useContext(AuthContext)
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();
  console.log(user.email)
const email=user.email
    const axiosSecure = useAxiosSecure();
    const userUrl=`users/${email}`
    // console.log(email)
    const { data: userData = [], refetch } = useQuery({
      queryKey: ['singleUser'],
      queryFn: async () => {
          const res = await axiosSecure.get(userUrl);
        //   console.log(res)
          return res.data;
      }
  })

 console.log(userData[0]?._id)

    return (



        <div className='flex'>
            <div className="w-52 min-h-screen bg-primary">
                <ul className="menu md:p-4 ">
                    {isAdmin && <>

                        <li >
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/users">
                                <FaUser />
                                Manage Users</NavLink>
                        </li>

                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/managecontest">
                                <FaBookOpen />
                                Manage Contest</NavLink>
                        </li>
                    </>
                    }

                    {isCreator && <>
                        <li >
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/addcontest">
                                <FaUsers />
                                Submit Contest</NavLink>
                        </li>
                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to={`/dashboard/mycontest`}>
                                <FaBookOpen />
                                My Contest</NavLink>
                        </li>
                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/winner">
                                <FaBookOpen />
                                Select Winner</NavLink>
                        </li>
                    </>
                    }

                    <li >
                        <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/home">
                            <FaHome />
                            Dashboard Home</NavLink>
                    </li>


                    {(!isCreator && !isAdmin) &&
                    <>
                        <li >
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to={`/dashboard/participated/${userData[0]?._id}}`}>
                                <FaUsers />
                               My Participated Contest</NavLink>
                        </li>
                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/winning">
                                <FaBookOpen />
                                My Winning Contest</NavLink>
                        </li>
                       
                    </>
                    }
                     <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/profile">
                                <FaBookOpen />
                                My Profile</NavLink>
                        </li>

                </ul>
            </div>

            <div className="flex-1 pl-8 pt-2">
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;