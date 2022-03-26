import React, {useState, useEffect, useContext} from "react";
import {Route, useHistory} from "react-router-dom";
import {UserContext} from "./App";


const withAuth = WrappedComponent => props => {
    const user = useContext(UserContext);
    const hisory = useHistory();

    if (!user?.email) {
        hisory.push("/")
    }

    return (
        <WrappedComponent {...props} />
    )
}

export default withAuth(Route);