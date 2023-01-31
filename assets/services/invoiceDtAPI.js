import axios from "axios";
import { INVOICEDT_API } from "../config";

function findAll(){
    return axios
        .get(INVOICEDT_API)
        .then(response => response.data['hydra:member'])

}

function deleteItemInvoice(id){
    return axios
        .delete(`${INVOICEDT_API}/${id}`)
    
}

function create(dtInvoice){
    console.log(dtInvoice)
    return axios
        .post(INVOICEDT_API, 
        {...dtInvoice, invoice : `/api/invoices/${dtInvoice.invoice.id}`}
        );
}

function find(idDt){
    return axios
        .get(`${INVOICEDT_API}/${idDt}`)
        .then(response => response.data);
}

function update(idDt, dtInvoice){
    return axios
        .put(`${INVOICEDT_API}/${idDt}`,
        {...dtInvoice, invoice : `/api/invoices/${dtInvoice.invoice.id}`});
}




export default {
    findAll,
    delete : deleteItemInvoice,
    create,
    find,
    update
    

}