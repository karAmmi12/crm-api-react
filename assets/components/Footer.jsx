import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='container-fluid d-flex flex-row justify-content-between   bg-light'>
            <ul className='d-flex flex-row m-3'>
                <Link to="">CGV </Link>
                <Link to="">Mentions légales</Link>
            </ul>
            <ul className='d-flex flex-row m-3'>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>

            </ul>

        </div>
    );
};

export default Footer;