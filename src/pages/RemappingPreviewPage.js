import React from 'react';
import {API_URL} from "../App";
import store from "../redux/store";
import {Redirect} from "react-router";

class RemappingPreviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            goForward: false,
            goBack: false
            //files: []
        };

    }

    /*componentDidMount() {
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
            return <Redirect to='/process'/>;
        }
        if (goBack) {
            return <Redirect to='/column-mapping'/>;
        }

        return (
            <>
                <div className="row">
                    <div className="col-6">

                        <h1>Preview</h1>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>File</th>
                                <th>x</th>
                            </tr>
                            </thead>
                            <tbody>
                            {files.map(file => (
                                <tr key={file.id}>
                                    <td>{file.id}</td>
                                    <td>{file}</td>
                                    <td>x</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-6">

                    </div>

                </div>

                <div>
                    <button onClick={() => this.setState({goForward: true} )}>Next</button>
                    <button onClick={() => this.setState({goBack: true} )} >Back</button>
                </div>

                {error.toLocaleString()}

            </>
        );
    }
}

export default RemappingPreviewPage;
