import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "./Loading";
import avatar from '../assets/avatar.jpg';



const Reviews = () => {

    const axiosPublic = useAxiosPublic();

    const fetchReviews = async () => {
        const { data } = await axiosPublic.get('/reviews?latest=true');
        return data;
    }

    const { data: reviews, isFetching } = useQuery({
        queryKey: ['reviews'],
        queryFn: fetchReviews
    });


    if (isFetching) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-blue-800 text-center mb-5">Latest user review</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 container mx-auto p-2">
                {
                    reviews.map(r => {
                        return (
                            <div key={r._id} className="flex justify-between bg-white p-2 items-center gap-5 rounded-lg shadow-lg">
                                <div className="">
                                    <img
                                        src={r.reviewerImg || avatar}
                                        className="max-w-24 rounded-full"
                                        onError={(e) => {
                                            e.target.src = avatar;
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center gap-2">
                                    <p className="font-bold text-blue-400">{r.reviewerName}</p>
                                    <p className="text-sm font-semibold">{r.review}</p>
                                    <p className="text-xs">Property title: {r.propertyTitle}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Reviews;