import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment/moment';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        
    },
    invNumber: {
        fontFamily: 'Helvetica-BoldOblique',

    }
   
    
  });

  const formatDate = (str) => moment(str).format("DD/MM/YYYY");


  const InvoiceNo = ({invoice}) => (
       
            <View style={styles.container}>
                <Text style={styles.invNumber}>Facture No: {invoice.invNumber}</Text>
                <Text >Date: {formatDate(invoice.sentAt)} </Text>
            </View >
            
  );
  
  export default InvoiceNo