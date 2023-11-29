
import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaBook, FaBookOpen, FaCalendar, FaChartLine, FaHome, FaList, FaPaypal, FaRegHourglass, FaSearch, FaShoppingCart, FaUser, FaUsers } from 'react-icons/fa';
import useCreator from '../hooks/useCreator';
import useAdmin from '../hooks/useAdmin';
const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();

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
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/mycontest">
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
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/participated">
                                <FaUsers />
                               My Participated Contest</NavLink>
                        </li>
                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/winning">
                                <FaBookOpen />
                                My Winning Contest</NavLink>
                        </li>
                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/profile">
                                <FaBookOpen />
                                My Profile</NavLink>
                        </li>
                    </>
                    }




                </ul>
            </div>

            <div className="flex-1 pl-8 pt-2">
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;