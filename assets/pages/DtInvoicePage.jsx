import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import InvoiceDtAPI from '../services/invoiceDtAPI';





const dtInvoicePage = () => {
    
    //recupérer l'id de la facture
    const params = useLocation();
    
    const [dtInvoice, setDtInvoice] = useState({
        description: "",
        quantity:"",
        price: "",
        invoice:{
            id:"",
            amount: ""
        },
        itemAmount:0
       
       
    });
    const [errors, setErrors] = useState({
        description: "",
        quantity:"",
        price: "",
        invoice:{
            id:"",
            amount: ""
        },
        itemAmount:""

    });
    

    
    //récupérer l'id de l'article
    const {id} = useParams();
    const [idDt, setIdDt]= useState(id)

    const [editing, setEditing] = useState(false);
    let navigate = useNavigate();
    
    

    //récupérer l'article
    const fetchDtInvoice = async idDt => {
        try {
            
            
            
            const {description,quantity,price,itemAmount,invoice:{id ,amount}} = await InvoiceDtAPI.find(idDt);
                
            
                setDtInvoice({description,quantity,price,itemAmount,invoice: {id,amount}})
            
            
            
            
        } catch (error) {
            console.log(error.response)
            toast.error("Impossible de charger l'article'demandée !")
            navigate('/invoices')
        }

    }

   

    useEffect(() => {
        if(idDt !== "new"){ 
            setEditing(true);
            
            fetchDtInvoice(idDt);
            
        } 
        else{
            setDtInvoice({...dtInvoice, invoice:{id:params.state}})
                
        }  

    }, [idDt])

     //gestion des inputs dans le formulaire
     const handleChange = ({ currentTarget }) => {
        const {name, value } = currentTarget;
        
        
        setDtInvoice({...dtInvoice, [name]: value});
        console.log(dtInvoice)
    }

    //Gestion de la soumission du form
    const handleSubmit = async e => {
        e.preventDefault();
        try {
             
            if (editing) {
                console.log(dtInvoice)
                
                await InvoiceDtAPI.update(id, dtInvoice)
                toast.success("L'article a bien été modifié.")
                setErrors({});

                history.go(-1);

                
                
                

            } else {

               
                await InvoiceDtAPI.create(dtInvoice)
                toast.success("L'article' a bien été enregistré.")
                setErrors({});
                history.go(-1);
                    

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
    console.log(dtInvoice)
    

    


    return (
        <>
            {(!editing && <h1>Création d'un article</h1> )|| (<h1>Modifier un article</h1>)}
            <form onSubmit={handleSubmit}>
                
                <Field name="description" label="description" placeholder="description de l'article" value={dtInvoice.description} onChange={handleChange} error={errors.description}/>
                <Field name="quantity" label="quantity" type="number" placeholder="nombre d'articles" value={dtInvoice.quantity} onChange={handleChange} error={errors.quantity}/>
                <Field name="price" label="price" type="number" placeholder="prix de l'article" value={dtInvoice.price} onChange={handleChange} error={errors.price}/>


                
                
                
                

                 <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className='btn btn-link' >Retour à la liste</Link>
                  
                </div>  

            </form>
           
            
           
            

            
            
        </>
    );
};

export default dtInvoicePage;