import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Logout.css";
import {API_URL} from "../App";
import {Redirect} from "react-router";
import store from "../redux/store";
import {removeUser} from "../redux/actions";

export default function Logout() {
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    store.subscribe(function () {
        const user = store.getState().user;
        setEmail(user.email);
        setIsLoggedIn(user.isLoggedIn);
    });

    function validateForm() {
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {'Content-Type': 'application/json'}//,
        };

        fetch(API_URL + `/logout?username=${email}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('logout',result);
                    store.dispatch(removeUser());
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    if(!isLoggedIn) {
        return <Redirect to='/' />;
    }

    if (store.getState().user.isLoggedIn === false) {
        return (<Redirect to='/'/>);
    }

    return (
        <div className="Logout">
            <form onSubmit={handleSubmit}>
                <Button block disabled={!validateForm()} type="submit">
                    Logout
                </Button>
            </form>
        </div>
    );
}
