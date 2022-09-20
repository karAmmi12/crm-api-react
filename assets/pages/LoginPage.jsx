import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../services/authAPI';

const LoginPage = ({onLogin}) => {

    

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    let navigate = useNavigate();

    

    //gestion des champs 
    const handleChange = (e)=>{
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setCredentials({...credentials, [name]: value });

    };
    //gestion du submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            onLogin(true);
            navigate("/customers")
           
        } catch (error) {
            console.log(error.response)
            setError("Aucun compte ne possède cette adresse ou les informations ne correspondent pas !")
            
        }

    }



    return (
        <>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input 
                        value={credentials.username}
                        onChange={handleChange}
                        type="email" 
                        id="password" 
                        name="username" 
                        placeholder="Adresse email de connexion" 
                        className={"form-control" + (error && " is-invalid")} 
                    />
                    {error && <p className="invalid-feedback">{error} </p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        value={credentials.password}
                        onChange={handleChange}
                        type="password" 
                        id="password" 
                        placeholder="Mot de passe" 
                        name="password" 
                        className="form-control" 
                    />
                    
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Me connecter</button>
                </div>
            </form>
            
        </>
    );
};

export default LoginPage;