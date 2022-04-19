import {Text, View, Button, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import {DataTable} from 'react-native-paper';
import { Base, Typography } from '../styles';
import invoiceModel from "../models/invoices.ts";
import Invoice from "../interfaces/invoices.ts";

export default function Invoices({ route, navigation }) {
    let params = route.params || false;
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    if (params.reload == true) {
        reloadInvoices();
        params.reload = false;
    }

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
       reloadInvoices();
    }, []);

    const tableOfInvoices = invoices
        .map((invoice, index) => {
            return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{invoice.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{invoice.order_id}</DataTable.Cell>
                  <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                  <DataTable.Cell numeric>{invoice.creation_date}</DataTable.Cell>
                  <DataTable.Cell numeric>{invoice.due_date}</DataTable.Cell>
                </DataTable.Row>
            );
        });

    let showInvoices = null;
    if (tableOfInvoices.length > 0) {
        showInvoices = <DataTable>
            <DataTable.Header>
                <DataTable.Title>Namn</DataTable.Title>
                <DataTable.Title numeric>Ordernummer</DataTable.Title>
                <DataTable.Title numeric>Pris</DataTable.Title>
                <DataTable.Title numeric>Skapad</DataTable.Title>
                <DataTable.Title numeric>Förfallodatum</DataTable.Title>
            </DataTable.Header>
            {tableOfInvoices}
        </DataTable>
    } else {
        showInvoices = <Text style={Typography.normal}>Det finns inga fakturor att visa</Text>;
    }

    return (
        <ScrollView style={Base.paddingHorizontal}>
            <Text style={Typography.header2}>Fakturor</Text>
            {showInvoices}
            <View style={Base.marginBottom}><Button
                title="Fakturera en order"
                color='#1c5304'
                onPress={() => {
                    navigation.navigate('Form');
                }}
            /></View>
        </ScrollView>
    );
}
