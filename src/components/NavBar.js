import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { logout } from '../actions/actionLogin';
import { Link } from '@mui/material';
import { GOOGLE_API_KEY } from '../helpers/url';
import '../styles/style-navbar.css'

// import GeoLocation2 from '../hooks/useGeoLocation2';

export const NavBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [address, setAddress] = useState('')
    const [latitude, longitude, getLocation] = useGeoLocation()

    useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setAddress(data.results[6].formatted_address)
            })
            .catch(error => alert(error))
    }, [latitude, longitude])

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div>
            <Navbar expand="lg" bg="#0F0E17" className="navbar-container">
                <Container fluid>
                    <Link
                        as={NavLink}
                        to="/">
                            <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644911579/Sprint-3/logo-blockBuster_co9wih.png" alt="" />
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 navbar-links"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <button className="me-5 button-navbar">Todas</button>
                            <button className="me-5 button-navbar">Mas valoradas</button>
                            <button className="me-5 button-navbar">Menos valoradas</button>
                        </Nav>
                        <Container className="container-address">
                            <img
                                src="https://i.pinimg.com/736x/c6/71/dc/c671dc8b74c06a045dd6f9dfc1b30f86.jpg"
                                alt=""
                                className="img-location"
                                onLoad={getLocation} />
                            <h4 className="address-label">
                                {address}
                            </h4>
                        </Container>
                        <Link
                            as={NavLink}
                            to="/favs">
                                <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644907036/Sprint-3/Icon_ma1qlr.png"
                                className='btn-favs'
                                alt=""/>
                        </Link>

                        <h4
                            className="btn-logout"
                            onClick={() => handleLogout()}>
                            Cerrar Sesión
                        </h4>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}
