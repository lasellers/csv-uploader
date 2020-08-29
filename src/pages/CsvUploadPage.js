import React from 'react';
import store from "../redux/store";
import {Redirect} from "react-router";
import {addCsvHeader} from "../redux/actions";
import {addCsvData} from "../redux/actions";

class CsvUploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            selectedFile: null,
            header:null,
            data: null,
            goForward: false
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

            store.dispatch(addCsvHeader(header));
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
            newRows.push(row.trim().split(","));
        });
        return [
            header,
            newRows
        ];
        /*return {
            header: header,
            rows: newRows
        };*/
    };

    // On file upload (click the upload button)
    onFileUpload = async (event) => {
      //  event.preventDefault();

        // Create an object of formData
     /*   const formData = new FormData();

        // Update the formData object
        formData.append(
            "file.csv",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        const requestOptions = {
            method: 'POST',
            redirect: 'none',
            body: formData
        };*/

        this.setState({goForward: true});
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>CSV File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>Rows: {this.state.data.length}</p>
                    <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose File from local system before pressing the Upload button.</h4>
                </div>
            );
        }
    };

    render() {
        const {error, goForward} = this.state;

        if (goForward) {
            return <Redirect to='/mapping'/>;
        }

        return (
            <>
                <h1>
                </h1>
                <h3>
                    CSV File Upload.
                </h3>
                <div>
                    <input className="btn btn-secondary mr-2" type="file" onChange={this.onFileChange}/>
                    <button className="btn btn-primary ml-2" onClick={this.onFileUpload}>
                        Upload
                    </button>
                </div>
                {this.fileData()}

                {error.toLocaleString()}
            </>
        );
    }
}

export default CsvUploadPage;
