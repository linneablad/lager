import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import moment from 'moment';
import { Base, Typography, Forms } from '../styles';
import Order from '../interfaces/order';
import { Picker } from '@react-native-picker/picker';
import invoiceModel from "../models/invoices";
import orderModel from "../models/orders";
import DateTimePicker from '@react-native-community/datetimepicker';

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button color='#6d6c6c' onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        if (date !== undefined){
                        setDropDownDate(date);
                        props.setInvoice({
                            ...props.invoice,
                            due_date: moment(date).format('YYYY-MM-DD'),
                        });
                    }
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function OrderDropDown(props) {
    const [allOrders, setOrder] = useState<Order[]>([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setOrder(await orderModel.getOrders());
    }, []);

    const itemsList = allOrders
    .filter(order => order.status === "Packad")
    .map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });
    const styleOrdersDropDown = Platform.OS === "ios" ? Forms.productDropDownIOS : Forms.productDropDownAndroid;
    return (
        <View style={styleOrdersDropDown}>
        <Picker
            selectedValue={props.order?.id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
        </View>
    );
}

export default function InvoiceForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function addInvoice() {
        const totalPrice = currentOrder.order_items.reduce((total, order_item) => {
            return total + (order_item.amount * order_item.price);
        }, 0);
        invoice["total_price"] = totalPrice;
        const date = new Date();
        invoice["creation_date"] = moment(date).format('YYYY-MM-DD');
        await invoiceModel.addInvoice(invoice);
        currentOrder["status_id"] = 600;
        await orderModel.updateOrder(currentOrder);
        navigation.navigate("Table", { reload: true });
    }

    return (
        <ScrollView style={{ ...Base.paddingHorizontal }}>
            <Text style={{ ...Typography.header2 }}>Fakturera en order</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />

            <Text style={{ ...Typography.label }}>Förfallodatum</Text>
            <View style={Base.marginBottom}>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
            </View>

            <Button
                title="Skapa faktura"
                color='#1c5304'
                onPress={() => {
                    addInvoice();
                }}
            />
        </ScrollView>
    );
};
