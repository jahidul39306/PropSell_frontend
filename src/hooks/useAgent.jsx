import useAxiosSecure from './useAxiosSecure';
import { GlobalContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

const useAgent = () => {
    const { user, loading } = useContext(GlobalContext);
    const axiosSecure = useAxiosSecure();

    const { data: isAgent, isPending: isAgentLoading } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            // console.log(res.data);
            return res.data?.role;
        }
    })
    return [isAgent, isAgentLoading]
};

export default useAgent;