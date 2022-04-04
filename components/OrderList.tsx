import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders.ts";

export default function OrderList({ navigation }) {
    // const [allOrders, setAllOrders] = useState([]);
    //
    // useEffect(() => {
    //     fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
    //       .then(response => response.json())
    //       .then(result => setAllOrders(result.data));
    // }, []);

    const [allOrders, setAllOrders] = useState([]);

    useEffect(async () => {
        setAllOrders(await orderModel.getOrders());
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
         <View style={Base.paddingHorizontal}>
            <Text style={Typography.header2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
