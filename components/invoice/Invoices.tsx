import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoicesTable from '../../components/invoice/InvoicesTable.tsx';
import InvoiceForm from '../../components/invoice/InvoiceForm.tsx';


const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="Table">
            <Stack.Screen name="Table" component={InvoicesTable} options={{title: 'Fakturor',}}/>
            <Stack.Screen name="Form" component={InvoiceForm} options={{title: 'Fakturera en order',}}/>
        </Stack.Navigator>
    );
}
