import React    from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1   from './images/dexter.png';
import image2   from './images/suits.jpg';
import image3   from './images/mindhunter.jpg';

class Carousel1 extends React.Component {

    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image2}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Suits Available on Netflix Now!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image1}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Dexter Available on Netflix now!.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>mindhunter Available on Netflix now!.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }

}

export default Carousel1;
