import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import fake_house from '../assets/fake_house.jpg';
import avatar from "../assets/avatar.jpg";



const AllPropertiesPage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


    const fetchProperties = async (locat) => {
        if (locat) {
            const { data } = await axiosSecure.get(`/properties?location=${locat}`);
            return data;
        }
        const { data } = await axiosSecure.get('/properties');
        return data;
    };

    const { data: properties, isFetching } = useQuery({
        queryKey: ["properties"],
        queryFn: () => fetchProperties()
    });

    if (isFetching) {
        return <Loading></Loading>
    }

    const handleSearch = async (e) => {
        try {
            const data = await fetchProperties(e.target.value);
            queryClient.setQueryData(["properties"], data);
        }
        catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    return (
        <div className="container mx-auto px-2 ">
            <div className="text-center py-5">
                <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search"
                    className="input input-bordered input-info w-full max-w-xs" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    properties.map(p => {
                        return (
                            <div key={p._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img
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
                                        <button className="btn w-full bg-blue-300">Details</button>
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