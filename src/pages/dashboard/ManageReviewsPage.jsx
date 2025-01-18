import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import avatar from '../../assets/avatar.jpg';


const ManageReviewsPage = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchReviews = async () => {
        const { data } = await axiosSecure.get(`/reviews`);
        return data;
    };

    const { data: reviews, isFetching, refetch } = useQuery({
        queryKey: ["reviews", user.email],
        queryFn: () => fetchReviews()
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
                    text: "Your review has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    if (isFetching) {
        return <Loading></Loading>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 py-5">
            {
                reviews.map((ur) => {
                    return (
                        <div key={ur._id} className="card max-w-96 card-sm shadow-lg bg-slate-200">
                            <div className="card-body">
                                <h2 className="card-title">{ur.review}</h2>
                                <p className="text-sm">Reviewer name: {ur.reviewerName}</p>
                                <p className="text-blue-500 font-semibold">{ur.reviewerEmail}</p>
                                <p className="text-xs">Date: {ur.time.toLocaleString()}</p>
                                <div className="flex justify-between items-center">
                                    <img
                                        src={ur.reviewerImg || avatar}
                                        className="w-[50px] rounded-full"
                                        onError={(e) => {
                                            e.target.src = avatar;
                                        }}
                                    />
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

export default ManageReviewsPage;