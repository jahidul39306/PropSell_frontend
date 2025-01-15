/* eslint-disable react/prop-types */
import avatar from '../assets/avatar.jpg';

const ReviewsCard = ({ review }) => {
    return (
        <div key={review._id} className="flex justify-between bg-white p-2 items-center gap-5 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="">
                <img
                    src={review.reviewerImg || avatar}
                    className="max-w-24 rounded-full"
                    onError={(e) => {
                        e.target.src = avatar;
                    }}
                />
            </div>
            <div className="flex flex-col justify-center gap-2">
                <p className="font-bold text-blue-400">{review.reviewerName}</p>
                <p className="text-sm font-semibold">{review.review}</p>
                <p className="text-xs">Date: {review.time}</p>
            </div>
        </div>
    );
};

export default ReviewsCard;