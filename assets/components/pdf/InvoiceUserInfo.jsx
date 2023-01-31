import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';


const styles = StyleSheet.create({
    info: {
        marginTop: 5,
        borderTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    
  });
const InvoiceUserInfo = ({invoice}) => (
   <View style={styles.info}>
    <Text>N° SIRET: {invoice.user.siret}</Text>
    <Text>{invoice.user.company}. {invoice.user.adresse}</Text>
   </View> 
);

export default InvoiceUserInfo;