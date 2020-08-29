import React from 'react';
import {API_URL} from "../App";
import store from "../redux/store";
import {Redirect} from "react-router";

class ProcessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goBack: false,
            goForward: false,
            isLoaded: false,
            data: {
                data_inserts: 0,
                unmapped_data_inserts: 0,
                data: [],
                unmapped_data: []
            }
        };
    }

    componentDidMount() {
        const data = store.getState().csv.remapped_csv_data;
        const unmapped_data = store.getState().csv.unmapped_data;
        fetch(API_URL + "/csv/save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data, unmapped_data: unmapped_data})
        })
            .then(res => res.json())
            .then((data) => {
                    this.setState({
                        isLoaded: true,
                        data: data
                    });
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    render() {
        const {error, goForward, goBack, isLoaded} = this.state;
        const data = this.state.data;

        if (goForward) {
            return <Redirect to='/contacts'/>;
        }
        if (goBack) {
            return <Redirect to='/mapping'/>;
        }

        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back</button>
                    <button className="btn btn-primary ml-2" onClick={() => this.setState({goForward: true})}>Next</button>
                </div>

                {error.toLocaleString()}
            </>
        );

        if (!isLoaded)
            return (
                <div>
                    <h1>Processing...</h1>
                </div>
            );

        return (
            <>
                <h1>Processed</h1>
                <p>CSV records have been added to database.</p>

                <hr />

                <p>Data inserts: {data.data_inserts}</p>
                <p>Unmapped data inserts: {data.unmapped_data_inserts}</p>
                <p>Data rows: {data.data.length}</p>
                <p>Unmapped data rows: {data.unmapped_data.length}</p>

                {nav}
            </>
        );
    }
}

export default ProcessPage;
