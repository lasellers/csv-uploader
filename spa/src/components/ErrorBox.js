import React, {useState} from 'react';
import store from "../redux/store";
import {clearError} from "../redux/actions";
import './ErrorBox.css';

function ErrorBox() {
    const [error, setError] = useState(null);

    store.subscribe(function () {
        const csv = store.getState().csv;
        setError(csv.error);
    });

    if (error === null)
        return (
            <>
                <p> </p>
            </>
        );

    if (typeof error === 'string') {
        return (
            <>
                <div className="col-md-12 text-center error">
                    <p>Error: {error.toLocaleString()}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        store.dispatch(clearError());
                    }}>Clear Error
                    </button>
                </div>
            </>
        );
    }

    // formrequest validation errors
    if (typeof error === "object") {

        let messages = [];
        for (const [key, value] of Object.entries(error)) {
            for (const [field, message] of Object.entries(value)) {
                messages.push({field, message});
            }
        }

        if (messages.length > 0) {
            return (
                <>
                    <div className="col-md-12 text-center error">
                        <h3>Validation Errors</h3>
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>Field</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {messages.map((message, index) => (
                                <tr key={index}>
                                    <td>{message.field}</td>
                                    <td>{message.message.join(', ')}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="col-md-12 text-center">
                            <button className="btn btn-primary btn-sm" onClick={() => {
                                store.dispatch(clearError());
                            }}>Clear Errors
                            </button>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (<>
            <div className="col-md-12 text-center error">
                <p>API Error: {error.toString()}</p>
                <button className="btn btn-primary btn-sm" onClick={() => {
                    store.dispatch(clearError());
                }}>Clear Error
                </button>
            </div>
        </>
    );

}

export default ErrorBox;
