import { memo, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { img_path, url } from "../helpers/url";

export const ModalDescription = memo(() => {

    const [movies, setMovies] = useState([])
    const [show, setShow] = useState(false);
    const [chooseDescription, setChooseDescription] = useState('Hola')

    useEffect(() => {
        getData()
      }, [setChooseDescription])
    
    const getData = async () => {
        const resp = await fetch(url)
        const data = await resp.json()
        setMovies(data.results)
    }

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setShow(true)
      const buscado = movies.find(movie => movie.id === id)
      console.log(buscado)
    }

    return (
        <div>
            {/* Cards de las peliculas */}

            <div className='row container-cards'>
                {
                    movies.map(movie => (
                        <Card
                            style={{ width: '18rem' }}
                            key={movie.id}
                            className="card">
                            <Card.Img
                                variant="top"
                                src={img_path + movie.backdrop_path}
                                alt=""
                                className="img-card"
                                onClick={handleShow(movie.id)} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    {movie.overview}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>

            {/* Modal de la descripcion de las peliculas */}

            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{chooseDescription}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
})
