import React from 'react';
import AuthAPI from '../services/authAPI';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from './Logo';

const Navbar = ({isAuthenticated, onLogout}) => {
    let navigate = useNavigate();
    const handleLogout = ()=>{
        AuthAPI.logout();
        onLogout(false);
        toast.info("Vous êtes déconnecté 😁")
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><Logo width="100" height="50"/></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        
                       { isAuthenticated && (<><li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li></>)}
                        
                        
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {(!isAuthenticated && (<>
                            <li className="nav-item">
                                <NavLink to="/register" className="btn btn-outline-primary">Inscription</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="btn btn-outline-success">Connexion</NavLink>
                            </li>
                        
                        </>)) || (
                            <>
                            <li className="nav-item">
                                <NavLink to="/profile" className="btn btn-outline-info">Profil</NavLink>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-outline-danger">Déconnexion</button>
                            </li>
                            
                            </>
                        )
                        }
                       
                        
                    </ul>
                </div>
            </div>
        </nav>
        
    );
};

export default Navbar;