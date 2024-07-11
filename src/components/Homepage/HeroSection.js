import React from 'react';
import ImageCarousel from './ImageCarousel';

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center mt-3 lg:mt-5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                RHINO ENVIRONMENTAL
                <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                    {" "}
                    PARK AND TRAINING AREA
                </span>
            </h1>
            <p className="uppercase mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Step into Elegance, Tee Off in Style
            </p>
            <div className="flex mt-10 justify-center w-full">
                <div className="w-full lg:w-2/3">
                    <ImageCarousel />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
