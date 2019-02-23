import React, {Fragment} from 'react';
import { Link } from 'react-router-dom'
import Logout from './Logout'
import ButtonRegister from './ButtonRegiser'
import AuthNav from './AuthNav'
import NoAuthNav from './NoAuthNav'


const Header = ({session}) => {
    
    let NavBarRender =  session.getUser ? <AuthNav session={session} /> : <NoAuthNav />

    return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
        <div className="container">
        {NavBarRender}
        </div>
    </nav>

    )
};




export default Header;