import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../../styles';
import orderModel from "../../models/orders.ts";
import Order from "../../interfaces/order.ts"

export default function OrderList({ route, navigation }) {
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    useEffect(async () => {
       setAllOrders(await orderModel.getOrders());
   }, []);

    const listOfOrders = allOrders
        .filter(order => order.status_id === 200)
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
            <Text style={Typography.header2}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    );
}
