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
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch(API_URL + "/csv/process")
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
        const {error, goForward, goBack, isLoaded} = this.state;

        if (goForward) {
            return <Redirect to='/contacts'/>;
        }
        if (goBack) {
            return <Redirect to='/mapping'/>;
        }

        if (!isLoaded)
            return (
                <div>
                    <h1>Processing...</h1>
                </div>
            );

        return (
            <>
                <div className="row">
                    <div className="col-6">

                        <h1>Messages</h1>

                        <div>
                            <h1>Processed.</h1>
                        </div>

                    </div>
                    <div className="col-6">

                    </div>

                </div>

                <div>
                    <button onClick={() => this.setState({goBack: true})}>Back</button>
                    <button onClick={() => this.setState({goForward: true})}>Next</button>
                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default ProcessPage;
