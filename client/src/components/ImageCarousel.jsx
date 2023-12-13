import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

import { v4 as uuid } from 'uuid';

function ImageCarousel({ images }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {images.map((img) => (
                <Carousel.Item key={uuid()}>
                    <img src={img} className="img-fluid" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImageCarousel;
