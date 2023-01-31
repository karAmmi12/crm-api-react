import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';



const HomePage = ({isAuthenticated}) => {
    const [user, setUser] = useState({
        firstName:"",
        lastName:""
    }) 
    const setUserAuth=()=>{
        if (isAuthenticated) {
            const jwtData = jwtDecode(window.localStorage.getItem("authToken"));
            const firstName = jwtData.firstName;
            const lastName = jwtData.lastName;
            setUser({firstName, lastName});
    
        }else{
            setUser({});
        }

    }
    useEffect(() => {
        setUserAuth();
    
      
    }, [])
    
    
    
    



    return (
        <div className=" d-flex flex-column">
            {(!isAuthenticated && <h2 className="text-center m-5">"Gérez vos clients et vos factures en toute simplicité - Gratuitement!"</h2>)||
            (<h2 className="text-center m-5">Bienvenue {user.firstName} {user.lastName}</h2>)

            
            }
            <div className="container d-flex flex-column flex-md-row align-items-center">
                <Logo width="70%" height="50%" />
                <ul className="list-group m-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Gérez vos clients et vos factures facilement!!
                   
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Générez vos factures en un clic!
                   
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Morbi leo risus
                   
                </li>
                { !isAuthenticated && (<Link to={'/register'} className="btn btn-outline-primary">Créez votre compte gratuitement</Link>)}
            </ul>
            </div>
                {isAuthenticated && <>
                    <Link to={'/invoices'} className="btn btn-outline-primary">Gérez Vos factures</Link>
                    <Link to={'/customers'} className="btn btn-outline-primary">Gérez Vos Clients</Link>
                </> }

            

        </div>
    );
};

export default HomePage;