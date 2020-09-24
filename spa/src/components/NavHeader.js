import React from 'react';
import {Link} from "react-router-dom";

import './NavHeader.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {useLocation} from 'react-router-dom';

function NavHeader(props) {
    let location = useLocation();
    return (
        <>
            <header id="navheader">
                <Navbar expand="lg">
                    <Nav className="ml-auto">
                        <h1>CSV Uploader</h1>
                    </Nav>
                    <Nav className="mr-auto">
                        <ul className="steps-inline">
                            <Nav.Link as={Link} to="/">
                                <div
                                    className={['', '/', '/upload'].includes(location.pathname) ? 'btn btn-step active' : 'btn btn-step'}>1
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/mapping">
                                <div
                                    className={location.pathname === '/mapping' ? 'btn btn-step active' : 'btn btn-step'}>2
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/preview">
                                <div
                                    className={location.pathname === '/preview' ? 'btn btn-step active' : 'btn btn-step'}>3
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/process">
                                <div
                                    className={location.pathname === '/process' ? 'btn btn-step active' : 'btn btn-step'}>4
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contacts">
                                <div
                                    className={location.pathname === '/contacts' ? 'btn btn-step active' : 'btn btn-step'}>5
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/custom-attributes">
                                <div
                                    className={location.pathname === '/custom-attributes' ? 'btn btn-step active' : 'btn btn-step'}>6
                                </div>
                            </Nav.Link>
                        </ul>
                    </Nav>
                </Navbar>
            </header>
        </>
    )
}

export default NavHeader;
