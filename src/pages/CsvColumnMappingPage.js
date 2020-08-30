import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addRemappedCsvData, addUnmappedData} from "../redux/actions";

class CsvColumnMappingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            remapped_order: store.getState().csv.order,
            goNext: false,
            goBack: false
        };

        this.onMappingChange = this.onMappingChange.bind(this);
        this.onMappingAccept = this.onMappingAccept.bind(this);
    }

    onMappingChange = async (event) => {
        const id = (event.target.id.split('-'))[1]; //event.target.selectedIndex;
        const value = event.target.value;

        const remapped_order = this.state.remapped_order;
        remapped_order[id] = value;
        this.setState({remapped_order: remapped_order})
    };

    onMappingAccept = async event => {
        const header = store.getState().csv.header;
        const csv_data = store.getState().csv.csv_data;
        const remapped_order = this.state.remapped_order;

        const [remappedData, unmappedData] = this.remappedCsv(csv_data, remapped_order);

        store.dispatch(addRemappedCsvData(remappedData));
        store.dispatch(addUnmappedData(unmappedData));

        // Update the state
        this.setState({
            remapped: remappedData,
            goNext: true
        });
    };

    remappedCsv = (rows, remapped_order) => {
        let newRows = [];
        rows.forEach(function (row) {
            let newRow = [];
            row.forEach(function (value, index) {
                newRow[remapped_order[index]] = value;
            });
            newRows.push(newRow);
        });
        return [newRows, []];
    };

    render() {
        const {error, goNext, goBack} = this.state;

        if (goNext) {
            return <Redirect to='/preview'/>;
        }
        if (goBack) {
            return <Redirect to='/upload'/>;
        }

        const columns = store.getState().csv.namedColumns;
        const order = store.getState().csv.order;
        const remapped_order = this.state.remapped_order;
        const data = store.getState().csv.csv_data;

        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back</button>
                    <button className="btn btn-primary ml-2" onClick={this.onMappingAccept}>Next</button>
                </div>
                {error.toLocaleString()}
            </>
        );

        if (data.length === 0) {
            return (
                <>
                    <h1>Remapping</h1>
                    <p>No data.</p>
                    {nav}
                </>
            )
        }

        return (
            <>
                <h1>Remapping</h1>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Column</th>
                        <th>Remap from</th>
                    </tr>
                    </thead>
                    <tbody>
                    {columns.map((column, index) => (
                        <tr key={index}>
                            <td>
                                {column}
                            </td>
                            <td>
                                <select id={"select-" + index} value={remapped_order[index]}
                                        onChange={this.onMappingChange}>
                                    <option key={-1} value=""></option>
                                    {order.map((orderValue, index2) => (
                                        <option id={index + '.' + index2} key={index2}
                                                value={index2}>{columns[index2]} (Ex: {data[0][index2]})</option>
                                    ))}
                                </select>
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

export default CsvColumnMappingPage;
