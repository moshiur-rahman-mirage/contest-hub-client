
import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaBook, FaBookOpen, FaCalendar, FaChartLine, FaHome, FaList, FaPaypal, FaRegHourglass, FaSearch, FaShoppingCart, FaUser, FaUsers } from 'react-icons/fa';
const Dashboard = () => {


    return (
       


            <div className='flex'>
                <div className="w-52 min-h-screen bg-primary">
                    <ul className="menu md:p-4 ">
                        <li >
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/home">
                                <FaHome />
                                Dashboard Home</NavLink>
                        </li>
                        <li >
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/addcontest">
                                <FaUsers />
                                My Contest</NavLink>
                        </li>
                        <li>
                            <NavLink className='hover:bg-secondary text-neutral hover:text-neutral-content' to="/dashboard/winner">
                                <FaBookOpen />
                                Select Winner</NavLink>
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