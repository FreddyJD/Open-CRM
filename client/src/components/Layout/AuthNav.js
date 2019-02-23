import React, {Fragment} from 'react';
import { Link } from 'react-router-dom'
import Logout from './Logout'
import ButtonRegister from './ButtonRegiser'

const AuthNav = ({session}) => {
    return (
        <Fragment>
        <Link to="/" className="navbar-brand text-light font-weight-bold">
            <a>Open-CRM</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegation" aria-controls="navegation" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navegation">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                    <button className="dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown">
                        Clients
                </button>
                    <div className="dropdown-menu" aria-labelledby="navegtion">
                        <Link to="/clients" className="dropdown-item">
                            View Clients
                    </Link>
                        <Link to="/client/new" className="dropdown-item">
                            New Client
                    </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className="dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown">
                        Products
                </button>
                    <div className="dropdown-menu" aria-labelledby="navegtion">
                        <Link to="/products" className="dropdown-item">
                            Products
                    </Link>
                        <Link to="/product/new" className="dropdown-item">
                            New Product
                    </Link>
                    </div>
                    
                </li>

                <ButtonRegister session={session} />
                <Logout/>
            </ul>
        </div>
    </Fragment>
    );
};

export default AuthNav;