
import {Text, View, Button} from 'react-native';
import { Base, Typography } from '../../styles';
import authModel from '../../models/auth';

export default function Login({setIsLoggedIn}) {

    async function doLogout() {

            await authModel.logout();

            setIsLoggedIn(false);
        }


    return (
        <View style={Base.paddingHorizontal}>
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
