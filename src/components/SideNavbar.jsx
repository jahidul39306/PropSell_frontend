import { NavLink } from "react-router-dom";
import useAgent from "../hooks/useAgent";


const SideNavbar = () => {

    const [isAgent] = useAgent();

    return (
        <div className="bg-purple-500 py-2 px-5 flex flex-col text-xl font-bold text-white rounded-lg space-y-5">
            {isAgent === 'user' && <div className="flex flex-col space-y-5">
                <NavLink to='/dashboard/profile' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My profile</NavLink>
                <NavLink to='/dashboard/wishlists' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>Wishlist</NavLink>
                <NavLink to='/dashboard/property-bought' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>Property bought</NavLink>
                <NavLink to='/dashboard/my-reviews' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My reviews</NavLink>
            </div>}

            {isAgent === 'agent' && <div className="flex flex-col space-y-5">
                <NavLink to='/dashboard/profile' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My profile</NavLink>
                <NavLink to='/dashboard/add-property' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>Add property</NavLink>
                <NavLink to='/dashboard/my-added-properties' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My added properties</NavLink>
                <NavLink to='/dashboard/my-sold-properties' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>My sold properties</NavLink>
                <NavLink to='/dashboard/requested-properties' className={({ isActive }) => (isActive ? "bg-purple-800 p-2" : "")}>Requested properties</NavLink>
            </div>}
        </div>
    );
};

export default SideNavbar;