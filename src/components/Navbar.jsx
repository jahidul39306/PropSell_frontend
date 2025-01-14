import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-3 text-md">
                        <NavLink to='/' className={({ isActive }) => (isActive ? "text-blue-800 font-bold" : "")}>Home</NavLink>
                        <NavLink to='/find-tutors' className={({ isActive }) => (isActive ? "text-blue-800 font-bold" : "")}>All properties</NavLink>
                        <NavLink to='/add-tutorials' className={({ isActive }) => (isActive ? "text-blue-800 font-bold" : "")}>Dashboard</NavLink>
                    </ul>
                </div>
                <Link to='/'>
                    <img
                        className="max-w-40 rounded-lg"
                        src="/public/logo.png" alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-lg gap-7">
                    <NavLink to='/' className={({ isActive }) => (isActive ? "text-blue-800 font-bold" : "")}>Home</NavLink>
                    <NavLink to='/find-tutors' className={({ isActive }) => (isActive ? "text-blue-800 font-bold" : "")}>All properties</NavLink>
                    <NavLink to='/add-tutorials' className={({ isActive }) => (isActive ? "text-blue-800 font-bold" : "")}>Dashboard</NavLink>
                </ul>
            </div>
            <div className="navbar-end gap-2 md:gap-5 text-xs md:text-sm">
                <button className="bg-purple-700 text-white text-xs md:text-base p-1 md:p-2 rounded-md font-bold">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;