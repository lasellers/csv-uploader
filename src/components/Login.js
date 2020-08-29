import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import store from "../redux/store";
import {addUser} from "../redux/actions";
import "./Login.css";
import {API_URL} from "../App";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    store.subscribe(function () {
        const user = store.getState().user;
        setIsLoggedIn(user.isLoggedIn);
    });

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {'Content-Type': 'application/json'}//,
        };

        fetch(API_URL + `/login?username=${email}&password=${password}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    store.dispatch(addUser(result));
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    if (isLoggedIn) {
        return <Redirect to='/messages'/>;
    }

    if (store.getState().user.isLoggedIn === true) {
        return (<Redirect to='/'/>);
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </Form.Group>
                <Button block disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}
