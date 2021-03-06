import React from 'react';
import {API_URL} from "../App";
import store from "../redux/store";
import {Redirect} from "react-router";
import {addError, clearError} from "../redux/actions";

class ProcessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goBack: false,
            goNext: false,
            isSaved: false,
            data: {
                contact_inserts: 0,
                custom_attribute_inserts: 0,
                contacts: [],
                custom_attributes: []
            }
        };
    }

    componentDidMount() {
        const contacts = store.getState().csv.remapped_csv_data;
        const custom_attributes = store.getState().csv.unmapped_data;

        fetch(API_URL + "/csv/save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contacts, custom_attributes: custom_attributes})
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    isSaved: true,
                    data: {
                        contacts: data.contacts,
                        custom_attributes: data.custom_attributes,
                        contact_inserts: data.contact_inserts,
                        custom_attribute_inserts: data.custom_attribute_inserts
                    }
                });
                // get the formrequest validation errors from the api
                if (Object.prototype.hasOwnProperty.call(data, 'errors') &&
                    data.errors.length > 0) {
                    store.dispatch(addError(data.errors));
                }
            })
            .catch((error) => {
                console.error(error);
                store.dispatch(addError(error));
                this.setState({
                    isSaved: true,
                    data: {
                        contacts: [],
                        custom_attributes: [],
                        contact_inserts: 0,
                        custom_attribute_inserts: 0
                    }
                });
            });
    }

    render() {
        const {goNext, goBack, isSaved} = this.state;
        const data = this.state.data;

        if (goNext) {
            return <Redirect to='/contacts'/>;
        }
        if (goBack) {
            return <Redirect to='/preview'/>;
        }

        const title = (
            <h1>Process</h1>
        )
        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => {
                        store.dispatch(clearError());
                        this.setState({goNext: true});
                    }}>Next
                    </button>
                </div>
            </>
        );

        if (!isSaved)
            return (
                <>
                    {title}

                    <p>Processing....</p>

                    {nav}
                </>
            );

        return (
            <>
                {title}

                <p>CSV records have been added to database.</p>

                <hr/>

                <p>Contact inserts: {data.contact_inserts}</p>
                <p>Contacts rows: {data.contacts?.length}</p>

                <br/>

                <p>Custom Attribute inserts: {data.custom_attribute_inserts}</p>
                <p>Custom Attributes data rows: {data.custom_attributes?.length}</p>

                {nav}
            </>
        );
    }
}

export default ProcessPage;
