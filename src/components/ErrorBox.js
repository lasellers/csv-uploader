import React from "react";
import './ErrorBox.css';

function ErrorBox({error}) {
    console.log(error);
    console.log(error.error);
    console.log(error.hasOwnProperty('error'));
    return (
        <>
            <p className={(error !== "") ? "alert-error" : ""}>{error.toLocaleString()}</p>
        </>
    )
}

export default ErrorBox;
