import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED: "danger"
}
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"


}
const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 8;
    const [loading, setLoading] = useState(true)

    // récuperation des invoices auprès de l'API
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);setLoading(false)

        } catch (error) {
            toast.error("erreur lors du chargement des factures!!")
            console.log(error.response)
        }

    };
    //charger les invoices au chargement du composant
    useEffect(() => {
        fetchInvoices();
    }, []);

    //gestion de la suppression d'une facture
    const handleDelete = async id => {

        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await InvoicesAPI.delete(id);
            toast.success("La facture à bien été supprimée! ")
        } catch (error) {
            console.log(error.response)
            toast.error("une erreur est survenue!")
            setInvoices(originalInvoices);
        }


    };

    //gestion de la recherche
    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }

    // gestion du changement de la page
    const handlePageChange = page => setCurrentPage(page);





    //gestion du format de la date
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");

    //filtrage des customers en fonction de la recherche
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())


    );

    //pagination des données
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);






    return (
        <>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <h1>Liste des factures</h1>
                <Link to="/invoices/new" className='btn btn-primary'>Ajouter une facture</Link>
            </div>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />

            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th>Date d'envoi</th>
                        <th>Statut</th>
                        <th>Montant</th>
                        <th></th>
                    </tr>
                </thead>
                {!loading && <tbody>

                    {paginatedInvoices.map(invoice =>
                        <tr key={invoice.id}>
                            <td>{invoice.invNumber}</td>
                            <td>
                            <Link to={`/customers/${invoice.customer.id}`}>{invoice.customer.firstName} {invoice.customer.lastName}</Link>
                            </td>
                            <td>{formatDate(invoice.sentAt)}</td>
                            <td>
                                <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                            </td>
                            <td>{invoice.amount.toLocaleString()} €</td>
                            <td>
                                <Link to={`/invoices/${invoice.id}`} className="btn btn-sm btn-dark">Editer</Link>
                                <button
                                    onClick={() => handleDelete(invoice.id)}

                                    className="btn btn-sm btn-danger">
                                    Supprimer
                                </button>
                            </td>
                        </tr>)}
                </tbody>}

            </table>
            {loading && <TableLoader/>}
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} onPageChanged={handlePageChange} />
        </>
    );
};

export default InvoicesPage;