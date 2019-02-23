import React from 'react';
import {Link} from 'react-router-dom';

const ButtonRegiser = ({session}) => {

    console.log(session.getUser.rol)
    if(session.getUser.rol !== "ADMIN"){
        return null
    }
    return (
        <Link to="/register" className="btn btn-light" >
            Create User
        </Link>
    );
};

export default ButtonRegiser;