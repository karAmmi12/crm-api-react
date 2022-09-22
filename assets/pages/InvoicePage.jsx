import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import CustomersAPI from '../services/customersAPI';
import InvoicesAPI from '../services/invoicesAPI';


const InvoicePage = () => {

    const [invoice, setInvoice] = useState({
        amount: "",
        customer :"",
        status: "SENT",
       
    });
    const [errors, setErrors] = useState({
        amount: "",
        customer :"",
        status: "",

    });
    const [customers, setCustomers] = useState([]);
    
    const {id} = useParams();
    const [editing, setEditing] = useState(false);
    let navigate = useNavigate();
    
    console.log(id, editing)
    
    const fetchCustomers = async () =>{ 
        try {       
            const data =  await CustomersAPI.findAll();
            setCustomers(data);
            if (!invoice.customer) {
                setInvoice({...invoice, customer: data[0].id})
                
            }
            
        } catch (error) {
            console.log(error.response)
            toast.error("Impossible de charger les clients !")
            navigate('/invoices')
            

           
        }
    }

    const fetchInvoice = async id => {
        try {
            
            const {amount, status, customer} = await InvoicesAPI.find(id);
            
                setInvoice({amount, status, customer :customer.id})
            
        } catch (error) {
            console.log(error.response)
            toast.error('Impossible de charger la facture demandée !')
            navigate('/invoices')
        }

    }
        
    useEffect(() => {
        fetchCustomers();
    
    }, []);

    useEffect(() => {
        if(id !== "new"){ 
            
            fetchInvoice(id);
            setEditing(true);
        }   

    }, [id])
    

     //gestion des inputs dans le form
     const handleChange = ({ currentTarget }) => {
        const {name, value } = currentTarget;
        setInvoice({...invoice, [name]: value});
    }

    //Gestion de la soumission du form
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            
           
            if (editing) {
                console.log(invoice)
                await InvoicesAPI.update(id, invoice)
                toast.success("La facture a bien été modifié.")
                setErrors({});
                
                

            } else {
                await InvoicesAPI.create(invoice)
                toast.success("La facture a bien été enregistré.")
                setErrors({});
                navigate('/invoices')
                    

            }
            
            
        } catch (error) {
            console.log(error)
            if(error.response.data.violations) {
                const apiErrors ={};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire!")
            }
        }
    }


    return (
        <>
            {(!editing && <h1>Création d'une facture</h1> )|| (<h1>Modifier une facture</h1>)}
            <form onSubmit={handleSubmit}>
                <Field name="amount" type='number' label="Montant" placeholder="Montant de la facture" value={invoice.amount} onChange={handleChange} error={errors.amount}/>
                <Select 
                    name="customer"
                    label ="Client"
                    onChange={handleChange}
                    value ={invoice.customer}
                    error={errors.customer} 
                 >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}

                </Select>
                <Select 
                    name="status"
                    label ="Statut"
                    onChange={handleChange}
                    value ={invoice.status}
                    error={errors.status} 
                 >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>

                </Select>
                

                 <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className='btn btn-link' >Retour à la liste</Link>
                  
                </div>  

            </form>
            
        </>
    );
};

export default InvoicePage;