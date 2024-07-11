import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {
    const images = [
        require('../../assets/Picture1.png'),
        require('../../assets/Picture2.png'),
        require('../../assets/Picture5.png'),
        require('../../assets/Picture6.png'),
        require('../../assets/Picture7.png'),
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="mt-10 px-2">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
