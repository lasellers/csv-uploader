import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addRemappedCsvData} from "../redux/actions";

class RemappingPreviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goForward: false,
            goBack: false
        };
    }

    onPreviewAccept = async event => {
        console.log('onPreviewAccept', event);
        const header = store.getState().csv.header;
        const data = store.getState().csv.data;

        console.log('data**', data);
        const remappedData = this.remappedCsv(
            data,
            this.state.remapped
        );
        console.log('remapped**', remappedData);

        store.dispatch(addRemappedCsvData(remappedData));

        // Update the state
        this.setState({
            remapped: remappedData,
            goForward: true
        });
    };

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

        return (
            <>
                <div className="row">
                    <div className="col-6">

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

                    </div>
                    <div className="col-6">

                    </div>

                </div>

                <div>
                    <button onClick={() => this.setState({goBack: true})}>Back</button>
                    <button onClick={this.onPreviewAccept}>Next</button>
                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default RemappingPreviewPage;
