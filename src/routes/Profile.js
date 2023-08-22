import React from "react";
import { authService } from "../fBase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default () => {
    const history = useHistory();
    const OnLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={OnLogOutClick}>Log Out</button>
        </>
    );
};