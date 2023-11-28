import { useContext } from "react";


import { NavLink } from "react-router-dom";

import Switch from "../../theme/Switch";
import { AuthContext } from "../../providers/AuthProvider";
const Navbar = () => {
    const { brandName, user, logout } = useContext(AuthContext)



    const handleSignOut = () => {
        logout()
            .then()
            .catch()
    }


    const navitem = <>

        <li><NavLink to="/" className="hover:bg-secondary hover:text-neutral-content">Home</NavLink></li>
        <li><NavLink to="/allcontest" className="hover:bg-secondary hover:text-neutral-content">All Contest</NavLink></li>
        <li><NavLink to="/loeaderboard" className="hover:bg-secondary hover:text-neutral-content">Leader Board</NavLink></li>

    </>

    return (
        <div className="bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost text-neutral lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow  rounded-box w-52">
                                {navitem}
                            </ul>
                        </div>
                        <NavLink to="/" className="btn btn-ghost text-neutral hover:bg-secondary hover:text-neutral-content normal-case text-xl">{brandName}</NavLink>

                    </div>
                    <div className="navbar-center text-neutral hidden lg:flex">
                        <ul className="menu  menu-horizontal px-1">
                            {navitem}
                        </ul>
                    </div>
                    <div className="navbar-end flex flex-row gap-2">
                        {user ?
                            <>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                    {console.log(user)}
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                        </div>
                                    </label>
                                    <div tabIndex={0} className= " rou bg-base-100 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content">
                                        <p className="text-center">{user.displayName}</p>
                                        <ul  className=" bg-base-100 rounded-box w-52">
                                           
                                        <li><NavLink to="/dashboard/home" className="hover:bg-secondary hover:text-neutral-content">Dashboard</NavLink></li>
                                        <li><button onClick={handleSignOut}  className="hover:bg-secondary hover:text-neutral-content">Logout</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                            :
                            <NavLink to="login" className="btn btn-primary text-neutral hover:bg-secondary hover:text-neutral-content">Login</NavLink>
                        }
                        <Switch/>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;