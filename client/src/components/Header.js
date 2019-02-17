import React from 'react';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex">
        <div className="container">
            <a className="navbar-brand text-light font-weight-bold">Open-CRM</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegation" aria-controls="navegation" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navegation">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item active">
                        <a className="btn btn-success">New client</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;