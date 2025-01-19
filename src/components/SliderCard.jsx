/* eslint-disable react/prop-types */
const SliderCard = ({ content }) => {
    return (
        <div className="bg-white flex flex-col lg:flex-row items-center  max-w-6xl mx-auto px-6 py-8 space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Left Side - Image */}
            <div className="relative">
                <img
                    src={content.image}
                    alt=""
                    className="rounded-xl shadow-lg w-[400px] h-[500px]"
                />
                <div className="flex space-x-2 absolute bottom-4 left-4">
                    <span className="bg-white text-black px-4 py-1 rounded-lg shadow-sm">
                        {content.agentName}
                    </span>
                    <span className="bg-purple-500 font-semibold text-white px-4 py-1 rounded-lg shadow-sm">
                        {content.location} Agent
                    </span>
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {content.title}
                </h2>
                <p className="text-lg">{content.description}</p>
                <p className="text-lg text-gray-700 mb-2">{content.userName}</p>
            </div>
        </div>
    );
};

export default SliderCard;