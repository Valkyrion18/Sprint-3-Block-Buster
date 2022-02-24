import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMovieAsync } from '../../actions/actionMovies';
import '../../styles/style-listmovies.css'

export const ListMovies = () => {

    const [show, setShow] = useState(false);
    const [chooseList, setChooseList] = useState({})

    const dispatch = useDispatch();

    const { movies } = useSelector(store => store.movie);

    const handleClose = () => setShow(false);
    const handleShow = (titulo) => {
        setShow(true);
        setChooseList(movies.find(movie => movie.titulo === titulo))
        console.log(movies.find(movie => movie.titulo === titulo))
    }

    return (
        <div>
            <div className="container mt-5 mb-3">
                <h3 className="text-center"> Listado de Películas </h3>
                <table className="table text-center mt-3 color-table">

                    <thead>
                        <tr>
                            <th scope="col">Imagen</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Calificación</th>
                            <th scope="col">Fecha de Estreno</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((element, index) => (
                                <tr key={index}>
                                    <td><img
                                        src={element.url}
                                        className="img-list"
                                        width="50"
                                        height="50"
                                        alt=""
                                        onClick={() => handleShow(element.titulo)} />
                                    </td>
                                    <td>{element.titulo}</td>
                                    <td>
                                        <div>
                                        <img 
                                            src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644907036/Sprint-3/Icon_ma1qlr.png" 
                                            alt=""
                                            className='icon-favs me-2'/>
                                        {element.calificacion}
                                        </div>
                                    </td>
                                    <td>{element.fecha_lanzamiento}</td>
                                    <td>
                                        <div className="btn-actions">
                                        <input
                                            value="Editar"
                                            type="button"
                                            className="btn btn-success"
                                            // onClick={() => dispatch(deleteMovieAsync(element.titulo))}
                                        />
                                        <input
                                            value="Borrar"
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => dispatch(deleteMovieAsync(element.titulo))}
                                        />
                                        </div>    
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

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
                            <img src={chooseList.url} alt="" className="img-modal" />
                            <div className="data-modal">
                                <h1>{chooseList.titulo}</h1>
                                <p className="overview-modal">{chooseList.sinopsis}</p>
                                <div>
                                    <h4>Fecha de Estreno: {chooseList.fecha_lanzamiento}</h4>
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
            </div>
        </div>
    )
}
