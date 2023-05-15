import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { loginEmailPassword, loginGoogle, loginFacebook } from '../../actions/actionLogin';
import '../../styles/style-login.css'

function Login() {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginEmailPassword(email, password));
        // history.replace('/')
    }

    const handleGoogle = () => {
        dispatch(loginGoogle());
        // history.replace('/')
    }

    const handleFacebook = () => {
        dispatch(loginFacebook());
        // history.replace('/')
    }

    return (
        <div>

            <Container className="link-header">
                <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644911579/Sprint-3/logo-blockBuster_co9wih.png" alt="" className='position-logo' />

                <h1 className='label-color'>Disfruta de los mejores títulos y contenidos</h1>
            </Container>

            <Container className="form-container">
                <Container className="container-button-link mt-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="label-color label-size">Correo</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Correo electrónico"
                            name="email"
                            value={email}
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="label-color label-size">Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={password}
                            onChange={handleInputChange} />
                    </Form.Group>
                </Container>

                <Container className="container-button-link mb-4">
                    <Button
                        className="button-s-n mb-4"
                        variant="primary container-but mb-4 "
                        type="submit"
                        onClick={handleLogin}>
                        Enviar
                    </Button>
                    <Container className="link-register">
                        <Form.Label className="label-color me-4">Aún no estás registrado?</Form.Label>
                        <Link to="/registro" className="link-position">Registrarse</Link>
                    </Container>
                </Container>

                <Container className="auth__social-networks mb-4 container-button-link">
                    <Button
                        className="google-btn button-s-n mb-4"
                        onClick={handleGoogle}
                        variant="success"
                    ><h4 className="button-label">Continuar con Google</h4>
                        <Container className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="30px" height="30px" alt="google button" />
                        </Container>
                    </Button>

                    <Button
                        className="google-btn button-s-n"
                        onClick={handleFacebook}
                        variant="success"
                    ><h4 className="button-label">Continuar con Facebook</h4>
                        <Container className="google-icon-wrapper">
                            <img className="google-icon" src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644981775/Sprint-3/icon-facebook_z2nepn.png" alt="google button" width="30px" height="30px" />

                        </Container>
                    </Button>
                </Container>
            </Container>
        </div>
    );
}

export default Login;


