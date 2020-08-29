import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router";
import store from "../redux/store";
import "./Register.css";
import {API_URL} from "../App";

export default function AddMessage() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const [isPosted, setIsPosted] = useState(false);

    store.subscribe(function () {
        const user = store.getState().user;
        console.log('!!!!!!!!!!! AddMessage store subscribe', user);
        setUser(user.user);
    });

    function validateForm() {
        return message.length > 0;
    }

    function handleSubmit(event) {
        console.log('handleSubmit');
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {'Content-Type': 'application/json'}
        };
        console.log(requestOptions);
        console.log(user);

        fetch(API_URL + `/message?title=${title}&message=${message}&userId=${user.id}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('add message result ', result);
                   // store.dispatch(addUser(result));
                    setIsPosted(true);
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    if (isPosted) {
        return <Redirect to='/messages'/>;
    }

    return (
        <div className="AddMessage">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        autoFocus
                        type="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea" rows="5"
                        autoFocus
                        type="message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Button block disabled={!validateForm()} type="submit">
                    Add Message
                </Button>
                <div>From: {user.name}</div>
            </form>
        </div>
    );
}
