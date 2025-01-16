import { NavLink } from "react-router-dom";

const SideNavbar = () => {
    return (
        <div className="bg-purple-500 py-2 px-5 flex flex-col text-xl font-bold text-white rounded-lg space-y-5">
            <NavLink to='/dashboard/profile' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My profile</NavLink>
            <NavLink to='/dashboard/wishlists' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>Wishlist</NavLink>
            <NavLink to='/dashboard/property-bought' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>Property bought</NavLink>
            <NavLink to='/dashboard/my-reviews' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My reviews</NavLink>
        </div>
    );
};

export default SideNavbar;