import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from '../components/OrderList.tsx';
import PickList from '../components/PickList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Orderlist" component={OrderList} />
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
