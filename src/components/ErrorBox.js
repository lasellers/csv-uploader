import React, {useState} from 'react';
import store from "../redux/store";
import {addError} from "../redux/actions";
import './ErrorBox.css';

function ErrorBox() {
    const [error, setError] = useState(null);

    store.subscribe(function () {
        const csv = store.getState().csv;
        setError(csv.error);
    });

    if (error === null)
        return (<>
        </>);

    if (typeof error === 'string') {
        return (
            <>
                <p className="alert-error">{error.toLocaleString()}</p>
                <button className="btn btn-primary btn-sm" onClick={() => {
                    store.dispatch(addError(null));
                }}>Clear Error
                </button>
            </>
        );
    }

    if (typeof error === "object") {
        let messages = [];
        for (const [key, value] of Object.entries(error)) {
            for (const [key2, value2] of Object.entries(value)) {
                messages.push({field: key2, message: value2});
            }
        }

        return (
            <>
                {messages.map((message, index) => (
                    <p key={index} className="alert-error errors"><b>{message.field}</b> : {message.message}</p>
                ))};
                <button className="btn btn-primary btn-sm" onClick={() => {
                    store.dispatch(addError(null));
                }}>Clear Error
                </button>
            </>
        );
    }

    return (<>
        <>
            <p className="alert-error">Unknown Error</p>
            <button className="btn btn-primary btn-sm" onClick={() => {
                store.dispatch(addError(null));
            }}>Clear Error
            </button>
        </>
    </>);

}

export default ErrorBox;
