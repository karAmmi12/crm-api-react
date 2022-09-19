import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
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

    // récuperation des invoices auprès de l'API
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);

        } catch (error) {
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
        } catch (error) {
            console.log(error.response)
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
            <h1>Liste des factures</h1>
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
                <tbody>

                    {paginatedInvoices.map(invoice =>
                        <tr key={invoice.id}>
                            <td>{invoice.invNumber}</td>
                            <td>
                                <a href='#'>{invoice.customer.firstName} {invoice.customer.lastName}</a>
                            </td>
                            <td>{formatDate(invoice.sentAt)}</td>
                            <td>
                                <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                            </td>
                            <td>{invoice.amount.toLocaleString()} €</td>
                            <td>
                                <button className="btn btn-sm btn-dark">Editer</button>
                                <button
                                    onClick={() => handleDelete(invoice.id)}

                                    className="btn btn-sm btn-danger">
                                    Supprimer
                                </button>
                            </td>
                        </tr>)}
                </tbody>

            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} onPageChanged={handlePageChange} />
        </>
    );
};

export default InvoicesPage;