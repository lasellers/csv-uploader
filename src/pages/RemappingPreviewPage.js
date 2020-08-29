import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";

class RemappingPreviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goForward: false,
            goBack: false
        };
    }

    render() {
        const {error, goForward, goBack} = this.state;

        const columns = store.getState().csv.namedColumns;
        const data = store.getState().csv.remapped_csv_data;

        if (goForward) {
            return <Redirect to='/process'/>;
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

        return (
            <>
                <h1>Preview</h1>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        {columns.map(column => (
                            <th>{column}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            {row.map(col => (
                                <td>{col}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>

                {nav}
            </>
        );
    }
}

export default RemappingPreviewPage;
