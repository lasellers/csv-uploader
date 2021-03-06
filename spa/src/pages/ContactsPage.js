import React from 'react';
import {API_URL} from "../App";
import {Redirect} from "react-router";
import {BsFillTrashFill} from 'react-icons/bs';
import store from "../redux/store";
import {addError, clearError} from "../redux/actions";

class ContactsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goBack: false,
            goNext: false,
            contacts: []
        };
    }

    componentDidMount() {
        this.getContacts();
    }

    getContacts = () => {
        fetch(API_URL + "/contacts")
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }
                return response.json();
            })
            .then((contacts) => {
                if (Array.isArray(contacts)) {
                    this.setState({
                        isLoaded: true,
                        contacts
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                store.dispatch(addError(error));
                this.setState({
                    isLoaded: true,
                    contacts: []
                });
            });
    };

    onContactDelete = async (id) => {
        fetch(API_URL + "/contacts/" + id, {method: "DELETE"})
            .then(res => res.json())
            .then((result) => {
                this.getContacts();
            })
            .catch((error) => {
                console.error(error);
                store.dispatch(addError(error));
                this.setState({
                    contacts: [] // if error, set this to empty array
                });
            });
    };

    render() {
        const {isLoaded, contacts, goBack, goNext} = this.state;

        if (goBack) {
            return <Redirect to='/process'/>;
        }
        if (goNext) {
            return <Redirect to='/custom-attributes'/>;
        }

        const title = (
            <h1>Contacts</h1>
        );
        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => {
                        store.dispatch(clearError());
                        this.setState({goNext: true});
                    }}>Next</button>
                </div>
            </>
        );

        if (!isLoaded)
            return (
                <>
                    {title}

                    <p>None.</p>

                    {nav}
                </>
            );

        return (
            <>
                {title}

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
                            <td>
                                <button className="btn" onClick={() => this.onContactDelete(contact.id)}>
                                    <BsFillTrashFill/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {nav}
            </>
        );
    }
}

export default ContactsPage;
