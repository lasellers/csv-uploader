import React from 'react';
import {API_URL} from "../App";
//import AddMessage from "./AddMessage";
import store from "../redux/store";
import {Redirect} from "react-router";
import {addCsvData, addCsvHeader, addRemappedCsvHeader} from "../redux/actions";
import {addRemappedCsvData} from "../redux/actions";

class CsvColumnMappingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            remapped: [0,1,2,3,4,5,6],
            goForward: false,
            goBack: false
            // files: []
        };


        store.subscribe(function () {
            const csv = store.getState().csv;
            //   setEmail(user.email);
            //  setIsLoggedIn(user.isLoggedIn);
        });


    }

    onMappingChange = async event => {
        event.preventDefault();

        const files = event.target.files;
        console.log('onFileChange', event);
        console.log('files', files);
        if (files.length > 0) {
            //console.log('length', event.target.length);
            //console.log('item(0)', event.target.item(0));
            /* for(let index=0;index++;index<=event.target.files.length) {
                 console.log('file**'+index, event.target.item(index));
                 console.log('text**'+index, event.target.item(index).text());
             }*/
//            const csv = (await files[0].text());
            const [header, data] = this.csvToArray(csv);

            console.log('remapped**', data);
            const remappedData = this.remappedCsv(
                data,
                this.state.remapped
            );
            console.log('remapped**', remapped);

         //   store.dispatch(addCsvHeader(header));
            store.dispatch(addRemappedCsvData(remappedData));

            // Update the state
            this.setState({
                remapped: remapped
            });
        }
    };


    remappedCsv = (rows, remappedColumns) => {

    };

    /* componentDidMount() {
         fetch(API_URL + "/csv/files")
             .then(res => res.json())
             .then(
                 (result) => {
                     this.setState({
                         isLoaded: true,
                         files: result
                     });
                 },
                 (error) => {
                     this.setState({
                         isLoaded: true,
                         error
                     });
                 }
             )
     }*/

    render() {
        const {error, goForward, goBack} = this.state;

        if (goForward) {
            return <Redirect to='/preview'/>;
        }
        if (goBack) {
            return <Redirect to='/upload'/>;
        }


        let columns = ['id', 'team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'];


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
                                    <td>{column}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-6">

                    </div>

                </div>

                <div>
                    <button onClick={() => this.setState({goForward: true})}>Next</button>
                    <button onClick={() => this.setState({goBack: true})}>Back</button>
                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default CsvColumnMappingPage;
