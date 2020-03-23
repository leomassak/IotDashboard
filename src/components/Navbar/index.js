import React, { Component } from 'react'

import {Navbar, Nav, NavDropdown, Form,  Button} from 'react-bootstrap';

import './style.css';


export default class UserNavbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0, 
        }
    }
    

    logoutHandler = (e) => {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {

        if(localStorage.length === 0){
            return (
                <div className="navbar-unloged">
                    <Navbar className="color-nav" expand="lg" variant="dark">
                    <Navbar.Brand className="brand">IOTDashboard</Navbar.Brand>
                    </Navbar>
                </div>
            )
        }
        else{
            const user = JSON.parse(localStorage.getItem('user'));

            return (
                <div className="navbar-loged">
                    <Navbar className="nav-loged" expand="lg" variant="dark">
                        <NavDropdown title={user.username} id="basic-nav-dropdown" className="dropcustom">
                            <NavDropdown.Item href="/user/config">Configurações</NavDropdown.Item>
                            <NavDropdown.Item href="user/info">Informações</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.logoutHandler} >Sair</NavDropdown.Item>
                        </NavDropdown>

                        <Navbar.Brand className="brand">IOTDashboard</Navbar.Brand>

                        <Nav>
                            <Nav.Link href="/user/buttons"><i className="fas fa-bullseye fa-lg"></i></Nav.Link>    
                        </Nav>
                    </Navbar>
                </div>
            )
        }    
    }
}
