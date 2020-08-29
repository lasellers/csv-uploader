import React, {useState} from 'react';
import store from "./redux/store";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import CsvUploadPage from "./pages/CsvUploadPage";
import CsvColumnMappingPage from "./pages/CsvColumnMappingPage";
import RemappingPreviewPage from "./pages/RemappingPreviewPage";
import ProcessPage from "./pages/ProcessPage";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";

export const API_URL = "http://localhost:8000/api";

function App(props) {
//    const [user, setUser] = useState(store.getState().user);
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

/*    store.subscribe(function () {
        const user = store.getState().user;
        setUser(user.user);
        setIsLoggedIn(user.isLoggedIn);
    });*/

    let nav = <>
        <div className="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Steps</h3>
                </div>

                <ul className="list-unstyled components">
                    <Nav.Link as={Link} to="/uploads">CSV Upload</Nav.Link>
                    <Nav.Link as={Link} to="/mapping">Column Mapping</Nav.Link>
                    <Nav.Link as={Link} to="/preview">Preview</Nav.Link>
                    <Nav.Link as={Link} to="/process">Process</Nav.Link>
                    <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
                </ul>
            </nav>

        </div>
    </>;

    return (
        <BrowserRouter>
            <header id="App-header">
                <Navbar expand="lg">
                    <Nav className="">
                        <h1>CSV Uploader</h1>
                    </Nav>
                    <Nav className="ml-auto">
                    </Nav>
                </Navbar>
            </header>

            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {nav}
                </Navbar.Collapse>
            </Navbar>

            <main className="App">
                <div id="App-body">
                    <Switch>
                        <Route path="/" component={CsvUploadPage} exact/>
                        <Route path="/uploads" component={CsvUploadPage}/>
                        <Route path="/mapping" component={CsvColumnMappingPage} exact/>
                        <Route path="/preview" component={ProcessPage} exact/>
                        <Route path="/process" component={ProcessPage} exact/>
                        <Route path="/contacts" component={ContactsPage} exact/>
                        <Route path="/not-found" component={NotFoundPage} exact/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </main>

        </BrowserRouter>
    )
}

export default App;
