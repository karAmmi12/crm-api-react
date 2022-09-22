import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import CustomersAPI from '../services/customersAPI';



const CustomerPage = () => {
    
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName :"",
        email: "",
        company:""
    });
    const [errors, setErrors] = useState({
        lastName: "",
        firstName :"",
        email: "",
        company:"" 

    });
    const [editing, setEditing] = useState(false)
    const {id ="new"} = useParams();
    let navigate = useNavigate();

    //recuperation du customer grace à l'id
    const fetchCustomer = async id =>{ 
        try {       
            const {firstName, lastName, email, company } = await CustomersAPI.find(id);
            
            setCustomer({firstName, lastName, email, company})
    
        } catch (error) {
            
            toast.error("Le client n'a pas pu être chargé !")
            navigate('/customers')
        }
        
    }
    //chargement du customer si besoin au chargement du composant ou changement de l'id
    useEffect(() => {
        if(id !== "new"){ 
            setEditing(true);
            fetchCustomer(id);
        }
       

    }, [id])
    
    //gestion des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const {name, value } = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    //gestion de la soumission du form
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        try {
            if (editing) {
                
                await CustomersAPI.update(id, customer)
                toast.success("Le client à bien été modifié!")
                setErrors({});
            }else{
                await CustomersAPI.create(customer);
                toast.success("Le client à bien été enregistré!")
                setErrors({});
                navigate('/customers') 

            }
                
            
        } catch ({response}) {
            console.log(response.data.violations)
            const { violations } = response.data;
            if(violations) {
                const apiErrors ={};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire !")
            }
            
            
        }
    }
       
    return ( 
        <>
            {(!editing && <h1>Ajout d'un client</h1> )|| (<h1>Modifier un client</h1>)}
            <form onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom" placeholder="Nom du client" value={customer.lastName} onChange={handleChange} error={errors.lastName}/>
                <Field name="firstName" label="Prénom" placeholder="Prénom du client" value={customer.firstName} onChange={handleChange} error={errors.firstName}/>
                <Field name="email" label="Email" placeholder="Adresse email du client" type="email" value={customer.email} onChange={handleChange}error={errors.email}/>
                <Field name="company" label="Entreprise" placeholder="Entreprise du client"value={customer.company} onChange={handleChange} error={errors.company}/>

                 <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className='btn btn-link' >Retour à la liste</Link>
                    
                </div>  

            </form>
            
        </>
    );
};

export default CustomerPage;