import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeliveriesList from '../../components/delivery/DeliveriesList.tsx';
import DeliveryForm from '../../components/delivery/DeliveryForm.tsx';


const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveriesList} options={{title: 'Inleveranser-lista',}}/>
            <Stack.Screen name="Form" options={{title: 'Skapa ny inleverans',}}>
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
