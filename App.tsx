import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './components/Home.tsx';
import Pick from './components/pick/Pick.tsx';
import Auth from './components/auth/Auth.tsx';
import Deliveries from './components/delivery/Deliveries.tsx';
import Invoices from './components/invoice/Invoices.tsx';
import Logout from './components/auth/Logout.tsx';
import Ship from './components/ship/Ship.tsx';
import { Base} from './styles';
import Product from "./interfaces/product.ts"
import authModel from './models/auth';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "car",
  "Logga in": "log-in",
  "Faktura": "cash",
  "Logga ut": "log-out",
  "Leverans": "map",
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

useEffect(async () => {
  setIsLoggedIn(await authModel.loggedIn());
}, []);


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
                <Tab.Screen name="Inleveranser">
                    {()=> <Deliveries setProducts={setProducts}/>}
                </Tab.Screen>
                {isLoggedIn ?
                    <>
                    <Tab.Screen name="Faktura" component={Invoices} />
                    <Tab.Screen name="Logga ut">
                      {() => <Logout setIsLoggedIn={setIsLoggedIn} />}
                    </Tab.Screen>
                    </> :
                  <Tab.Screen name="Logga in">
                    {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                  </Tab.Screen>
                }
                <Tab.Screen name="Leverans" component={Ship} />
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}
