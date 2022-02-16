import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Carousel, Container, Modal } from 'react-bootstrap';
import { img_path, url } from '../helpers/url';
import { trailers } from '../data-trailers/bdtrailers.js'
import '../styles/style-home.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/actionLogin';

export const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([])
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [chooseDescription, setChooseDescription] = useState('')
  const [chooseTrailer, setChooseTrailer] = useState('')

  useEffect(() => {
    getData()
  }, [movies])

  const getData = async () => {
    const resp = await fetch(url)
    const data = await resp.json()
    setMovies(data.results)
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Inicializacion Modal Descripcion

  const handleClose = () => setShow(false);
  const handleShow = useCallback((id) => {
    setShow(true)
    setChooseDescription(movies.find(movie => movie.id === id))
  }, [movies])

  // Inicializacion Modal Trailer

  const handleCloseT = () => setShowTrailer(false);
  const handleShowT = useCallback((id) => {
    setShowTrailer(true);
    const trailerB = trailers.find(trailer => trailer.id === id)
    setChooseTrailer("https://www.youtube-nocookie.com/embed/" + trailerB.trailer + "?rel=0&amp;controls=0&amp;showinfo=0")
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
}

  return (

    <div>

      <Container>
        <h4
          className="btn-logout"
          onClick={() => handleLogout()}>
          Cerrar Sesión
        </h4>
      </Container>

      {/* Carrusel de los trailer de las películas */}

      <Carousel
        className='container-carousel'
        activeIndex={index}
        onSelect={handleSelect}>
        {
          trailers.map((trailer, indice) => (
            <Carousel.Item key={indice}>
              <img
                className="d-flex img-carousel"
                src={trailer.image}
                alt="First slide"
              />
              <div className="carousel-buttons">
                <Button
                  variant="#FED941"
                  className="button-now me-5"
                  onClick={() => handleShowT(trailer.id)}>VER TRAILER</Button>
                <Button variant="dark" className="button-later">VER DESPUES</Button>
              </div>
            </Carousel.Item>
          ))
        }
      </Carousel>

      {/* Cards de las peliculas */}

      <h1 className="cards-title">Todas las peliculas</h1>

      <div className='row container-cards'>
        {
          movies.map(movie => (
            <Card
              // style={{ background: 'white'}}
              key={movie.id}
              className="card"
              onClick={() => handleShow(movie.id)}>
              <Card.Img
                variant="top"
                src={img_path + movie.backdrop_path}
                alt=""
                className="img-card"
                onClick={() => handleShow(movie.id)} >
              </Card.Img>
              <div className="card-average">
                <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644907036/Sprint-3/Icon_ma1qlr.png" width="25px" heigth="25px" alt="" />
                <h3>{movie.vote_average}</h3>
              </div>
            </Card>
          ))
        }
      </div>

      {/* Modal de la descripcion de las peliculas */}

      <div>
        <Modal show={show}
          size="lg"
          scrollable
          className="container-modal"
          onHide={handleClose} >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body className="container-modal-body">
            <img src={img_path + chooseDescription.poster_path} alt="" className="img-modal" />
            <div className="data-modal">
              <h1>{chooseDescription.title}</h1>
              <p className="overview-modal">{chooseDescription.overview}</p>
              <div>
                <h4>Release Date: {chooseDescription.release_date}</h4>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="#FED941" className="button-now" onClick={handleClose}>
              VER AHORA
            </Button>
            <Button variant="dark" className="button-later" onClick={handleClose}>
              VER DESPUES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Modal del trailer de las peliculas */}

      <div>
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
              width="600"
              height="315"
              frameborder="0" allowfullscreen>
            </iframe>
          </Modal.Body>
        </Modal>
      </div>

    </div>
  )
}

