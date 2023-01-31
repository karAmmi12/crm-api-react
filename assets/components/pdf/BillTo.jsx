import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    
    billTo: {
       
        paddingBottom: 3,
        fontFamily: 'Helvetica-BoldOblique',
        
    },
  });


  const BillTo = ({invoice}) => (
    <View>
        <Text style={styles.billTo}>Facturé à:</Text>
        <Text>{invoice.customer.company}</Text>
        <Text>{invoice.customer.firstName} {invoice.customer.lastName}</Text>
        <Text>{invoice.customer.address}</Text>
        <Text>{invoice.customer.phone}</Text>
        <Text>{invoice.customer.email}</Text>
        
        
    </View>
  );
  
  export default BillTo