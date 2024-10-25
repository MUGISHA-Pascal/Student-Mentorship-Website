/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaArrowRight, FaMinus } from "react-icons/fa"
import { Link } from "react-router-dom"

const Intro = () => {
    const review = 4.5;
    return (
        <div className="relative">
            <div className="absolute -top-20 flex items-center z-0 left-[25%]">
                <img src="/images/boxes.png" alt="GOYoungAfrica" className="select-none h-[100vh]" />
            </div>
            <div className="relative h-full flex flex-col lg:flex-row justify-center p-5">
                <div className="bg-lue-500 relative lg:w-[45%] w-full h-[60%] justify-center  px-[5%] flex flex-col gap-y-3">
                    <h2 className="text-4xl font-bold ">Master Your Skills with <br />Expert Mentors</h2>
                    <p className="font-semibold">Connect with experienced professionals</p>
                    <p className="font-semibold">
                        <span className="text-blue-500">Mentor</span> <span className="text-green-500">Passion</span> <span className="text-orange-500">UnlockInnovation</span>{">>>"}
                    </p>
                    <button>
                        <Link to='/register'>
                            <button className="flex items-center justify-center gap-x-2 md:gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-lg py-2 px-2 md:py-3 md:px-4 rounded-xl text-nowrap">
                                Get Started now
                                <div className="flex items-center justify-center">
                                    <FaMinus className="rotate-90 h-4" />
                                    <FaArrowRight className="w-3" />
                                </div>
                            </button>
                        </Link>
                    </button>
{/*                     <button>
                        <Link to='/register'>
                            <button className="flex items-center justify-center gap-x-2 md:gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-lg py-2 px-2 md:py-3 md:px-4 rounded-xl text-nowrap">
                                Get started now
                                <div className="flex items-center justify-center">
                                    <FaMinus className="rotate-90 h-4" />
                                    <FaArrowRight className="w-3" />
                                </div>
                            </button>
                        </Link>
                    </button> */}
                </div>
                <div
                    // className="w-[50%] h-full z-50 bg-[url('/images/globe.png')] bg-contain bg-no-repeat"
                    className="lg:w-[55%] w-[80%] flex items-center justify-center h-full z-40"
                >
                    <img src="/images/globe.png" alt="star" className="w-full" />
                </div>
            </div>
            <div className="w-full relative lg:absolute lg:bg-red-0 top-[56%] lg:left-5 flex flex-col lg:flex-row items-center gap-x-5 mt-9 p-2">
                <div className="w-56 flex gap-x-7 my-3">
                    <div className="flex flex-col gap-y-3">
                        <img src="/images/review.png" alt="reviews" className="w-14" />
                        <div className="flex gap-x-1">
                            {Array.from({ length: Math.floor(review) }).map((_, index) => (
                                <img key={index} src="/svgs/star-full.svg" alt="star" />
                            ))}
                            {review % 1 !== 0 && <img src="/svgs/star-half.svg" alt="half star" />}
                            {Array.from({
                                length: 5 - Math.floor(review) - (review % 1 !== 0 ? 1 : 0),
                            }).map((_, _index) => (
                                <></>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-xl">2,707</p>
                        <p className="text-gray-600 text-lg font-semibold">Graduates</p>
                    </div>
                </div>
                <div className="w-full flex gap-x-8">
                    <div className="relative lg:w-[25%] w-1/2 h-[90%] px-6 lg:py-10 py-10 bg-blue-100 rounded-xl">
                        <p className="text-2xl font-bold text-blue-500">300+</p>
                        <p className="text-gray-600 text-2xl font-semibold">Students</p>
                        <div className="w-[40%] bg-white pl-2 pb-2 absolute top-0 right-0 rounded-bl-xl flex justify-center">
                            <div className="w-[90%] bg-blue-600 cursor-pointer lg:py-6 py-4 px-10 rounded-xl">
                                <FaArrowRight className="-rotate-45 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="relative lg:w-[25%] w-1/2 h-[90%] px-6 lg:py-10 py-10 bg-blue-100 rounded-xl">
                        <p className="text-2xl font-bold text-blue-500">100+</p>
                        <p className="text-gray-600 text-2xl font-semibold">Mentors</p>
                        <div className="w-[40%] bg-white pl-2 pb-2 absolute top-0 right-0 rounded-bl-xl flex justify-center">
                            <div className="w-[90%] bg-blue-600 z-50 cursor-pointer lg:py-6 py-4 px-10 rounded-xl">
                                <FaArrowRight className="-rotate-45 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro