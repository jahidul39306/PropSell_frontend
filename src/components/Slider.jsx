// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
import SliderCard from './SliderCard';

const cardsContent = [
    {
        image: "https://i.ibb.co.com/WzFzKHc/tutor-4.jpg",
        title: "The Expert Negotiator",
        userName: "Justyna",
        agentName: "Justyna",
        location: "Gulshan",
        description: "With over 10 years of experience in the real estate market, I specialize in negotiating the best deals for my clients. Whether you're buying your dream home or selling your property for top dollar, my focus is on maximizing your value. I combine market insights, strategic thinking, and personal dedication to make your real estate journey seamless and rewarding."
    },
    {
        image: "https://i.ibb.co.com/c6SK6Py/tutor-3.jpg",
        title: "The Local Market Specialist",
        userName: "Sophia",
        agentName: "Sophia",
        location: "Bashundhara",
        description: "Born and raised in this community, I know every neighborhood like the back of my hand. From school districts to the best local spots, I can help you find a home that fits your lifestyle perfectly. My goal is to guide you through the process with expert advice tailored to your needs. Let’s work together to turn your dream home into reality!"
    },
    {
        image: "https://i.ibb.co.com/ZBtK5w0/tutor-2.jpg",
        title: "The Tech-Savvy Innovator",
        userName: "Michael",
        agentName: "Michael",
        location: "Mirpur",
        description: "In today’s competitive real estate market, you need an agent who leverages technology to your advantage. From virtual tours to targeted online marketing, I ensure your property gets maximum visibility. If you're a buyer, I’ll keep you ahead of the game with real-time updates and data-driven insights to help you make confident decisions."
    },
    {
        image: "https://i.ibb.co.com/1vHb20R/tutor-1.jpg",
        title: "The First-Time Buyer’s Advocate",
        userName: "Emma",
        agentName: "Emma",
        location: "Savar",
        description: "Buying your first home can feel overwhelming, but I’m here to make it simple and stress-free. I specialize in working with first-time buyers, guiding them through every step of the process with patience and clarity. I’ll help you understand the market, secure financing, and find a home that meets your needs and budget. Your journey to homeownership starts here!"
    }
]

const Slider = () => {
    return (
        <div className='container mx-auto px-2'>
            <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-blue-800 text-center mb-5">What our agents have to say</h1>
            <Swiper navigation={true} modules={[Navigation]} className="" loop={true} slidesPerView={1}>
                {
                    cardsContent.map((content, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <SliderCard content={content}></SliderCard>
                            </SwiperSlide>
                        );
                    })
                }

            </Swiper>
        </div>
    );
};

export default Slider;