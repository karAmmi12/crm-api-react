import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#515152'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#adadad',
        backgroundColor: '#adadad',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    price: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '20%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Designation</Text>
        <Text style={styles.qty}>Qté</Text>
        <Text style={styles.price}>Prix U</Text>
        <Text style={styles.amount}>Montant</Text>
    </View>
  );
  
  export default InvoiceTableHeader