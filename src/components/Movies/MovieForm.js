import React, {useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { listMoviesAsync, registerMovieAsync } from '../../actions/actionMovies';
import { fileUpload } from '../../helpers/FileUpload';
import { Input } from '@mui/material';


export const MovieForm = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listMoviesAsync())
     }, [dispatch])

    const formik = useFormik({
        initialValues: {
            url: '',
            titulo: '',
            calificacion: '',
            fecha_lanzamiento: '',
            sinopsis: ''           
                    
        },
        onSubmit: (data) => {
            dispatch(registerMovieAsync(data))
        },
        
    })

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

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

    return (
        <div>
            <div className="container mt-5">

                <hr />
                <div className="row">

                    <div div className="col-12">
                        <h3 className="text-center"> Añadir Películas </h3>

                        {/* <form className="form-group" onSubmit={formik.handleSubmit}> */}
                        <form className="form-group" onSubmit={formik.handleSubmit}>
                            <input
                                id="fileSelector"
                                type="file"
                                className="form-control "
                                placeholder="url image"
                                name="url"
                                style={{ display: 'none' }}
                                onChange={handleFileChanged}
                                required />

                            <button
                                className="btn btn-dark"
                                onClick={handlePictureClick}
                                type="button">Imagen</button>

                            <input
                                type="text"
                                className="form-control mt-2"
                                name="titulo"
                                autoComplete="off"
                                placeholder="Titulo"
                                onChange={formik.handleChange}
                                required />

                            <input
                                type="text"
                                className="form-control mt-2"
                                name="calificacion"
                                autoComplete="off"
                                placeholder="Calificación"
                                onChange={formik.handleChange}
                                required />

                            <input
                                type="text"
                                className="form-control mt-2"
                                name="fecha_lanzamiento"
                                autoComplete="off"
                                placeholder="Fecha de estreno"
                                onChange={formik.handleChange}
                                required />

                            <textarea
                                className="form-control mt-2"
                                autoComplete="off"
                                name="sinopsis"
                                placeholder="Sinopsis"
                                onChange={formik.handleChange}
                                required
                            ></textarea>

                            <div className="d-grid gap-2 mx-auto mt-2">
                                <Input
                                    value="Guardar"
                                    type="submit"
                                    className="btn btn-warning"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

