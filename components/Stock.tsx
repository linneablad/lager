import {Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import config from "../config/config.json";
import { Base, Typography } from '../styles';
import productModel from "../models/products";

function StockList({products, setProducts}) {
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

export default function Stock({products, setProducts}) {
  return (
      <View style={Base.base}>
      <Text style={Typography.header2}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
      </View>
  );
}
