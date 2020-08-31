import React from "react";
import store from "../redux/store";
import {addError} from "../redux/actions";
import './ErrorBox.css';

function ErrorBox() {
    let error = store.getState().csv.error;
    console.log(error);

    if (typeof error !== "object")
        return (<>
        </>);

    return (
        <>
            <p className="alert-error">{error.toLocaleString()}</p>
            <button className="btn btn-primary btn-sm" onClick={() => {
                error = "";
                store.dispatch(addError(""));
            }}>Clear Error
            </button>
        </>
    )
}

export default ErrorBox;
