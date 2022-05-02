import { showMessage } from "react-native-flash-message";
import {Text, View, Button} from 'react-native';
import { Base, Typography } from '../../styles';
import authModel from '../../models/auth';

export default function Login({setIsLoggedIn}) {
    async function doLogout() {

            await authModel.logout();

            setIsLoggedIn(false);

            showMessage({
                message: "Användaren har loggats ut",
                type: "success",
                statusBarHeight: 20,
            });
        }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Logga ut</Text>
            <View style={Base.marginBottom}><Button
                title="Logga ut"
                color='#1c5304'
                onPress={() => {
                    doLogout();
                }}
            /></View>
        </View>
    );
};
