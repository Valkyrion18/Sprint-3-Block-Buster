import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { updateMovieAsync } from '../../actions/actionMovies';
import { fileUpload } from '../../helpers/FileUpload';

const ModalUpdate = (datosModal) => {

    const [show, setshow] = useState(true)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            url: datosModal.datosModal.url,
            titulo: datosModal.datosModal.titulo,
            calificacion: datosModal.datosModal.calificacion,
            fecha_lanzamiento: datosModal.datosModal.fecha_lanzamiento,
            sinopsis: datosModal.datosModal.sinopsis
        },
        onSubmit: (data) => {
            dispatch(updateMovieAsync(data))
        }
    })

    const handleFileChanged = (e) => {
        formik.initialValues.url = ''
        const file = e.target.files[0];
        fileUpload(file)
            .then(response => {
                formik.initialValues.url = response
                console.log(response);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    useEffect(() => {
        // console.log(datosModal)
    }, [datosModal])

    const closeModal = () => {
        setshow(false)
    }

    return (
        <div>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Actualizar datos de las peliculas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            id="fileSelector"
                            type="file"
                            className="form-control "
                            placeholder="url image"
                            name="url"
                            onChange={handleFileChanged}
                            required />

                        <input
                            type="text"
                            className="form-control mt-2"
                            name="titulo"
                            autoComplete="off"
                            placeholder="Titulo"
                            value={formik.values.titulo}
                            onChange={formik.handleChange}
                            required />

                        <input
                            type="text"
                            className="form-control mt-2"
                            name="calificacion"
                            placeholder='Calificacion'
                            autoComplete="off"
                            value={formik.values.calificacion}
                            onChange={formik.handleChange}
                            required />

                        <input
                            type="text"
                            className="form-control mt-2"
                            name="fecha_lanzamiento"
                            autoComplete="off"
                            placeholder="Fecha de estreno"
                            value={formik.values.fecha_lanzamiento}
                            onChange={formik.handleChange}
                            required />

                        <textarea
                            className="form-control mt-2"
                            autoComplete="off"
                            name="sinopsis"
                            placeholder="Sinopsis"
                            value={formik.values.sinopsis}
                            onChange={formik.handleChange}
                            required
                        ></textarea>

                        <Modal.Footer>
                            <Button
                                variant="dark"
                                onClick={closeModal}>Cerrar</Button>
                            <Button variant="warning"
                                type="submit">Actualizar</Button>
                        </Modal.Footer>
                    </form>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ModalUpdate