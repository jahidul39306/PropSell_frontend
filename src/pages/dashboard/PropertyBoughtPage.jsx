import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import fake_house from '../../assets/fake_house.jpg';
import avatar from "../../assets/avatar.jpg";
import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";

const PropertyBoughtPage = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchOfferedproperties = async () => {
        const { data } = await axiosSecure.get(`/offers/${user.email}?person=buyer`);
        return data;
    };

    const { data: offered, isFetching } = useQuery({
        queryKey: ["offered", user.email],
        queryFn: () => fetchOfferedproperties()
    });

    if (isFetching) {
        return <Loading></Loading>
    }

    return (
        <div className="container mx-auto px-2 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    offered.map(w => {
                        return (
                            <div key={w._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        className="flex-grow h-[200px]"
                                        src={w.propertyImage || fake_house}
                                        onError={(e) => {
                                            e.target.src = fake_house;
                                        }}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title uppercase">{w.propertyLocation}</h2>
                                    <h2 className="font-bold text-blue-600">{w.propertyTitle}</h2>
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-bold">$ {w.offeredPrice}</p>
                                        <div>
                                            <p className="border border-blue-800 rounded-lg font-bold p-1 text-blue-500">{w.offerStatus}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                src={w.agentImage || avatar}
                                                onError={(e) => {
                                                    e.target.src = avatar;
                                                }}
                                                className="w-[40px]"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-blue-500 text-lg">{w.agentName}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions ">
                                        {w.offerStatus === "accepted" && <button className="btn w-full bg-blue-300">Pay</button>}
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

export default PropertyBoughtPage;