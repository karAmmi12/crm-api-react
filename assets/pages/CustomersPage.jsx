import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';
import CustomersAPI from '../services/customersAPI';

const CustomersPage = props => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    //function qui recupère les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data)
            setLoading(false)
            
        } catch (error) {
            console.log(error.response)
            toast.error("Impossible de charger les clients!")
        }
    }

    //chercher les customers au chargement du composant
    useEffect(() => {
        fetchCustomers();

        // CustomersAPI.findAll()
        //             .then(data => setCustomers(data))
        //             .catch(error=> console.log(error.response))

    }, []);

    //gestion de la suppression d'un customer
    const handleDelete = async id => {

        const originalCustomers = [...customers];

        // l'approche optimiste
        setCustomers(customers.filter(customer =>customer.id !== id));

        // l'approche pessimiste
        try {
            await CustomersAPI.delete(id)
            toast.success("Le client a bien été supprimé !")
        } catch (error) {
            setCustomers(originalCustomers);
            toast.error("Erreur lors de la suppression du client! ")
        }
        // CustomersAPI.delete(id)
        //      .then(response => console.log("OK"))
        //      .catch(error => {
        //         setCustomers(originalCustomers);
        //         console.log(error.response);
        //      });

    };

    //gestion de la recherche
    const handleSearch = event=>{
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);

    }
    // gestion du changement de la page
    const handlePageChange = page => setCurrentPage(page);
    

    const itemsPerPage = 8;

    //filtrage des customers en fonction de la recherche
    const filteredCustomers = customers.filter(
        c => 
            c.firstName.toLowerCase().includes(search.toLowerCase()) || 
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase())) 


    );
    

    //pagination des données
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);
    
    return (
        <>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <h1>Liste des client</h1>
                <Link to="/customers/new" className='btn btn-primary'>Ajouter un client</Link>
            </div>
            
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />

            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="center">Factures</th>
                        <th className="text-right">Montant Total</th>
                        <th/>
                    </tr>
                </thead> 
               {!loading && <tbody>
                    {paginatedCustomers.map(customer => 
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                            <Link to={`/customers/${customer.id}`}>{customer.firstName} {customer.lastName}</Link>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className="text-center">
                                {customer.invoices.length}
                            </td>
                            <td>{customer.totalAmount.toLocaleString()} €</td>
                            <td className="text-right">
                                <button  
                                    onClick={()=> handleDelete(customer.id)}
                                    disabled={customer.invoices.length>0} 
                                    className="btn btn-sm btn-danger"
                                    >
                                     Supprimer
                                </button>
                            </td>
                        </tr>
                        )}
                    
                </tbody>}
                

            </table>
            
            {loading && <TableLoader/>}
            {
                itemsPerPage < filteredCustomers.length &&
                (<Pagination currentPage ={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} onPageChanged={handlePageChange} />)}
            
        </>
    );
};

export default CustomersPage;