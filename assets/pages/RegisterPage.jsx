import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import UsersAPI from '../services/usersAPI';

const RegisterPage = () => {

    let navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email : "",
        password: "",
        passwordConfirm: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email : "",
        password: "",
        passwordConfirm: ""
    });


    //gestion des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const {name, value } = currentTarget;
        setUser({...user, [name]: value});
    }

    //gestion de la soumission du form
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "votre mot de passe ne correspond pas au précedent! ";
            setErrors(apiErrors)
            toast.error("Des erreurs dans votre formulaire!")
            return;

            
        }
       try {
            await UsersAPI.register(user)
            
            setErrors({})
            toast.success("Vous êtes désormais inscrit! vous pouvez vous connecter 👌")
            navigate('/login');
        

         
       } catch (error) {
            console.log(error.response)
            const {violations} = error.response.data;

            if (violations) {
                
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);

                toast.error("Des erreurs dans votre formulaire!")

                
            }
       }

    }



    return (
        <>
        <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    label ="Nom" 
                    name ="lastName"
                    value = {user.lastName}
                    onChange={handleChange}
                    placeholder="Votre Nom"
                    error = {errors.lastName}

                />
                <Field
                    label ="Prénom" 
                    name ="firstName"
                    value = {user.firstName}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    error = {errors.lastName}

                />
                <Field
                    label ="Email" 
                    name ="email"
                    value = {user.email}
                    onChange={handleChange}
                    placeholder="votre adresse email"
                    error = {errors.email}
                    type="email"

                />
                <Field
                    label ="Mot de passe" 
                    name ="password"
                    value = {user.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    error = {errors.password}
                    type="password"

                />
                <Field
                    label ="Confirmer le mot de passe" 
                    name ="passwordConfirm"
                    value = {user.passwordConfirm}
                    onChange={handleChange}
                    placeholder="Confirmez votre mot de passe"
                    error = {errors.passwordConfirm}
                    type="password"

                />
                
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmer</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
            
        </>
    );
};

export default RegisterPage;