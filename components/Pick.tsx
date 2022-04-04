import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from '../components/OrderList.tsx';
import PickList from '../components/PickList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Details" component={PickList} />
        </Stack.Navigator>
    );
}
