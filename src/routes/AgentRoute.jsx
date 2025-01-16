/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Navigate, useLocation} from "react-router-dom";
import { GlobalContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import useAgent from "../hooks/useAgent";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(GlobalContext);
    const location = useLocation();
    const [isAgent, isAgentLoading] = useAgent();

    if(loading || isAgentLoading){
        return <Loading></Loading>;
    }

    if (!user || isAgent !== 'agent') {
        return <Navigate state={location.pathname} to={"/login"}></Navigate>
    }
    return children;
};

export default PrivateRoute;