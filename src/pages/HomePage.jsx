import Advertisement from "../components/Advertisement";
import Banner from "../components/Banner";
import Reviews from "../components/Reviews";
import Slider from "../components/Slider";



const HomePage = () => {

    return (
        <div className="space-y-10 lg:space-y-16">
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Reviews></Reviews>
            <Slider></Slider>
        </div>
    );
};

export default HomePage;