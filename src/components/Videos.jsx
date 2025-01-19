import ReactPlayer from "react-player";

const Videos = () => {

    const propertyVideos = [
        {
            "youtube_url": "https://www.youtube.com/watch?v=Dbndf4RyHRQ",
            "title": "Modern 4-Bedroom Family Home",
            "location": "Savar"
        },
        {
            "youtube_url": "https://www.youtube.com/watch?v=3WvAqr9OXl8",
            "title": "Luxurious Lakefront Mansion",
            "location": "Gulshan"
        },
        {
            "youtube_url": "https://www.youtube.com/watch?v=3E9aP99Jb-Q",
            "title": "Cozy 2-Bedroom Cabin in the Woods",
            "location": "Bashundhara"
        }
    ]

    return (
        <div className='container mx-auto px-2'>
            <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-blue-800 text-center mb-5">Some of our houses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto pt-5">
                {
                    propertyVideos.map((video, idx) => {
                        return (
                            <div key={idx} className="card shadow-xl bg-white text-black font-bold">
                                <figure>
                                    <ReactPlayer url={video.youtube_url} controls={true} />
                                </figure>
                                <div className="card-body">
                                    <p className="text-xl">{video.title}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline text-lg text-purple-700">{video.location}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Videos;