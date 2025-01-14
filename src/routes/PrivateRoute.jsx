/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Navigate, useLocation} from "react-router-dom";
import { GlobalContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(GlobalContext);
    const location = useLocation();

    if(loading){
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate state={location.pathname} to={"/login"}></Navigate>
    }
    return children;
};

export default PrivateRoute;