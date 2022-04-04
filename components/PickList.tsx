import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation }) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        navigation.navigate("List");
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.normal} key={index}>
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
         <View style={Base.paddingHorizontal}>
            <Text style={Typography.header2}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.header3}>Produkter:</Text>

            {orderItemsList}

            <Button color='#1c5304' title="Plocka order" onPress={pick} />
        </View>
    )
};
