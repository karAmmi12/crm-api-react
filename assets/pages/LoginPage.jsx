import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../components/forms/Field';
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
                <Field
                    label ="Email" 
                    name ="username"
                    value = {credentials.username}
                    onChange={handleChange}
                    placeholder="Adresse email de connexion"
                    error = {error}

                />
                <Field
                    label ="Mot de passe" 
                    name ="password"
                    value = {credentials.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    type="password"
                    error = ""

                />
                
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Me connecter</button>
                </div>
            </form>
            
        </>
    );
};

export default LoginPage;