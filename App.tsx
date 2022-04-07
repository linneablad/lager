import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home.tsx';
import Pick from './components/Pick.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base} from './styles';
import Product from "./interfaces/product.ts"

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <SafeAreaView style={Base.container}>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = routeIcons[route.name] || "alert";
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1c5304',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                })}
            >
                <Tab.Screen name="Lager">
                    {()=> <Home products={products} setProducts={setProducts}/>}
                </Tab.Screen>
                <Tab.Screen name="Plock">
                    {()=> <Pick setProducts={setProducts}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}
