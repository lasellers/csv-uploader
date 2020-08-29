import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router";
import store from "../redux/store";
import {addUser} from "../redux/actions";
import "./Register.css";
import {API_URL} from "../App";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    store.subscribe(function () {
        const user = store.getState().user;
        setIsLoggedIn(user.isLoggedIn);
    });

    function validateForm() {
        return email.length > 0 && password.length > 0 && name.length > 0;
    }

    function handleSubmit(event) {
        console.log('handleSubmit');
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {'Content-Type': 'application/json'}
        };
        console.info(email,password,name);
        console.info(requestOptions);
        fetch(API_URL + `/user?email=${email}&password=${password}&name=${name}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('result ', result);
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

    return (
        <div className="Register">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
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
                    Register
                </Button>
            </form>
        </div>
    );
}
