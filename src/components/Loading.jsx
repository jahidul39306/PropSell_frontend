import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Lottie animationData={loading} />
        </div>
    );
};

export default Loading;