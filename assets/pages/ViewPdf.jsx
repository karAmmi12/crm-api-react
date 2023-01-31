import React, { useEffect, useState } from 'react';

import { PDFViewer } from '@react-pdf/renderer';
import InvoicesAPI from '../services/invoicesAPI';
import { useParams } from 'react-router-dom';
import PdfInvoice from '../components/pdf/PdfInvoice';




const ViewPdf = () => {
  const {id} = useParams();
  const [invoice, setInvoice] = useState({
    amount: "",
    customer :{},
    user:{},
    status: "",
    sentAt:"",
    invNumber:"",
    invoiceDetails:[]
   
});

  const fetchInvoice = async id => {
    try {
        
        const {amount, sentAt, invNumber, status, customer,user,invoiceDetails} = await InvoicesAPI.find(id);
        
            setInvoice({amount, sentAt, invNumber, status, customer, user, invoiceDetails})
            console.log(invoice)
        
    } catch (error) {
        console.log(error.response)
        
    }

}

useEffect(() => {
 
      
      fetchInvoice(id);
      
      


}, [id])
console.log(invoice)





    return (
      
      
            <PDFViewer width="1000" height="600" >
              <PdfInvoice 
                invoice = {invoice}
               
              
              />
            </PDFViewer>
            
            
          
    );
};






export default ViewPdf ;