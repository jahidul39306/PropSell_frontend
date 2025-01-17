import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RequestedPropertiesPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchOfferedproperties = async () => {
        const { data } = await axiosSecure.get(`/offers/${user.email}?person=seller`);
        return data;
    };

    const { data: offeredProperties, isFetching, refetch } = useQuery({
        queryKey: ["offeredProperties", user.email],
        queryFn: () => fetchOfferedproperties()
    });

    const offerAccept = useMutation({
        mutationFn: async ({ offerId, propertyId }) => {
            return await axiosSecure.patch(`/offer-accept/${offerId}`, { propertyId: propertyId })
        },
        onSuccess: () => {
            toast.success('Offer accepted');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    const offerReject = useMutation({
        mutationFn: async (offerId) => {
            return await axiosSecure.patch(`/offer-reject/${offerId}`)
        },
        onSuccess: () => {
            toast.success('Offer rejected');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    const handleAccept = (offerId, propertyId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept offer"
        }).then((result) => {
            if (result.isConfirmed) {
                offerAccept.mutate({ offerId, propertyId });
                Swal.fire({
                    title: "Offer accepted!",
                    text: "Offer accepted!",
                    icon: "success"
                });
            }
        });
    }

    const handleReject = (offerId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Reject offer"
        }).then((result) => {
            if (result.isConfirmed) {
                offerReject.mutate(offerId);
                Swal.fire({
                    title: "Offer rejected!",
                    text: "Offer rejected!",
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
                        <th></th>
                        <th>Property title</th>
                        <th>Property location</th>
                        <th>Buyer email</th>
                        <th>Buyer name</th>
                        <th>Offered price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        offeredProperties.map((op, idx) => {
                            return (
                                <tr key={op._id}>
                                    <th>{idx + 1}</th>
                                    <td>{op.propertyTitle}</td>
                                    <td>{op.propertyLocation}</td>
                                    <td>{op.buyerEmail}</td>
                                    <td>{op.buyerName}</td>
                                    <td>{op.offeredPrice}</td>
                                    <td>{op.offerStatus === 'pending' ?
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleAccept(op._id, op.propertyId)} className="btn bg-green-500 p-1">Accept</button>
                                            <button onClick={() => handleReject(op._id)} className="btn bg-rose-500 p-1">Reject</button>
                                        </div> :
                                        op.offerStatus}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default RequestedPropertiesPage;