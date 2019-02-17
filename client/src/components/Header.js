import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
        <div className="container">
        <Link to="/" className="navbar-brand text-light font-weight-bold">
            <a>Open-CRM</a>
        </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegation" aria-controls="navegation" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navegation">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item active">
                    <Link to="/client/new" className="btn btn-success">
                        <a>New client</a>
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;