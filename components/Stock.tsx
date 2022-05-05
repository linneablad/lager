import {Text, View} from 'react-native';
import { Base, Typography } from '../styles';
import StockList from '../components/StockList.tsx';

export default function Stock({products, setProducts}) {
  return (
      <View style={Base.base}>
      <Text style={Typography.header2}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
      </View>
  );
}
