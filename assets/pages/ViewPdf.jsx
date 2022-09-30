import React, { useEffect, useState } from 'react';

import { PDFViewer } from '@react-pdf/renderer';
import InvoicesAPI from '../services/invoicesAPI';
import { useParams } from 'react-router-dom';
import PdfInvoice from '../components/PdfInvoice';



const ViewPdf = () => {
  const {id} = useParams();
  const [invoice, setInvoice] = useState({
    amount: "",
    customer :{
      firstName: "",
      lastName: ""
    },
    status: "",
    sentAt:"",
    invNumber:""
   
});

  const fetchInvoice = async id => {
    try {
        
        const {amount, sentAt, invNumber, status, customer :{firstName, lastName}} = await InvoicesAPI.find(id);
        
            setInvoice({amount, sentAt, invNumber, status, customer :{firstName, lastName}})
            
        
    } catch (error) {
        console.log(error.response)
        
    }

}

useEffect(() => {
 
      
      fetchInvoice(id);
      
      


}, [id])
console.log(invoice)

    return (
        
            <PDFViewer>
              <PdfInvoice 
                invNumber = {invoice.invNumber}
                status = {invoice.status}
                amount ={invoice.amount}
                sentAt ={invoice.sentAt}
                customer = {invoice.customer}
              
              />
            </PDFViewer>
          
    );
};

export default ViewPdf;