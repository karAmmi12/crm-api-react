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
        phone:"",
        logo: ""
    });
    console.log(id)
    
    

    const fetchUser = async id => {
        try {
            
            const {firstName, lastName, email, company, adresse, phone, logo} = await UsersAPI.find(id);
            console.log(company)
                setUser({firstName,
                     lastName, 
                     email, 
                     company: company?company:"",
                     adresse: adresse?adresse:"",
                     phone: phone?phone:"",
                     logo: logo?logo:""
                })
                
            
        } catch (error) {
            console.log(error.response)
            
        }

    }
    
    useEffect(() => {
        fetchUser(id)
    }, [])
    
    console.log(user)

    // mise en forme de la page

    return (
        
            <div className="card mb-3">
                <h3 className="card-header">{user.firstName} {user.lastName}</h3>
                <div className="card-body">
                    <h5 className="card-title">Entrprise : {user.company}</h5>
                    <h5 className="card-subtitle text-muted">Siret N°: {user.siret}</h5>
                    <h6 className="card-subtitle text-muted">Adresse: {user.adresse}</h6>
                </div>
                <img width="25%" src={"./media/"+user.logo} alt="logo" />
                
                
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">Téléphone: {user.phone}</li>
                   
                </ul>
                <div className="card-body">
                    <Link to={"/profile/edit"} className="btn btn-primary">Completer mon profil</Link>
                    
                </div>
                
            </div>
            


        
    );
};

export default ProfilePage;