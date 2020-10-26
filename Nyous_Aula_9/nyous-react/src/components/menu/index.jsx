import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

const Menu = () => {

    const history = useHistory();

    const sair =(event) => {
        event.preventDefault();

        localStorage.removeItem('token-nyous')

        history.push("/home");  
    }

    const renderMenu = () => {
        const token = localStorage.getItem('token-nyous');
        
        if(token === null){
            return(
                <Nav>
                    <Nav.link href="/login">Login</Nav.link>
                    <Nav.link href="/cadastrar">Cadastrar</Nav.link>
                </Nav>
            )
        }else if( jwt_decode(token).role === 'Admin' ){
            return (
                <Nav>
                    <Nav.link href="/admin/dashboard">Dashboard</Nav.link>
                    <Nav.link href="/admin/categorias">Categorias</Nav.link>
                    <Nav.link href="/admin/eventos">Eventos</Nav.link>
                    <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/perfil">Prfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={event => sair(event)}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }else{
            return(
                <Nav>
                    <Nav.link href="/admin/dashboard">Dashboard</Nav.link>
                    <Nav.link href="/admin/categorias">Sair</Nav.link>
                </Nav>
            )
        }

        console.log(token);
    }

    return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><img src={logo} alt="Nyous"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Menu;