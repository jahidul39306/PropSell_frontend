import { useParams } from 'react-router-dom';
import fake_house from '../assets/fake_house.jpg';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import ReviewsCard from '../components/ReviewsCard';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { GlobalContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';



const PropertyDetailsPage = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);

    const fetchDetails = async () => {
        const { data } = await axiosSecure.get(`/property/${id}`);
        return data;
    };

    const { data: propertyDetails, isFetching } = useQuery({
        queryKey: ["propertyDetails"],
        queryFn: fetchDetails
    });

    const fetchReviews = async () => {
        const { data } = await axiosSecure.get(`/reviews/${id}`);
        return data;
    };

    const { data: reviews, isFetching: isFetchingReviews } = useQuery({
        queryKey: ["reviews", id],
        queryFn: fetchReviews
    });

    const wishListMutation = useMutation({
        mutationFn: async (newWishList) => {
            return await axiosSecure.post('/wishlist', newWishList)
        },
        onSuccess: () => {
            toast.success('Added to wishlist');
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    if (isFetching || isFetchingReviews) {
        return <Loading></Loading>
    }

    const handleWishList = async () => {
        const wishProperty = {
            userEmail: user.email,
            propertyId: id
        }
        wishListMutation.mutate(wishProperty);
    }

    const handleReview = async () => {
        const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Message",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
                "aria-label": "Type your message here"
            },
            showCancelButton: true
        });
        if (text) {
            Swal.fire(text);
        }
    }

    return (
        <div className='py-10 px-2 container mx-auto'>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center bg-white border-2 border-emerald-800 rounded-lg shadow-lg">
                <div>
                    <img
                        className="w-full md:w-[500px] md:h-[500px] rounded-l-lg"
                        src={propertyDetails.propertyImage || fake_house} alt=""
                        onError={(e) => {
                            e.target.src = fake_house;
                        }}
                    />
                </div>
                <div className="font-bold text-black space-y-2 md:space-y-5 p-5 md:p-10 ">
                    <h1 className="text-3xl md:text-5xl">{propertyDetails.propertyTitle}</h1>
                    <p className='uppercase text-lg text-blue-500'>{propertyDetails.propertyLocation}</p>
                    <ul className="text-lg md:text-2xl list-disc list-inside">
                        <li>Price: ${propertyDetails.minPrice} - {propertyDetails.maxPrice}</li>
                        <li>Status: {propertyDetails.verificationStatus}</li>
                        <li>Agent name: {propertyDetails.agentName}</li>
                    </ul>
                    <button
                        onClick={handleWishList}
                        className="btn w-full bg-black text-white border-none">Add to wishlist</button>
                    <button
                        onClick={handleReview}
                        className="btn w-full bg-purple-600 text-white border-none">Add a review</button>

                </div>
            </div>

            <div className='space-y-5 pt-10'>
                {
                    reviews.map(review => <ReviewsCard key={review._id} review={review}></ReviewsCard>)
                }
            </div>
        </div>
    );
};

export default PropertyDetailsPage;