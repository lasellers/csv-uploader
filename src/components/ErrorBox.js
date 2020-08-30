import React from "react";
import './ErrorBox.css';

function ErrorBox(props) {
    return (
        <>
            <p className={props.error.length > 0 ? "alert-error" : ""}>{props.error.toLocaleString()}</p>
        </>
    )
}

export default ErrorBox;
