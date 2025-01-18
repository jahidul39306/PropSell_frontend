import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import fake_house from '../assets/fake_house.jpg';
import avatar from "../assets/avatar.jpg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";



const AllPropertiesPage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [sortByPrice, setSortByPrice] = useState(false);
    const searchRef = useRef(" ");


    const fetchProperties = async (sortByPrice = false) => {
        if (searchRef.current?.value) {
            const { data } = await axiosSecure.get(`/properties?location=${searchRef.current?.value}&sort=${sortByPrice}`);
            return data;
        }
        const { data } = await axiosSecure.get(`/properties?sort=${sortByPrice}`);
        return data;
    };

    const { data: properties, isFetching } = useQuery({
        queryKey: ["properties"],
        queryFn: () => fetchProperties(false),
    });

    const handleSearch = async () => {
        try {
            const data = await fetchProperties(sortByPrice);
            queryClient.setQueryData(["properties"], data);
        }
        catch (error) {
            console.error("Error fetching search results:", error);
        }
    }
    const handleSort = async () => {
        try {
            if (sortByPrice) {
                const data = await fetchProperties(false);
                queryClient.setQueryData(["properties"], data);
            }
            else {
                const data = await fetchProperties(true);
                queryClient.setQueryData(["properties"], data);
            }
            setSortByPrice(!sortByPrice);
        }
        catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    if (isFetching) {
        return <Loading></Loading>
    }



    return (
        <div className="container mx-auto px-2 ">
            <div className="py-5 flex flex-col md:flex-row gap-5 justify-center">
                <input
                    onChange={handleSearch}
                    ref={searchRef}
                    type="text"
                    placeholder="Search"
                    className="input input-bordered input-info w-full max-w-xs" />
                {sortByPrice || <button onClick={handleSort} className="btn bg-purple-500">Sort by price</button>}
                {sortByPrice && <button onClick={handleSort} className="btn bg-purple-500">Sort by default</button>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    properties?.map(p => {
                        return (
                            <div key={p._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        className="flex-grow h-[200px]"
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
                                        <Link to={`/property/${p._id}`} className="btn w-full bg-blue-300">Details</Link>
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

export default AllPropertiesPage;