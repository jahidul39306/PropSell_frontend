import Advertisement from "../components/Advertisement";
import Banner from "../components/Banner";
import Reviews from "../components/Reviews";



const HomePage = () => {

    return (
        <div className="space-y-10 lg:space-y-16">
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Reviews></Reviews>
        </div>
    );
};

export default HomePage;