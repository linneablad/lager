import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from "react-native-flash-message";
import { Base, Typography, Forms } from '../../styles';
import Delivery from '../../interfaces/delivery';
import Product from '../../interfaces/product';
import { Picker } from '@react-native-picker/picker';
import productModel from "../../models/products";
import deliveryModel from "../../models/deliveries";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);
    const dateToday = moment(new Date()).format('YYYY-MM-DD')

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        props.setDelivery({
            ...props.delivery,
            delivery_date: dateToday,
        });
    }, []);

    return (
        <View>
            {Platform.OS === "android" && (
                <>
                <Text style={ Typography.normalNoMargin }>{props.delivery.delivery_date || dateToday}</Text>
                <Button color='#6d6c6c' onPress={showDatePicker} title="Visa datumväljare" />
                </>
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        if (date !== undefined){
                            setDropDownDate(date);
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: moment(date).format('YYYY-MM-DD'),
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

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });
    const styleProductDropDown = Platform.OS === "ios" ? Forms.productDropDownIOS : Forms.productDropDownAndroid;

    useEffect(() => {
        if (Platform.OS === "ios" && products.length > 0) {
            props.setDelivery({ ...props.delivery, product_id: products[0].id });
            props.setCurrentProduct(productsHash[products[0].id]);
        }
    }, [products]);


    return (
        <View style={styleProductDropDown}>
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
        </View>
    );
}

export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        if (!delivery.amount || isNaN(parseInt(delivery.amount)) || delivery.amount <= 0) {
            showMessage({
                message: "Fel",
                description: "Fyll i antal produkter i form av ett positivt heltal",
                type: "warning",
                statusBarHeight: 20,
            });

        } else {
            const result = await deliveryModel.addDelivery(delivery);

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
                statusBarHeight: 20,
            });

            if (result.type === "success") {
                const updatedProduct = {
                    ...currentProduct,
                    stock: (currentProduct.stock || 0) + (delivery.amount || 0)
                };

                await productModel.updateProduct(updatedProduct);
                setProducts(await productModel.getProducts());
                navigation.navigate("List", { reload: true });
            }
        }
    }

    return (
        <SafeAreaView style={Base.base}>
        <ScrollView>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    const amount = parseInt(content);
                    if (isNaN(amount)) {
                        setDelivery({ ...delivery, amount: content });
                    } else {
                        setDelivery({ ...delivery, amount: amount });
                    }
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Text style={{ ...Typography.label }}>Datum</Text>
            <View style={Base.marginBottom}>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            </View>
            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })//Spread operator
                }}
                value={delivery?.comment}//Optional chaining operator
            />
            <Button
                title="Skapa inleverans"
                color='#1c5304'
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
        </SafeAreaView>
    );
};
