const facts = [
    {
        number: '1',
        title: 'Passion-Fueled Learning',
    },
    {
        number: '2',
        title: 'Mastery and Expertise',
    },
    {
        number: '3',
        title: 'Valuable Pursuits',
    },
    {
        number: '4',
        title: 'Impactful Contributions',
    },
];

const How = () => {
    return (
        <div className="px-10">
            <div className="flex flex-col gap-y-3">
                <div className="w-full px-[10%] text-center">
                    <h2 className="text-3xl font-bold mb-8">How Does It Work?</h2>
                    <p className="mb-12 px-0 lg:px-[15%] md:px-[15%] text-center font-semibold">
                        Discover the whole process of our expertise-based transformation from zero to hero
                    </p>
                </div>
                <div className="w-full flex flex-col  lg:flex-row lg:px-[5%] px-0 gap-x-10 bg-[url('/svgs/circle_cross.svg')] bg-center bg-no-repeat">
                    <div className="w-full flex flex-col gap-y-7 items-center lg:items-start">
                        <h2 className="font-bold text-xl">How does it work?</h2>
                        <div className="w-full lg:w-3/2  grid md:grid-cols-2 lg:grid-cols-1 grid-cols-1  gap-y-7 my-5">
                            {facts.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-start gap-x-5"
                                >
                                    <div className="font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100 rounded-full">
                                        {item.number}
                                    </div>
                                    <div className="gap-y-5 text-start">
                                        <h3 className="text-lg text-gray-600 font-semibold mb-2">{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-3/2 flex items-center justify-center">
                        <video src="/videos/video11.mp4" className="rounded-xl" autoPlay loop muted />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default How