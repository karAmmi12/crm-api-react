import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Canvas } from '@react-pdf/renderer';
import InvoicesAPI from '../services/invoicesAPI';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';

// Create styles
const styles = StyleSheet.create({

  header: {
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    height: 150

  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    border: 1,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    
  },
  bodyRow: {
    flexDirection: 'row',
    border:1,
    justifyContent: 'space-between',

  },
  page: {
    flexDirection: 'column',
    padding: 25,
  },
  
});

const formatDate = (str) => moment(str).format("DD/MM/YYYY");

// Create Document Component
const PdfInvoice = (props) => (

  <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.header}><Text>Facture N° {props.invNumber}</Text></View>


      <View style={styles.headerRow}>
        <View><Text>Numéro</Text></View>
        <View><Text>Client</Text></View>
        <View><Text>Date d'envoi</Text></View>
        <View><Text>Statut</Text></View>
        <View><Text>Montant</Text></View>

      </View>
      <View style={styles.bodyRow}>
        <View><Text>{props.invNumber}</Text></View>

        <View><Text>{props.customer.firstName} {props.customer.lastName}</Text></View>

        <View><Text>{formatDate(props.sentAt)}</Text></View>


        <View><Text>{props.status}</Text></View>

        <View><Text>{props.amount} €</Text></View>
      </View>










    </Page>
  </Document>

);


export default PdfInvoice;