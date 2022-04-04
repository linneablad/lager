import {Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import config from "../config/config.json";
import { Base, Typography } from '../styles';
import productModel from "../models/products";

function StockList() {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    // fetch(`${config.base_url}/products?api_key=${config.api_key}`)
    //     .then(response => response.json())
    //     .then(result => setProducts(result.data));
    // }, []);

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

export default function Stock() {
  return (
      <View style={Base.paddingHorizontal}>
      <Text style={Typography.header2}>Lagerförteckning</Text>
      <StockList/>
      </View>
  );
}
