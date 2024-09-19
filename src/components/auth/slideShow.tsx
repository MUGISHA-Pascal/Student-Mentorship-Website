import React, { useState } from 'react';

interface Slide {
    id: number;
    image: string;
    text: string;
}

const SlideShow: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const slides: Slide[] = [
        {
            id: 0,
            image: '/svgs/slide1.svg',
            text: 'Personal Career Coach',
        },
        {
            id: 1,
            image: '/svgs/slide2.svg',
            text: 'Plan Your Future',
        },
        {
            id: 2,
            image: '/svgs/slide3.svg',
            text: 'Achieve Your Goals',
        },
        {
            id: 3,
            image: '/svgs/slide4.svg',
            text: 'Personal Career Coach',
        },
        {
            id: 4,
            image: '/svgs/slide5.svg',
            text: 'Plan Your Future',
        },
        {
            id: 5,
            image: '/svgs/slide6.svg',
            text: 'Achieve Your Goals',
        },
    ];

    const handleDotClick = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    return (
        <div className="w-1/2 hidden lg:block bg-blue-100 p-10 rounded-xl">
            <div className="flex h-full flex-col items-center">
                <div
                    className="text-center text-xl font-bold mt-2 transition-opacity duration-700 ease-in-out opacity-0"
                    style={{ opacity: currentSlide === slides[currentSlide].id ? 1 : 0 }}
                >
                    {slides[currentSlide].text}
                </div>
                <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].text}
                    className="w-4/5 h-4/5 mt-6 transition-all duration-500 ease-in-out"
                />
            </div>

            <div className="flex justify-center">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => handleDotClick(index)}
                        className={`h-3 mx-1 rounded-full ${currentSlide === index ? 'w-14 bg-gradient-to-r from-blue-500 to-white' : 'w-3 bg-blue-500'
                            } transition-all duration-900 ease-in-out`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
