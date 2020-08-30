import React from 'react';
import './dummy.css';
import Contact from './Contact';
// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel';

// const decoratedOnClick = useAccordionToggle(eventKey, onClick);

export default class Apps extends React.Component {
    render(){
        return(
            <div id="apps">
                {/* <Header/> */}
                <div id="apps-wrap">
                    <div id="about-item">
                        <div id="apps-text" >
                            <h2>Okane Apps:</h2>
                            <br/>
                            <p><i>Everything Made Easier, Try Out Our Apps.</i></p>
                        </div>
                            <div className="carousel">
                                <Carousel>
                                        <Carousel.Item interval={1000}>
                                            <img
                                            className="carousel-img"
                                            src= {require("./img1.jpg")}
                                            alt="First image"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item interval={1000}>
                                            <img
                                            className="carousel-img"
                                            src= {require("./img2.jpg")}
                                            alt="Second image"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item interval={1000}>
                                            <img
                                            className="carousel-img"
                                            src= {require("./img3.jpg")}
                                            alt="Third image"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item interval={1000}>
                                            <img
                                            className="carousel-img"
                                            src= {require("./img4.jpg")}
                                            alt="Third image"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item interval={1000}>
                                            <img
                                            className="carousel-img"
                                            src= {require("./img5.jpg")}
                                            alt="Third image"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item interval={1000}>
                                            <img
                                            className="carousel-img"
                                            src= {require("./img6.jpg")}
                                            alt="Third image"
                                            />
                                        </Carousel.Item>
                                </Carousel>
                            </div>

                    </div>
                </div>
                <Contact/>
            </div>
        );
    }
}