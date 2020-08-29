import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addRemappedCsvData} from "../redux/actions";

class CsvColumnMappingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            remapped_order: store.getState().csv.order,
            goForward: false,
            goBack: false
        };

        this.onMappingChange = this.onMappingChange.bind(this);
        this.onMappingAccept = this.onMappingAccept.bind(this);
    }

    onMappingChange = async (event) => {
        const id = (event.target.id.split('-'))[1]; //event.target.selectedIndex;
        const value = event.target.value;
        console.log(id,'=',value);

        const remapped_order = this.state.remapped_order;
        remapped_order[id] = value;
        console.log(remapped_order);
        this.setState({remapped_order: remapped_order})
    };

    onMappingAccept = async event => {
        console.log('onMappingAccept', event);
        const header = store.getState().csv.header;
        const csv_data = store.getState().csv.csv_data;
        const remapped_order = this.state.remapped_order;

        console.log('remapped_order', remapped_order);
        console.log('csv_data', csv_data);
        const remappedData = this.remappedCsv(csv_data, remapped_order);
        console.log('remappedData**', remappedData);

        store.dispatch(addRemappedCsvData(remappedData));

        // Update the state
        this.setState({
            remapped: remappedData,
            goForward: true
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
        return newRows;
    };

    render() {
        const {error, goForward, goBack} = this.state;

        if (goForward) {
            return <Redirect to='/preview'/>;
        }
        if (goBack) {
            return <Redirect to='/upload'/>;
        }

        const columns = store.getState().csv.namedColumns;
        const order = store.getState().csv.order;
        const remapped_order = this.state.remapped_order;

        return (
            <>
                <div className="row">
                    <div className="col-6">

                        <h1>Remapping</h1>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>column</th>
                                <th>remap</th>
                            </tr>
                            </thead>
                            <tbody>
                            {columns.map((column, index) => (
                                <tr key={index}>
                                    <td>
                                        column:{column} index:{index} a:{columns[index]} b:{remapped_order[index]}
                                    </td>
                                    <td>
                                        <select id={"select-"+index} value={remapped_order[index]} onChange={this.onMappingChange}>
                                            <option key={-1} value=""> </option>
                                            {order.map((orderValue, index2) => (
                                            <option id={index + '.' + index2} key={index2} value={index2}>{columns[index2]}</option>
                                                ))}
                                        </select>
                                    </td>
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
                    <button onClick={this.onMappingAccept}>Next</button>
                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default CsvColumnMappingPage;
