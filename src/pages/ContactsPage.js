import React from 'react';
import {API_URL} from "../App";
import store from "../redux/store";
import {Redirect} from "react-router";

class ContactsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goBack: false,
            goHome: false,
            contacts: []
        };
    }

    componentDidMount() {
        this.getContacts();
    }

    getContacts = () => {
        fetch(API_URL + "/contacts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        contacts: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    onContactDelete = async (id) => {
        fetch(API_URL + "/contacts/" + id, {method: "DELETE"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.getContacts();
                },
                (error) => {
                }
            );
    };

    render() {
        const {error, isLoaded, contacts, goBack, goHome} = this.state;

        if (goBack) {
            return <Redirect to='/process'/>;
        }
        if (goHome) {
            return <Redirect to='/upload'/>;
        }

        const columns = store.getState().csv.namedColumns;

        if (!isLoaded)
            return (
                <div>
                    <h1>Contacts</h1>
                    <p>None.</p>
                </div>
            );

        return (
            <>
                <div className="row">
                    <div className="col-12">

                        <h1>Contacts</h1>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>Team</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Sticky Phone</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>x</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contacts.map(contact => (
                                <tr key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>{contact.team_id}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.sticky_phone_number_id}</td>
                                    <td>{contact.created_at}</td>
                                    <td>{contact.updated_at}</td>
                                    <td><button onClick={ () => this.onContactDelete(contact.id)}>X</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>

                </div>

                <div>
                    <button onClick={() => this.setState({goBack: true})}>Back</button>
                    <button onClick={() => this.setState({goHome: true})}>Home</button>
                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default ContactsPage;
