import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addRemappedCsvData, addUnmappedData} from "../redux/actions";

class CsvColumnMappingPage extends React.Component {
    constructor(props) {
        console.log('constructor ***********');
        super(props);

        // Normally the default order is 0,1,2,3,4,5,6,7 and the like as far the the dropdown goes.
        const order = [...(store.getState().csv.columns).keys()];

        const columns = store.getState().csv.columns;
        const csv_headers = store.getState().csv.csv_headers;
        const remapped_order = this.defaultRemappedOrder(columns, csv_headers, order);

        this.state = {
            error: "",
            remapped_order: remapped_order, //order,
            goNext: false,
            goBack: false,
            dropdownOrder: order
        };

        this.onMappingChange = this.onMappingChange.bind(this);
        this.onMappingAccept = this.onMappingAccept.bind(this);
    }

    onMappingChange = async (event) => {
        console.log('');
        console.log('onMappingChange begin');
        const id = (event.target.id.split('-'))[1]; //event.target.selectedIndex;
        const value = event.target.value;

        const remapped_order = this.state.remapped_order;
        remapped_order[id] = value;
        console.log('onMappingChange',this.state.remapped_order);
        console.log('onMappingChange end');
        console.log('');
        await this.setState({remapped_order: remapped_order});
    };

    onMappingAccept = async event => {
        console.log('onMappingAccept');
        const csv_headers = store.getState().csv.csv_headers;
        const csv_data = store.getState().csv.csv_data;
        const remapped_order = this.state.remapped_order;
        const db_headers = store.getState().csv.columns;

        const [remappedData, unmappedData] = this.remapCsvToContactsAndCustomAttributes(csv_data, remapped_order, csv_headers, db_headers);

        store.dispatch(addRemappedCsvData(remappedData));
        store.dispatch(addUnmappedData(unmappedData));

        // Update the state
        this.setState({
            remapped: remappedData,
            goNext: true
        });
    };

    /**
     *
     * @param contacts
     * @param remapped_order
     * @param csv_headers
     * @returns {[[], []]}
     */
    remapCsvToContactsAndCustomAttributes = (contacts, remapped_order, csv_headers, db_headers) => {
        let newContacts = [];
        let newCustomAttributes = [];

        console.log(remapped_order);

        contacts.forEach(function (contact, contact_id) {
            let newContact = new Array(db_headers.length).fill("");

            remapped_order.forEach(function (order, index) {
                if (remapped_order[index] >=0) {
                    newContact[index] = contact[remapped_order[index]];
                }
            });

            csv_headers.forEach(function (value, index) {
                if (!remapped_order.includes(index)) {
                    newCustomAttributes.push([contact_id, csv_headers[index], value]);
                }
            });

            newContacts.push(newContact);
        });
        console.log(newContacts);
        console.log(newCustomAttributes);
        return [newContacts, newCustomAttributes];
    };

    /**
     * This tried to guess the remap order by comparing the csv header columns against the db standard order.
     * i.e., if they are the same order then mapping stays: 0,1,2,3,4,5,6.
     * If the headers are reversed then this comes out: 6,5,4,3,2,1,0
     */
    defaultRemappedOrder = (columns, csv_headers, order) => {
        let remapped_order = new Array(columns.length).fill(-1);
        console.log('defaultRemappedOrder: csv_headers', csv_headers);
        console.log('defaultRemappedOrder: columns', columns);
        console.log('defaultRemappedOrder: remapped_order ', remapped_order);

        columns.forEach((header, index) => {
            console.info('index=', index, 'header', header);
            const index2 = csv_headers.indexOf(header);
            if (index2 >= 0) {
                console.info(' ***** index=', index, 'index2=', index2, columns[index], columns[index2]);
                remapped_order[index] = index2;
            }
        });
        console.log('defaultRemappedOrder: end remapped_order', remapped_order);
        return remapped_order;
    };

    render() {
        const {error, goNext, goBack} = this.state;

        if (goNext) {
            return <Redirect to='/preview'/>;
        }
        if (goBack) {
            return <Redirect to='/upload'/>;
        }


        const namedColumns = store.getState().csv.namedColumns;
        const csv_headers = store.getState().csv.csv_headers;
        const csv_data = store.getState().csv.csv_data;
        const headersCsv = store.getState().csv.csv_headers.join(', ');

        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back
                    </button>
                    <button className="btn btn-primary ml-2" onClick={this.onMappingAccept}>Next</button>
                </div>
                {error.toLocaleString()}
            </>
        );

        if (csv_data.length === 0) {
            return (
                <>
                    <h1>Remapping</h1>
                    <p>No data.</p>
                    {nav}
                </>
            )
        }

        console.log('* namedColumns',namedColumns);
        console.log('* this.state.dropdownOrder',this.state.dropdownOrder);
        console.log('* this.state.remapped_order',this.state.remapped_order);
        return (
            <>
                <h1>Remapping</h1>

                <p><b>CSV File Details</b></p>
                <hr/>
                <p>Headers: {headersCsv}</p>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Column</th>
                        <th>Remap from</th>
                    </tr>
                    </thead>
                    <tbody>
                    {namedColumns.map((column, index) => (
                        <tr key={index}>
                            <td>
                                {column}
                            </td>
                            <td>
                                <select id={"select-" + index} value={this.state.remapped_order[index]}
                                        onChange={this.onMappingChange}>
                                    <option key={-1} value=""> (None)</option>
                                    {csv_headers.map((csv_header, index2) => (
                                        <option id={index + '.' + index2} key={index2}
                                                value={index2}>{csv_header} (Ex: {csv_data[0][index2]})</option>
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
