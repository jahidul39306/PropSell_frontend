import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import fake_house from '../../assets/fake_house.jpg';
import avatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyAddedPropertiesPage = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchMyProperties = async () => {
        const { data } = await axiosSecure.get(`/property/email/${user.email}`);
        return data;
    };

    const { data: myProperties, isFetching, refetch } = useQuery({
        queryKey: ["myProperties", user.email],
        queryFn: () => fetchMyProperties()
    });

    const myPropertyRemove = useMutation({
        mutationFn: async (propertyId) => {
            return await axiosSecure.delete(`/property/${propertyId}?email=${user.email}`)
        },
        onSuccess: () => {
            toast.success('Removed from property');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });


    if (isFetching) {
        return <Loading></Loading>
    }

    const removeMyProperty = (propertyId) => {
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
                myPropertyRemove.mutate(propertyId);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your wishlist has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 py-5">
            {
                myProperties.map(p => {
                    return (
                        <div key={p._id} className="card card-compact bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    className="flex-grow"
                                    src={p.propertyImage || fake_house}
                                    onError={(e) => {
                                        e.target.src = fake_house;
                                    }}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title uppercase">{p.propertyLocation}</h2>
                                <h2 className="font-bold text-blue-600">{p.propertyTitle}</h2>
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-bold">$ {p.minPrice} - {p.maxPrice}</p>
                                    <div>
                                        <p className="border border-blue-800 rounded-lg font-bold p-1 text-blue-500">{p.verificationStatus}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            src={p.agentImage || avatar}
                                            onError={(e) => {
                                                e.target.src = avatar;
                                            }}
                                            className="w-[40px]"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-500 text-lg">{p.agentName}</p>
                                    </div>
                                </div>

                                <div className="card-actions ">
                                    <Link to={`/property/${p._id}`} className="btn w-full bg-blue-300">Update</Link>
                                    <button onClick={() => removeMyProperty(p._id)} className="btn w-full bg-rose-500">Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MyAddedPropertiesPage;