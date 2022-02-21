import { useCallback, useState } from "react";
import { Carousel, Container, Modal } from "react-bootstrap"
import { trailers } from '../data-trailers/bdtrailers.js'

const CarouselTrailers = () => {

    const [index, setIndex] = useState(0);
    const [showTrailer, setShowTrailer] = useState(false);
    const [chooseTrailer, setChooseTrailer] = useState('');

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const handleCloseT = () => setShowTrailer(false);
    const handleShowT = useCallback((id) => {
        setShowTrailer(true);
        const trailerB = trailers.find(trailer => trailer.id === id)
        setChooseTrailer(`https://www.youtube-nocookie.com/embed/${trailerB.trailer}?rel=0&amp;controls=0&amp;showinfo=0`)
    }, [])

    return (
        <div>
            <Carousel
                className='container-carousel'
                activeIndex={index}
                onSelect={handleSelect}>
                {
                    trailers.map((trailer, indice) => (
                        <Carousel.Item key={indice}>
                            <img
                                className="img-carousel"
                                src={trailer.image}
                                alt="First slide"
                            />
                            <div className="carousel-buttons">

                                <img
                                    src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1645406198/Sprint-3/now_dsaaug.png" alt=""
                                    className='button-trailer me-4'
                                    onClick={() => handleShowT(trailer.id)} />

                                <img
                                    src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1645406198/Sprint-3/after_at6ycz.png" alt=""
                                    className='button-trailer' />
                            </div>
                        </Carousel.Item>
                    ))
                }
            </Carousel>

            {/* Modal del trailer de las peliculas */}

            <Container>
                <Modal show={showTrailer}
                    size="lg"
                    scrollable
                    className="container-modal"
                    onHide={handleCloseT} >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="container-modal-trailer">
                        <iframe
                            src={chooseTrailer}
                            title="myFrame"
                            width="800"
                            height="415"
                            frameBorder="0" allowFullScreen>
                        </iframe>
                    </Modal.Body>
                </Modal>
            </Container>

        </div>
    )
}

export default CarouselTrailers