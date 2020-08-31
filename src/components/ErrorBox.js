import React, { useState } from 'react';import store from "../redux/store";
import {addError} from "../redux/actions";
import './ErrorBox.css';

function ErrorBox() {
    const [ error, setError ] = useState(null);

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
