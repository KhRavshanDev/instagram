import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const SignOut = () => {
    return (
        <FontAwesomeIcon icon={faSignOutAlt} style={{width: 19, height: 19}} />
    );
};

export default SignOut;
