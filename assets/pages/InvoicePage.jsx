import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import CustomersAPI from '../services/customersAPI';
import InvoiceDtAPI from '../services/invoiceDtAPI';
import InvoicesAPI from '../services/invoicesAPI';




const InvoicePage = () => {

    const [invoice, setInvoice] = useState({
        amount: 0,
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
    const idInv = id;

    const [detailsInvoice, setDetailsInvoice] = useState([]);

    const fetchFullInvoice = async id => {
        try {
            const data = await InvoicesAPI.find(id);
            setDetailsInvoice(data.invoiceDetails);
            
            
            

        } catch {
            
            
        }

    };
        
    useEffect(() => {
        fetchCustomers();
        
       
    
    }, []);

    useEffect(() => {
        if(id !== "new"){ 
            setEditing(true);
            fetchFullInvoice(id);
            fetchInvoice(id);
            
        }   

    }, [id])

    //gestion de la suppression d'un article
    const handleDelete = async id => {

        const originalDtInvoice = [...detailsInvoice];

        setDetailsInvoice(detailsInvoice.filter(item => item.id !== id));

        try {
            await InvoiceDtAPI.delete(id);
            toast.success("L'article a bien été supprimée! ")
        } catch (error) {
            console.log(error.response)
            toast.error("une erreur est survenue!")
            setDetailsInvoice(originalDtInvoices);
        }


    };
    

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

    console.log(invoice)
    


    return (
        <>
            {(!editing && <h1>Création d'une facture</h1> )|| (<h1>Modifier une facture</h1>)}
            <form onSubmit={handleSubmit}>
                
                <Field name="amount" type='number' disabled="disabled" label="Montant" placeholder="Montant de la facture" value={invoice.amount} onChange={handleChange} error={errors.amount}/>
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
                    <Link to="/invoices" className='btn btn-secondary' >Retour à la liste</Link>
                    {editing && <Link to="/invoicedt/new" state={ idInv} className='btn btn-primary'>Ajouter un article</Link>}
                  
                </div>  

            </form>
            
            {detailsInvoice.length >0 && <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Description</th>
                                <th>Prix U</th>
                                <th>quantité</th>
                                <th>Montant</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {detailsInvoice.map(item =>
                        
                        <tr key={item.id}>
                            <td>{item.key}</td>
                            <td>
                            {item.description} 
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <span>{item.quantity}</span>
                            </td>
                            <td>{item.itemAmount} €</td>
                            <td>
                                <Link to={`/invoicedt/${item.id}`} className="btn btn-sm btn-dark">Editer</Link>
                                <button
                                    onClick={() => handleDelete(item.id)}

                                    className="btn btn-sm btn-danger">
                                    Supprimer
                                </button>
                            </td>
                        </tr>)}
                        
                            

                        </tbody>

                            
                        </table>}


            
           
            

            
            
        </>
    );
};

export default InvoicePage;