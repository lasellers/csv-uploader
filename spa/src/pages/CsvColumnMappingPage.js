import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addRemappedColumnOrder, addRemappedCsvData, addUnmappedData, clearError} from "../redux/actions";

class CsvColumnMappingPage extends React.Component {
    constructor(props) {
        super(props);

        const db_headers = store.getState().csv.db_headers;
        const csv_headers = store.getState().csv.csv_headers;

        // Normally the default order is 0,1,2,3,4,5,6,7 and the like as far the the dropdown goes.
        const order = [...(db_headers).keys()];
        const remapped_column_order = this.defaultRemappedOrder(db_headers, csv_headers);

        this.state = {
            goNext: false,
            goBack: false,
            remapped_column_order: remapped_column_order,
            dropdownOrder: order
        };

        this.onMappingChange = this.onMappingChange.bind(this);
        this.onMappingAccept = this.onMappingAccept.bind(this);
    }

    onMappingChange = async (event) => {
        const id = (event.target.id.split('-'))[1]; //event.target.selectedIndex;
        const value = event.target.value;

        const remapped_column_order = this.state.remapped_column_order;
        remapped_column_order[id] = value;
        await this.setState({remapped_column_order: remapped_column_order});
    };

    onMappingAccept = async event => {
        const csv_headers = store.getState().csv.csv_headers;
        const csv_data = store.getState().csv.csv_data;
        const db_headers = store.getState().csv.db_headers;

        const remapped_column_order = this.state.remapped_column_order;

        const [remappedData, unmappedData] = this.remapCsvToContactsAndCustomAttributes(
            csv_data, remapped_column_order, csv_headers, db_headers
        );

        store.dispatch(addRemappedCsvData(remappedData));
        store.dispatch(addUnmappedData(unmappedData));

        store.dispatch(addRemappedColumnOrder(remapped_column_order));

        // Update the state
        this.setState({
            goNext: true
        });
    };

    /**
     *
     * @param contacts
     * @param remapped_column_order
     * @param csv_headers
     * @param db_headers
     * @returns {[[], []]}
     */
    remapCsvToContactsAndCustomAttributes = (contacts, remapped_column_order, csv_headers, db_headers) => {
        let newContacts = [];
        let newCustomAttributes = [];

        contacts.forEach(function (contact, contact_id) {
            let newContact = new Array(db_headers.length).fill("");

            // create new contacts based on remapped columns list
            remapped_column_order.forEach(function (order, index) {
                if (remapped_column_order[index] >= 0) {
                    newContact[index] = contact[remapped_column_order[index]];
                }
            });

            // create new custom attributes from the columns that dont exist in remapped data
            csv_headers.forEach(function (key, index) {
                if (!db_headers.includes(key)) {
                    // contact_id, key, value
                    const value = contact[index]
                    const customAttribute = [contact_id, key, value]
                    newCustomAttributes.push(customAttribute)
                }
            })

            newContacts.push(newContact);
        });
        return [newContacts, newCustomAttributes];
    };

    /**
     * This tried to guess the remap order by comparing the csv header columns against the db standard order.
     * i.e., if they are the same order then mapping stays: 0,1,2,3,4,5,6.
     * If the headers are reversed then this comes out: 6,5,4,3,2,1,0
     */
    defaultRemappedOrder = (db_headers, csv_headers) => {
        let remapped_column_order = new Array(db_headers.length).fill(-1);

        db_headers.forEach((header, index) => {
            const headerIndex = csv_headers.indexOf(header);
            if (headerIndex >= 0) {
                remapped_column_order[index] = headerIndex;
            }
        });
        return remapped_column_order;
    };

    render() {
        const {goNext, goBack} = this.state;

        if (goNext) {
            return <Redirect to='/preview'/>;
        }
        if (goBack) {
            return <Redirect to='/upload'/>;
        }

        const db_named_headers = store.getState().csv.db_named_headers;
        const csv_headers = store.getState().csv.csv_headers;
        const csv_data = store.getState().csv.csv_data;
        const headersCsv = store.getState().csv.csv_headers.join(', ');

        const title = (
            <h1>Remapping</h1>
        )
        const nav = (
            <>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={() => this.setState({goBack: true})}>Back
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => {
                        store.dispatch(clearError());
                        this.onMappingAccept();
                    }}>Next
                    </button>
                </div>
            </>
        );

        if (csv_data.length === 0) {
            return (
                <>
                    {title}

                    <p>No data.</p>

                    {nav}
                </>
            )
        }

        return (
            <>
                {title}

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
                    {db_named_headers.map((column, index) => (
                        <tr key={index}>
                            <td>{column}</td>
                            <td>
                                <select id={"select-" + index} value={this.state.remapped_column_order[index]}
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
