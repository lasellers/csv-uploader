import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addCsvHeaders} from "../redux/actions";
import {addCsvData} from "../redux/actions";

class CsvUploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            header: null,
            data: null,
            goNext: false
        };

        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    // Input type="file" onChange, returns FileList on event target
    // with .files with File object
    // @see https://developer.mozilla.org/en-US/docs/Web/API/FileList
    // @see https://developer.mozilla.org/en-US/docs/Web/API/File
    onFileChange = async event => {
        event.preventDefault();

        const files = event.target.files;
        if (files.length > 0) {
            const csv = (await files[0].text());
            const [header, data] = this.csvToArray(csv);

            store.dispatch(addCsvHeaders(header));
            store.dispatch(addCsvData(data));

            // Update the state
            this.setState({
                selectedFile: files[0],
                header: header,
                data: data
            });
        }
    };

    csvToArray = (csv) => {
        const rows = csv.trim().split("\n");
        const header = rows.shift().trim().split(",");
        let newRows = [];
        rows.forEach(row => {
            const line = row.trim();
            if (line.length > 0) newRows.push(line.split(","));
        });
        return [
            header,
            newRows
        ];
    };

    // On file upload (click the upload button)
    onFileUpload = async (event) => {
        this.setState({goNext: true});
    };

    // File content to be displayed after
    // file upload is complete
    uploadedFileData = () => {
        if (this.state.selectedFile) {
            const headers = store.getState().csv.csv_headers.join(', ');
            return (
                <>
                    <p><b>CSV File Details</b></p>
                    <hr/>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
                    <p>Rows: {this.state.data.length}</p>
                    <p>Headers: {headers}</p>
                </>
            );
        } else {
            return (
                <>
                    <br/>
                    <h4>Choose File from local system before pressing the Upload button.</h4>
                </>
            );
        }
    };

    render() {
        const {goNext} = this.state;

        if (goNext) {
            return <Redirect to='/mapping'/>;
        }

        return (
            <>
                <h1>CSV File Upload</h1>

                <div>
                    <input className="btn btn-secondary mr-2" type="file" onChange={this.onFileChange}/>
                    <button className="btn btn-primary ml-2" onClick={this.onFileUpload}>
                        Upload
                    </button>
                </div>

                {this.uploadedFileData()}
            </>
        );
    }
}

export default CsvUploadPage;
