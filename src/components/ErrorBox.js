import React from "react";
import './ErrorBox.css';

function ErrorBox({error}) {
    if (typeof error !== "object")
        return (<>
            <p></p>
        </>);

    return (
        <>
            <p className="alert-error">{error.toLocaleString()}</p>
        </>
    )
}

export default ErrorBox;
