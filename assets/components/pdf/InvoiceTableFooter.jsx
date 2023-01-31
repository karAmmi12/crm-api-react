import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });
const borderColor = '#515152'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#adadad',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontFamily: 'Helvetica-Bold'
    },
    description: {
        width: '80%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '20%',
        textAlign: 'right',
       
    }
  });
  

const InvoiceTableFooter = ({invoice}) => {
    
    return(    
        <View style={styles.row}>
            <Text style={styles.description}>TOTAL</Text>
            <Text style={styles.total}>{euro.format(invoice.amount).replace(/\s/g,' ')} </Text>
        </View>
    )
};
  
  export default InvoiceTableFooter