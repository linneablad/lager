import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home.tsx';
import Pick from './components/Pick.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = routeIcons[route.name] || "alert";

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1c5304',
                tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Lager" component={Home} />
                <Tab.Screen name="Plock" component={Pick} />
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#333',
  },
});

// import { StatusBar } from 'expo-status-bar';
// import { Image, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Stock from './components/Stock.tsx';
// import warehouse from './assets/warehouse.jpg';
//
// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//         <View style={{backgroundColor: '#e9f8e3', alignItems: 'center'}}>
//           <Text style={{color: '#1c5304', fontSize: 42}}>Lager-Appen</Text>
//         </View>
//         <View style={{alignItems: 'center'}}>
//           <Image source={warehouse} style={{width: 320, height: 240}}/>
//         </View>
//         <View style={styles.base}>
//           <Stock />
//           <StatusBar style="auto" />
//         </View>
//     </SafeAreaView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     color: '#333',
//   },
//   base: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingLeft: 12,
//     paddingRight: 12,
//   }
// });
