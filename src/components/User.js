import React, {useState, useEffect} from "react";
import {API_URL} from "../App";

export default function User(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch(API_URL + "/user/" + props.user.id)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result !== null) {
                        if (user === null || result.id !== user.id) {
                            setUser(result);
                        }
                    }
                },
                (error) => {
                }
            );
    });

    if (user === null || Object.entries(user).length === 0)
        return (
            <div>
                <h1>User</h1>
                <p>None.</p>
            </div>
        );

    return (
        <>
            <h1>User</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">#</div>
                    <div className="col-md-6">{user.id}</div>
                </div>
                <div className="row">
                    <div className="col-md-6">Name</div>
                    <div className="col-md-6">{user.name}</div>
                </div>
                <div className="row">
                    <div className="col-md-6">Email</div>
                    <div className="col-md-6">{user.email}</div>
                </div>
                <div className="row">
                    <div className="col-md-6">Created</div>
                    <div className="col-md-6">{user.createdAt}</div>
                </div>
                <div className="row">
                    <div className="col-md-6">Updated</div>
                    <div className="col-md-6">{user.updatedAt}</div>
                </div>
            </div>
        </>
    );
}
