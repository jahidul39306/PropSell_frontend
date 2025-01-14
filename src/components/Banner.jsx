import Lottie from 'lottie-react';
import home from '../assets/home.json';
import banner_img from '../assets/banner-house.jpg';

const Banner = () => {
    return (
        <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-[300px] md:min-h-[600px] lg:min-h-[800px]"
            style={{ backgroundImage: `url(${banner_img})` }}
        >
            <div className='text-black text-center bg-white bg-opacity-50 rounded-lg p-4'>
                <h1 className='text-xl md:text-5xl lg:text-7xl font-bold'>Invest in real estate</h1>
                <p className='text-base md:text-xl lg:text-2xl font-bold'>The property that suits you</p>
            </div>
        </div >
    );
};

export default Banner;