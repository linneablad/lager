import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Orderlist", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.normal} key={index}>
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    function showStatus(order) {
        let res = <Button color='#1c5304' title="Plocka order" onPress={pick} />;
        for (order_item of order.order_items) {
            if (order_item.amount > order_item.stock) {
                res = <Text style={Typography.normal}> Ordern går inte att packa då varor saknas </Text>;
            }
        }
        return res;
    }

    return (
         <View style={Base.paddingHorizontal}>
            <Text style={Typography.header2}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <Text style={Typography.header3}>Produkter:</Text>
            {orderItemsList}
            {showStatus(order)}
        </View>
    )
};
