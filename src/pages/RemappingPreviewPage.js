import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";

class RemappingPreviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goNext: false,
            goBack: false
        };
    }

    render() {
        const {goNext, goBack} = this.state;

        const columns = store.getState().csv.namedColumns;
        const data = store.getState().csv.remapped_csv_data;

        if (goNext) {
            return <Redirect to='/process'/>;
        }
        if (goBack) {
            return <Redirect to='/mapping'/>;
        }

        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => this.setState({goNext: true})}>Next</button>
                </div>
            </>
        );

        return (
            <>
                <h1>Preview</h1>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {row.map((col, index2) => (
                                <td key={index + "." + index2}>{col}</td>
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
