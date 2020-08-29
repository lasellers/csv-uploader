import React, {Component} from "react";
import {API_URL} from "../App";
import User from './User';
import store from "../redux/store";
import {Redirect} from "react-router";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            users: [],
            user: {}
        };
    }

    componentDidMount() {
        fetch(API_URL + "/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('result', result);
                    this.setState({
                        users: result
                    });
                },
                (error) => {
                    console.log('error', error);
                    this.setState({
                        error
                    });
                }
            )
    }

    setUser(user) {
        console.log('************** setUser user', user);
        this.setState({user: user});
    }

    render() {
        const {error, users, user} = this.state;

        if (store.getState().user.isLoggedIn === false) {
            return (<Redirect to='/'/>);
        }


        if (users.length === 0)
            return (
                <div>
                    <h1>Users</h1>
                    <p>None.</p>
                </div>
            );

        return (
            <>
                <div className="row">

                    <div className="col-6">

                        <h1>Users</h1>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(userItem => (
                                <tr key={userItem.id} onClick={() => this.setUser(userItem)}>
                                    <td>{userItem.id}</td>
                                    <td>{userItem.name}</td>
                                    <td>{userItem.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-6">

                        <User user={user}/>

                    </div>

                </div>

                {error.toLocaleString()}
            </>
        );
    }
}

export default Users;
