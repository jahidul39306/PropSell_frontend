import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { GlobalContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsersPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchAllUsers = async () => {
        const { data } = await axiosSecure.get('/users');
        return data;
    }

    const { data: users, isFetching, refetch } = useQuery({
        queryKey: ["users", user.email],
        queryFn: () => fetchAllUsers()
    });

    const changeRole = useMutation({
        mutationFn: async ({ userId, role }) => {
            return axiosSecure.patch(`/user-role/${userId}?role=${role}`);
        },
        onSuccess: () => {
            toast.success('User role changed');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    const handleChangeRole = (userId, role) => {
        changeRole.mutate({ userId, role });
    }

    const deleteUser = useMutation({
        mutationFn: async (firebase_uid) => {
            return axiosSecure.delete(`/user-delete/${firebase_uid}`);
        },
        onSuccess: () => {
            toast.success('User deleted');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    const handleDelete = (firebase_uid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser.mutate(firebase_uid);
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const markAsFraud = useMutation({
        mutationFn: async (email) => {
            return axiosSecure.patch(`/mark-as-fraud/${email}`)
        },
        onSuccess: () => {
            toast.success('User marked as fraud');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }

    })

    const handleFraud = (userEmail) => {
        Swal.fire({
            title: "Are you sure?",
            text: "If you mark user as fraud, all the added properties of this user will be deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Mark as fraud"
        }).then((result) => {
            if (result.isConfirmed) {
                markAsFraud.mutate(userEmail)
                Swal.fire({
                    title: "Fraud!",
                    text: "User marked as fraud.",
                    icon: "success"
                });
            }
        });
    }


    if (isFetching) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User name</th>
                        <th>User email</th>
                        <th>User role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((op, idx) => {
                            return (
                                <tr key={op._id}>
                                    <th>{idx + 1}</th>
                                    <td>{op.userName}</td>
                                    <td>{op.email}</td>
                                    <td>{op.role}</td>
                                    <td>

                                        <div className="flex items-center gap-2">
                                            {op?.fraud !== 'yes' ?
                                                <div>
                                                    <button onClick={() => handleChangeRole(op._id, 'admin')} className="btn bg-green-500 p-1">Make admin</button>
                                                    <button onClick={() => handleChangeRole(op._id, 'agent')} className="btn bg-green-500 p-1">Make agent</button>
                                                </div>
                                                :
                                                <p className="text-red-500 font-semibold">Fraud</p>}
                                            {op.role === "agent" && <button onClick={() => handleFraud(op.email)} className="btn bg-yellow-500 p-1">Mark as fraud</button>}
                                            <button onClick={() => handleDelete(op.firebase_uid)} className="btn bg-rose-500 p-1">Delete</button>
                                        </div>


                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsersPage;