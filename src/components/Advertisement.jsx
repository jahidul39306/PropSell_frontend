import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "./Loading";
import fake_house from '../assets/fake_house.jpg';
import { Link } from "react-router-dom";


const Advertisement = () => {
    const axiosPublic = useAxiosPublic();

    const fetchAdvertisements = async () => {
        const { data } = await axiosPublic.get('/advertisements');
        return data;
    }

    const { data: advertisements, isFetching } = useQuery({
        queryKey: ['advertisements'],
        queryFn: fetchAdvertisements
    });


    if (isFetching) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-blue-800 text-center mb-5">Advertisement</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 container mx-auto px-2">
                {
                    advertisements.map(ad => {
                        return (
                            <div key={ad._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        src={ad.propertyImage || fake_house}
                                        onError={(e) => {
                                            e.target.src = fake_house;
                                        }}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title uppercase">{ad.propertyLocation}</h2>
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-bold">$ {ad.minPrice} - {ad.maxPrice}</p>
                                        <div>
                                            <p className="border border-blue-800 rounded-lg font-bold p-1 text-blue-500">{ad.verificationStatus}</p>
                                        </div>

                                    </div>

                                    <div className="card-actions ">
                                        <Link to={`/property/${ad.propertyId}`} className="btn w-full bg-blue-300">Details</Link>
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

export default Advertisement;