import React from 'react'
import { Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import '../styles/style-navbar.css'

export const NavBar = () => {
    return (
        <div>
            <Navbar expand="lg" bg="#0F0E17" >
                <Container fluid>
                    <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644911579/Sprint-3/logo-blockBuster_co9wih.png" alt="" />
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
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Busca tu película favorita"
                                className="navbar-search"
                                aria-label="Search"
                            />
                            {/* <Button variant="warning" className="button-search"> */}
                            <img src="https://res.cloudinary.com/dkf2jot5c/image/upload/v1644919135/Sprint-3/primary-search_bu9epu.png" type="button" alt="" className="img-search" />
                            {/* <Icon className="material-icons">delete</Icon> */}
                            {/* </Button> */}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}
