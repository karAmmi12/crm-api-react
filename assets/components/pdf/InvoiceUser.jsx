import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 5,
        marginBottom: 26,
        borderBottom: 2,
    },
    company: {
        paddingBottom: 3,
        fontFamily: 'Helvetica-Bold',
        fontSize: 14
    },
  });




const InvoiceUser = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.company}>{invoice.user.company}</Text>
        <Text>{invoice.user.adresse}</Text>
        <Text>{invoice.user.phone}</Text>
        <Text>{invoice.user.email}</Text>
        
        
    </View>
);

export default InvoiceUser;