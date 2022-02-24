import React, { useCallback, useEffect, useState } from 'react'
import { Card, Container, Form, FormControl, Modal } from 'react-bootstrap';
import { url, img_path, search_url } from '../helpers/url';
import CarouselTrailers from './Carousel';
import '../styles/style-home.css'

export const Home = () => {

  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [chooseDescription, setChooseDescription] = useState('')
  const [showTrailer, setShowTrailer] = useState(false);
  const [chooseTrailer, setChooseTrailer] = useState('');
  const [apiUrl, setApiUrl] = useState('')
  const [page, setPage] = useState(1)
  const [inputPage, setInputPage] = useState({
    currentPage: 1
  })
  const [searchValue, setSearchValue] = useState({
    busqueda: ''
  });

  useEffect(() => {
    setApiUrl(url + page.toString())
    getData(apiUrl)
  }, [apiUrl, page])

  const getData = (url_request) => {
    fetch(url_request)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error))
  }

  const { busqueda } = searchValue
  const { currentPage } = inputPage

  // Inicializacion Modal Descripcion

  const handleClose = () => setShow(false);
  const handleShow = useCallback((id) => {
    setShow(true)
    setChooseDescription(movies.find(movie => movie.id === id))
  }, [movies])

  // Inicializacion Modal Trailers de las Peliculas desde las Cards

  const handleCloseT = () => setShowTrailer(false);
  const handleShowT = useCallback((id) => {
    setShowTrailer(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a049d6086798142f1ce78897272be805&language=es`)
      .then(response => response.json())
      .then(data => 
        data.results.length === 0? 
        setChooseTrailer('error')
        :
        setChooseTrailer(data.results[0].key)
        )
      .catch(error => console.log(error)) 
  }, [])

  // Búsqueda de películas por el nombre

  const handleInputChange = ({ target }) => {
    setSearchValue({
      ...searchValue,
      [target.name]: target.value
    });
    filterMovies()
  }

  const filterMovies = () => {
    if (busqueda.length === 1) {
      setApiUrl(url + page.toString())
      getData(apiUrl)
    }
    else {
      getData(search_url + busqueda)
      // const arrayMovies = movies.filter((movie) =>
      //   movie.title.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
      // )
      // console.log(arrayMovies)
      // setMovies(arrayMovies)
    }
  }

  // Paginación del listado de películas

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
      setInputPage({
        currentPage: page - 1
      })
      setApiUrl(url + page.toString())
      getData(apiUrl)
    }
  }

  const handleNextPage = () => {
    if (page < 500) {
      setPage(page + 1)
      setInputPage({
        currentPage: page + 1
      })
      setApiUrl(url + page.toString())
      getData(apiUrl)
    }
  }

  const handleInputPage = ({ target }) => {
    setInputPage({
      ...inputPage,
      [target.name]: target.value
    });
    setPage(currentPage)
    setApiUrl(url + currentPage.toString())
    getData(apiUrl)
  }

  return (

    <div>

      {/* Barra de búsqueda */}
      <Container className="search-bar">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Busca tu película favorita"
            className="navbar-search"
            aria-label="Search"
            name="busqueda"
            value={busqueda}
            onChange={handleInputChange}
          />
          {/* <Button variant="warning" className="button-search"> */}
          <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644919135/Sprint-3/primary-search_bu9epu.png"
            type="button"
            alt=""
            className="img-search" />
          {/* <Icon className="material-icons">delete</Icon> */}
          {/* </Button> */}
        </Form>
      </Container>

      {/* Carrusel de los trailer de las películas */}
      <CarouselTrailers />

      <h1 className="cards-title" visible="false">Todas las peliculas</h1>

      {/* Botones para efectuar la paginación */}
      <Container className="container-pages mt-5">
        <h4
          className="btn-pages"
          visible="false"
          onClick={handlePreviousPage}
        >página anterior</h4>
        <Container className="container-input">
          <label className="label-input me-2">Ir a página: </label>
          <input
            className="input-pages"
            type="number"
            min="1"
            max='500'
            name="currentPage"
            value={currentPage}
            onChange={handleInputPage} />
        </Container>
        <h4
          className="btn-pages"
          onClick={handleNextPage}
        >página siguiente</h4>
      </Container>

      {/* Cards de las peliculas */}
      <Container className='row container-cards'>
        {
          movies.map(movie => (
            <Card
              key={movie.id}
              className="card">
              <Card.Img
                variant="top"
                src={img_path + movie.backdrop_path}
                alt=""
                className="img-card"
                onClick={() => handleShow(movie.id)}>
              </Card.Img>
              <div className="card-average">
                <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644907036/Sprint-3/Icon_ma1qlr.png" width="25px" heigth="25px" alt="" />
                <h3>{movie.vote_average}</h3>
              </div>
              <button className="btn-trailer-description"
                onClick={() => handleShowT(movie.id)}><strong>VER TRAILER</strong></button>
            </Card>
          ))
        }
      </Container>

      {/* Modal de la descripcion de las peliculas */}

      <Container>
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
                <h4>Fecha de Estreno: {chooseDescription.release_date}</h4>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <img
              src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1645406198/Sprint-3/now_dsaaug.png" alt=""
              className='button-trailer me-4' />

            <img
              src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1645406198/Sprint-3/after_at6ycz.png" alt=""
              className='button-trailer'
            />
          </Modal.Footer>
        </Modal>
      </Container>

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
              src={`https://www.youtube-nocookie.com/embed/${chooseTrailer}?rel=0&amp;controls=0&amp;showinfo=0`}
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

