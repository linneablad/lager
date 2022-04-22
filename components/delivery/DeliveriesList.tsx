import {Text, View, Button, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from '../../styles';
import deliveryModel from "../../models/deliveries.ts";
import Delivery from "../../interfaces/delivery.ts";

export default function DeliveriesList({ route, navigation }) {
    let params = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);

    if (params.reload == true) {
        reloadDeliveries();
        params.reload = false;
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
       reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <View key={index} style={Base.delivery}>
            <Text style={Typography.header3}>{delivery.amount}st. {delivery.product_name}</Text>
            <Text>Levererad: {delivery.delivery_date}</Text>
            <Text>Kommentar: {delivery.comment}</Text>
            </View>
        });

    const showDeliveries = listOfDeliveries.length > 0 ? listOfDeliveries : <Text style={Typography.normal}>Det finns inga inleveranser att visa</Text>;

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {showDeliveries}
            <View style={Base.marginBottom}><Button
                title="Skapa ny inleverans"
                color='#1c5304'
                onPress={() => {
                    navigation.navigate('Form');
                }}
            /></View>
        </ScrollView>
    );
}
