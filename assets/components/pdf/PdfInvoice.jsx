import React from 'react';
import { Page, Document, Image, StyleSheet, View, BlobProvider } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import InvoiceUser from './InvoiceUser';
import InvoiceUserInfo from './InvoiceUserInfo';



const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    

    },
    logo: {
        width: 74,
        height: 66,
        
    }
  });
  
  const PdfInvoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <InvoiceTitle title='Facture'/>
                        <Image style={styles.logo} src={"./media/"+invoice.user.logo}  />

                    </View>
                    <InvoiceUser invoice={invoice}/>
                    <View style={styles.header}>
                        <BillTo invoice={invoice}/>
                        <InvoiceNo invoice={invoice}/>

                    </View>
                    
                    
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg />
                    <InvoiceUserInfo invoice={invoice}/>
                </Page>
            </Document>
        );
       
       
  
  export default PdfInvoice