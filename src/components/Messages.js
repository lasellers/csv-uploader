import React from 'react';
import {API_URL} from "../App";
import AddMessage from "./AddMessage";
import store from "../redux/store";
import {Redirect} from "react-router";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            isLoaded: false,
            messages: []
        };

    }

    componentDidMount() {
        fetch(API_URL + "/messages")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        messages: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, messages} = this.state;

        if (store.getState().user.isLoggedIn === false) {
            return (<Redirect to='/'/>);
        }

        if (!isLoaded)
            return (
                <div>
                    <h1>Messages</h1>
                    <p>None.</p>
                </div>
            );

        return (
            <>
                <div className="row">
                    <div className="col-6">

                        <h1>Messages</h1>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>Title</th>
                                <th>Message</th>
                                <th>UserId</th>
                                <th>RepliedTo</th>
                            </tr>
                            </thead>
                            <tbody>
                            {messages.map(message => (
                                <tr key={message.id}>
                                    <td>{message.id}</td>
                                    <td>{message.title}</td>
                                    <td>{message.message}</td>
                                    <td>{message.userId}</td>
                                    <td>{message.repliedTo}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-6">

                        <AddMessage/>
                    </div>

                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default Messages;
