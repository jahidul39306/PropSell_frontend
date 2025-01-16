import { useContext } from 'react';
import avatar from '../../assets/avatar.jpg';
import { GlobalContext } from '../../provider/AuthProvider';
import Loading from '../../components/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ProfilePage = () => {
    const { user } = useContext(GlobalContext);
    const axiosSecure = useAxiosSecure();


    const fetchUser = async () => {
        const { data } = await axiosSecure.get(`/user/${user.email}`);
        return data;
    };

    const { data: userData, isFetching } = useQuery({
        queryKey: ["userData", user.email],
        queryFn: () => fetchUser()
    });

    if (isFetching) {
        return <Loading></Loading>
    }

  
    return (
        <div className='flex flex-col md:flex-row items-center p-5 gap-10'>
            <div>
                <img
                    src={user.photoURL || avatar}
                    alt=""
                    onError={(e) => {
                        e.target.src = avatar;
                    }}
                    className='w-[150px]'
                />
            </div>
            <div className='text-lg font-semibold text-blue-500'>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                {
                    (userData.role !== 'user' && <p>Role: {userData.role}</p>)
                }

            </div>
        </div>
    );
};

export default ProfilePage;