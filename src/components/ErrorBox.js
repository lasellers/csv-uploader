import React from "react";
import './ErrorBox.css';

function ErrorBox({error}) {
    return (
        <>
            <p className={(error !== "") ? "alert-error" : ""}>{error.toLocaleString()}</p>
        </>
    )
}

export default ErrorBox;
