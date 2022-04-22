import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from '../components/Stock.tsx';
import warehouse from '../assets/warehouse.jpg';
import { Base, Typography } from '../styles';

export default function Home({route, products, setProducts}) {
  return (
        <ScrollView>
            <View style={Base.centerHorisontal}>
                <View style={Base.greenBackground}>
                  <Text style={[Typography.header1, Base.greenText]}>Lager-Appen</Text>
                </View>
                <Image source={warehouse} style={{width: 320, height: 240}}/>
            </View>
              <Stock products={products} setProducts={setProducts}/>
              <StatusBar style="auto" />
        </ScrollView>
  );
}
