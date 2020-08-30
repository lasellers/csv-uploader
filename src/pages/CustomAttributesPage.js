import React from 'react';
import {API_URL} from "../App";
import store from "../redux/store";
import {Redirect} from "react-router";
import {BsFillTrashFill} from 'react-icons/bs';
import ErrorBox from "../components/ErrorBox";

class CustomAttributesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goBack: false,
            goHome: false,
            contacts: [
                {custom_attributes: []}
            ]
        };
    }

    componentDidMount() {
        this.getContacts();
    }

    getContacts = () => {
        fetch(API_URL + "/contacts")
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((contacts) => {
                console.log(contacts);
                    this.setState({
                        isLoaded: true,
                        contacts
                    });
                },
                (error) => {
                    console.error(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    onCustomAttributeDelete = async (id) => {
        fetch(API_URL + "/custom-attributes/" + id, {method: "DELETE"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.getContacts();
                },
                (error) => {
                    console.error(error);
                }
            );
    };

    render() {
        const {error, isLoaded, contacts, goBack, goHome} = this.state;
        const customAttributes = contacts.flatMap(row => {
            return row.custom_attributes;
        });
        const columns = store.getState().csv.namedColumns;

        if (goBack) {
            return <Redirect to='/contacts'/>;
        }
        if (goHome) {
            return <Redirect to='/upload'/>;
        }

        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back</button>
                    <button className="btn btn-primary ml-2" onClick={() => this.setState({goHome: true})}>Home</button>
                </div>
           </>
        );

        if (!isLoaded)
            return (
                <>
                    <h1>Custom Attributes</h1>
                    <p>None.</p>
                </>
            );

        return (
            <>
                <h1>Custom Attributes</h1>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Contact Id</th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                        {customAttributes.map(customAttribute => (
                        <tr key={customAttribute.contact_id + '.' + customAttribute.id}>
                            <td>{customAttribute.id}</td>
                            <td>{customAttribute.contact_id}</td>
                            <td>{customAttribute.key}</td>
                            <td>{customAttribute.value}</td>
                            <td>
                                <button className="btn" onClick={() => this.onCustomAttributeDelete(customAttribute.id)}><BsFillTrashFill/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {nav}

                <ErrorBox error={error}/>
            </>
        );
    }
}

export default CustomAttributesPage;
