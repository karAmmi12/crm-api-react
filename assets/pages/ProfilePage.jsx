import React, { useEffect, useState } from 'react';
import UsersAPI from '../services/usersAPI';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

const ProfilePage = () => {

    

    
    const jwtData = jwtDecode(window.localStorage.getItem("authToken"));
    const id = jwtData.userId;
    const [user, setUser]= useState({
        firstName: "",
        lastName: "",
        email: "",
        company:"",
        adresse:"",
        phone:""
    });
    console.log(id)
    
    

    const fetchUser = async id => {
        try {
            
            const {firstName, lastName, email, company, adresse, phone} = await UsersAPI.find(id);
            console.log(company)
                setUser({firstName,
                     lastName, 
                     email, 
                     company: company?company:"",
                     adresse: adresse?adresse:"",
                     phone: phone?phone:""
                })
                
            
        } catch (error) {
            console.log(error.response)
            
        }

    }
    
    useEffect(() => {
        fetchUser(id)
    }, [])
    
    console.log(user)

    return (
        
            <div className="card mb-3">
                <h3 className="card-header">{user.firstName} {user.lastName}</h3>
                <div className="card-body">
                    <h5 className="card-title">Entrprise : {user.company}</h5>
                    <h6 className="card-subtitle text-muted">Adresse: {user.adresse}</h6>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="200" height="200" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" >
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Logo</text>
                </svg>
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">Téléphone: {user.phone}</li>
                   
                </ul>
                <div className="card-body">
                    <Link to={"/profile/edit"} className="btn btn-primary">Completer mon profil</Link>
                    <a href="#" className="card-link">Another link</a>
                </div>
                
            </div>
            


        
    );
};

export default ProfilePage;