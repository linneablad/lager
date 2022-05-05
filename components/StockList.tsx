import {Text, View} from 'react-native';
import {useEffect} from 'react';
import { Typography } from '../styles';
import productModel from "../models/products";

export default function StockList({products, setProducts}) {
    useEffect(async () => {
       setProducts(await productModel.getProducts());
   }, []);

    const list = products.map((product, index) => <Text style={Typography.normal} key={index}>{product.name} - {product.stock}</Text>);

    return (
        <View>
            {list}
        </View>
    );
}
