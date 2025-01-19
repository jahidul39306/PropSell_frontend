import Advertisement from "../components/Advertisement";
import Banner from "../components/Banner";
import Reviews from "../components/Reviews";
import Slider from "../components/Slider";
import Videos from "../components/Videos";



const HomePage = () => {

    return (
        <div className="space-y-10 lg:space-y-16">
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Reviews></Reviews>
            <Videos></Videos>
            <Slider></Slider>
        </div>
    );
};

export default HomePage;