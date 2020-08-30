import React from 'react';
import {API_URL} from "../App";
import store from "../redux/store";
import {Redirect} from "react-router";
import ErrorBox from "../components/ErrorBox";

class ProcessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goBack: false,
            goNext: false,
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

        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2');
        console.log(data);
        console.log(unmapped_data);
        fetch(API_URL + "/csv/save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data, unmapped_data: unmapped_data})
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                    this.setState({
                        isLoaded: true,
                        data
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        isLoaded: true,
                        data: []
                    });
                    console.error(error);
                }
            )
    }

    render() {
        const {error, goNext, goBack, isLoaded} = this.state;
        const data = this.state.data;

        if (goNext) {
            return <Redirect to='/contacts'/>;
        }
        if (goBack) {
            return <Redirect to='/mapping'/>;
        }

        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => this.setState({goNext: true})}>Next
                    </button>
                </div>
            </>
        );

        if (!isLoaded)
            return (
                <>
                    <h1>Process</h1>
                    <p>Processing....</p>
                </>
            );

        return (
            <>
                <h1>Process</h1>
                <p>CSV records have been added to database.</p>

                <hr/>

                <p>Data inserts: {data.data_inserts}</p>
                <p>Unmapped data inserts: {data.unmapped_data_inserts}</p>
                <p>Data rows: {data.data?.length}</p>
                <p>Unmapped data rows: {data.unmapped_data?.length}</p>

                {nav}

                <ErrorBox error={error}/>
            </>
        );
    }
}

export default ProcessPage;
