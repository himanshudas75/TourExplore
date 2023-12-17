import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

import { v4 as uuid } from 'uuid';

function ImageCarousel({ images }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={images.length > 1 ? true : false}
            indicators={false}
        >
            {images?.length > 0 ? (
                images.map((img) => (
                    <Carousel.Item key={uuid()}>
                        <img src={img} className="d-block w-100" />
                    </Carousel.Item>
                ))
            ) : (
                <Carousel.Item key={uuid()}>
                    <img src="/no-image.png" className="d-block w-100" />
                </Carousel.Item>
            )}
        </Carousel>
    );
}

export default ImageCarousel;
