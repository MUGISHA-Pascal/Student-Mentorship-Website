const Services = () => {
    const cardData = [
        {
            title: "Career Coaching",
            description: "Personalized coaching sessions to help students and professionals achieve their career goals and excel in their fields.",
            image: "/svgs/service1.svg",
        },
        {
            title: "Skill Development",
            description: "Workshops and training programs to build industry-relevant skills and boost your career.",
            image: "/svgs/service2.svg",
        },
        {
            title: "Networking",
            description: "Opportunities to connect with industry professionals and grow your network.",
            image: "/svgs/service3.svg",
        }
    ];
    return (
        <div className="my-7">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-8">Our Comprehensive Services</h2>
                <p className="mb-12 px-2 md:px-0 lg:w-[40%] md:w-[60%] text-center font-semibold text-gray-500">From personalized coaching sessions to industry-specific mentorship, we offer a wide range of services to support your career journey and help you thrive.</p>
            </div>
            <div>
                <div className="flex flex-wrap gap-6 justify-center">
                    {cardData.map((card, cardIndex) => (
                        <div
                            key={cardIndex}
                            className="flex flex-col items-center text-center border p-6 rounded-lg shadow-lg w-full max-w-sm bg-white"
                        >
                            <div className="relative mb-4 h-[180px] w-full flex justify-center items-center">
                                <img
                                    src={card.image}
                                    alt="Steps Image"
                                    className="object-contain h-full w-full"
                                />
                                <div className="absolute top-0 right-0 p-3 bg-blue-400 rounded-full">
                                    <img
                                        src='/svgs/small_arrow.svg'
                                        alt="Arrow Icon"
                                        className=" w-5 h-5"
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-blue-600">{card.title}</h3>
                            <p className="text-gray-600 mt-2">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services