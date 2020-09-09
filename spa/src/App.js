import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import CsvUploadPage from "./pages/CsvUploadPage";
import CsvColumnMappingPage from "./pages/CsvColumnMappingPage";
import RemappingPreviewPage from "./pages/RemappingPreviewPage";
import ProcessPage from "./pages/ProcessPage";
import ContactsPage from "./pages/ContactsPage";
import CustomAttributesPage from "./pages/CustomAttributesPage";
import NotFoundPage from "./pages/NotFoundPage";

import NavHeader from "./components/NavHeader";
import ErrorBox from "./components/ErrorBox";

export const API_URL = process.env.REACT_APP_API_URL;

function App(props) {
    console.info('env API_URL:' + API_URL);
    console.info('env:', process.env);
    return (
        <BrowserRouter>
            <NavHeader/>
            <ErrorBox/>
            <main className="App">
                <div id="App-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <Switch>
                                    <Route path="/" component={CsvUploadPage} exact/>
                                    <Route path="/upload" component={CsvUploadPage}/>
                                    <Route path="/mapping" component={CsvColumnMappingPage} exact/>
                                    <Route path="/preview" component={RemappingPreviewPage} exact/>
                                    <Route path="/process" component={ProcessPage} exact/>
                                    <Route path="/contacts" component={ContactsPage} exact/>
                                    <Route path="/custom-attributes" component={CustomAttributesPage} exact/>
                                    <Route path="/not-found" component={NotFoundPage} exact/>
                                    <Route component={NotFoundPage}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </BrowserRouter>
    )
}

export default App;
