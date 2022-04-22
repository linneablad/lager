import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from '../../components/ship/ShipList.tsx';
import ShipOrder from '../../components/ship/ShipOrder.tsx';

const Stack = createNativeStackNavigator();

export default function Ship() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList} options={{title: 'Orderlista',}}/>
            <Stack.Screen name="Details" component={ShipOrder} options={{title: 'Skicka',}}/>
        </Stack.Navigator>
    );
}
