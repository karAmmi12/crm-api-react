import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#515152'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#adadad',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
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
        width: '20%',
    },
   
  });

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.description}>-</Text>
            <Text style={styles.qty}>-</Text>
            <Text style={styles.price}>-</Text>
            <Text style={styles.amount}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace

