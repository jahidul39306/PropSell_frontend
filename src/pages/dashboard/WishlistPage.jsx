import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import fake_house from '../../assets/fake_house.jpg';
import avatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const WishlistPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchWishlists = async () => {
        const { data } = await axiosSecure.get(`/wishlist/${user.email}`);
        return data;
    };

    const { data: wishlists, isFetching, refetch } = useQuery({
        queryKey: ["wishlists", user.email],
        queryFn: () => fetchWishlists()
    });

    const wishListRemove = useMutation({
        mutationFn: async (wishlistId) => {
            return await axiosSecure.delete(`/wishlist/${wishlistId}?email=${user.email}`)
        },
        onSuccess: () => {
            toast.success('Removed from wishlist');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });


    if (isFetching) {
        return <Loading></Loading>
    }

    const handleRemove = (id) => {
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
                await wishListRemove.mutate(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your wishlist has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="container mx-auto px-2 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    wishlists.map(w => {
                        return (
                            <div key={w._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        src={w.propertyDetails?.propertyImage || fake_house}
                                        onError={(e) => {
                                            e.target.src = fake_house;
                                        }}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title uppercase">{w.propertyDetails?.propertyLocation}</h2>
                                    <h2 className="font-bold text-blue-600">{w.propertyyDetails?.propertyTitle}</h2>
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-bold">$ {w.propertyDetails?.minPrice} - {w.propertyDetails?.maxPrice}</p>
                                        <div>
                                            <p className="border border-blue-800 rounded-lg font-bold p-1 text-blue-500">{w.propertyDetails?.verificationStatus}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                src={w.propertyDetails?.agentImage || avatar}
                                                onError={(e) => {
                                                    e.target.src = avatar;
                                                }}
                                                className="w-[40px]"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-blue-500 text-lg">{w.propertyDetails?.agentName}</p>
                                        </div>
                                    </div>

                                    <div className="card-actions ">
                                        <Link to={`/dashboard/offer-price/${w.propertyDetails?._id}`} className="btn w-full bg-blue-300">Make an offer</Link>
                                        <button onClick={() => handleRemove(w._id)} className="btn w-full bg-rose-500">Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default WishlistPage;