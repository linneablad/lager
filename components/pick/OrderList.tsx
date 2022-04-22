import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../../styles';
import orderModel from "../../models/orders.ts";
import Order from "../../interfaces/order.ts"

export default function OrderList({ route, navigation }) {
    let params = route.params || false;
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    if (params.reload == true) {
        reloadOrders();
        params.reload = false;
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
       reloadOrders();
   }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <View key={index} style={Base.marginBottom}><Button
                color='#1c5304'
                title={order.name}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            /></View>
        });

    return (
         <View style={Base.base}>
            <Text style={Typography.header2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
