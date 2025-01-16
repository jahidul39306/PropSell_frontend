import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyReviews = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchUserReviews = async () => {
        const { data } = await axiosSecure.get(`/reviews-by-email/${user.email}`);
        return data;
    };

    const { data: userReviews, isFetching, refetch } = useQuery({
        queryKey: ["userReviews", user.email],
        queryFn: () => fetchUserReviews()
    });

    const reviewRemove = useMutation({
        mutationFn: async (reviewId) => {
            return await axiosSecure.delete(`/reviews/${reviewId}?email=${user.email}`)
        },
        onSuccess: () => {
            toast.success('Review removed');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    if (isFetching) {
        return <Loading></Loading>
    }

    const handleDelete = (reviewId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                reviewRemove.mutate(reviewId);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 py-5">
            {
                userReviews.map((ur) => {
                    return (
                        <div key={ur._id} className="card max-w-96 card-sm shadow-lg bg-slate-200">
                            <div className="card-body">
                                <h2 className="card-title">{ur.propertyTitle}</h2>
                                <p className="text-sm">Agent name: {ur.agentName}</p>
                                <p className="text-blue-500 font-semibold">{ur.review}</p>
                                <p className="text-xs">Date: {ur.time.toLocaleString()}</p>
                                <div className="justify-end card-actions">
                                    <button onClick={() => handleDelete(ur._id)} className="btn bg-rose-500">Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MyReviews;