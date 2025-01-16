import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const MakeOfferPage = () => {
    const [err, setErr] = useState("");

    const { propertyId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);
    const navigate = useNavigate();


    const fetchDetails = async () => {
        const { data } = await axiosSecure.get(`/property/${propertyId}`);
        return data;
    };

    const { data: propertyDetails, isFetching } = useQuery({
        queryKey: ["propertyDetails", propertyId],
        queryFn: fetchDetails
    });

    const fetchUser = async () => {
        const { data } = await axiosSecure.get(`/user/${user.email}`);
        return data;
    };

    const { data: userData, isFetching: userDataFetching } = useQuery({
        queryKey: ["userData", user.email],
        queryFn: () => fetchUser()
    });

    const offersMutation = useMutation({
        mutationFn: async (newOffer) => {
            return await axiosSecure.post('/offers', newOffer)
        },
        onSuccess: () => {
            toast.success('Offer sent');
            navigate('/dashboard/property-bought');

        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    if (isFetching || userDataFetching) {
        return <Loading></Loading>
    }


    const handleOffer = async (e) => {
        e.preventDefault();

        const offeredPrice = Number(e.target.offerPrice.value);
        const minPrice = Number(propertyDetails.minPrice);
        const maxPrice = Number(propertyDetails.maxPrice);

        if (offeredPrice < minPrice) {
            setErr("Offered price is less than price range");
            toast.error("Offered price is less than price range");
            return
        }

        if (offeredPrice > maxPrice) {
            setErr("Offered price is greater than price range");
            toast.error("Offered price is greater than price range");
            return
        }

        if (userData.role !== 'user') {
            setErr("You can not make offer, you have to be a normal user");
            toast.error("You can not make offer, you have to be a normal user");
            return
        }

        const { _id, ...rest } = propertyDetails;
        const offerData = {
            propertyId: _id,
            ...rest,
            buyerEmail: user.email,
            buyerName: user.displayName,
            buyingDate: new Date().toLocaleString(),
            offerStatus: 'pending',
            offeredPrice
        }

        offersMutation.mutate(offerData);
    }


    return (
        <div>
            <div className="flex justify-center items-center min-h-screen p-1">
                <form onSubmit={handleOffer} className="card-body max-w-lg shadow-lg rounded-md border border-blue-500">
                    {/* propertyTitle */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Property title</span>
                        </label>
                        <input name="propertyTitle" type="text" className="input input-bordered" readOnly defaultValue={propertyDetails.propertyTitle} />
                    </div>

                    {/* propertyLocation */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Property Location</span>
                        </label>
                        <input name="propertyLocation" type="text" className="input input-bordered" readOnly defaultValue={propertyDetails.propertyLocation} />
                    </div>

                    {/* agent name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Agent name</span>
                        </label>
                        <input name="agentName" type="text" className="input input-bordered" readOnly defaultValue={propertyDetails.agentName} />
                    </div>

                    {/* price range */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Price range</span>
                        </label>
                        <input name="priceRange" type="text" className="input input-bordered" readOnly defaultValue={`$ ${propertyDetails.minPrice} - ${propertyDetails.maxPrice}`} />
                    </div>

                    {/* offer price */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-black font-bold">Offer price* (offer price must be between price range)</span>
                        </label>
                        <input name="offerPrice" type="number" className="input input-bordered bg-blue-200" />
                    </div>

                    {/* buyer email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Buyer email</span>
                        </label>
                        <input name="buyerEmail" type="text" className="input input-bordered" readOnly defaultValue={user.email} />
                    </div>

                    {/* buyer name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Buyer name</span>
                        </label>
                        <input name="buyerName" type="text" className="input input-bordered" readOnly defaultValue={user.displayName} />
                    </div>

                    {/* buying date */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Buying date</span>
                        </label>
                        <input name="buyingDate" type="text" className="input input-bordered" readOnly defaultValue={new Date().toLocaleDateString()} />
                    </div>

                    {/* error */}
                    {
                        err && <p className="text-lg text-red-500 p-2">{err}</p>
                    }

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Make offer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeOfferPage;