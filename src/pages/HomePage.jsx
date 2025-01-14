import Advertisement from "../components/Advertisement";
import Banner from "../components/Banner";



const HomePage = () => {

    return (
        <div className="space-y-10 lg:space-y-16">
            <Banner></Banner>
            <Advertisement></Advertisement>
        </div>
    );
};

export default HomePage;