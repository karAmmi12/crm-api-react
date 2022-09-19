import React from 'react';

const Navbar = () => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">CRM</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        
                        <li className="nav-item">
                            <a className="nav-link" href="#">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                        
                        
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                            <a href="" className="nav-link">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="btn btn-success">Connexion</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="btn btn-danger">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;