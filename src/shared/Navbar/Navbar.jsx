import { useContext, useEffect, useState } from "react";


import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"
import Switch from "../../theme/Switch";
import { AuthContext } from "../../providers/AuthProvider";
const Navbar = () => {
    const { brandName, user, logout } = useContext(AuthContext)
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarClass = scrolling ? 'bg-neutral-content' : 'bg-neutral-content';

    const handleSignOut = () => {
        logout()
            .then()
            .catch()
    }


    const navitem = <>

        <li><Link to="/" className="hover:bg-secondary text-neutral hover:text-neutral-content">Home</Link></li>
        <li><Link to="/allcontest" className="hover:bg-secondary text-neutral hover:text-neutral-content">All Contest</Link></li>
        <li><Link to="/loeaderboard" className="hover:bg-secondary text-neutral hover:text-neutral-content">Leader Board</Link></li>

    </>

    return (
        <div className="bg-neutral-content h-[10vh]">
            <div className="max-w-full mx-auto">
                <div className={`navbar z-50 fixed ${navbarClass}`}>
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label role="button" tabIndex={0} className="btn btn-ghost text-neutral  lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="border bg-neutral-content menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52">
                                {navitem}
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-neutral hover:bg-secondary hover:text-neutral-content normal-case text-xl">{brandName}</Link>

                    </div>
                    <div className="navbar-center text-neutral hidden lg:flex">

                    </div>
                    <div className="navbar-end flex flex-row gap-2">
                        <div className=" text-neutral hidden lg:flex mr-4">
                            <ul className="menu  menu-horizontal px-1">
                                {navitem}
                            </ul>
                        </div>
                        {user ?
                            <>
                                <div className="dropdown  dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {console.log(user)}
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                        </div>
                                    </label>
                                    <div tabIndex={0} className=" border bg-neutral-content rounded-lg mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content">
                                        <p className="text-center text-neutral">{user.displayName}</p>
                                        <ul className=" rounded-box w-52">

                                            <li><Link to="/dashboard/home" className="hover:bg-secondary text-neutral">Dashboard</Link></li>
                                            <li><button onClick={handleSignOut} className="hover:bg-secondary text-neutral">Logout</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                            :
                            <Link to="login" className="btn btn-primary text-neutral hover:bg-secondary hover:text-neutral-content">Login</Link>
                        }
                        {/* <Switch /> */}

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;