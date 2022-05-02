import Auth from '../../interfaces/auth';
import { useState } from 'react';
import { showMessage } from "react-native-flash-message";
import authModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await authModel.register(auth.email, auth.password);

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
                statusBarHeight: 20,
            });

            if (result.type === "success") {
                navigation.navigate('Login');
            }

        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
                statusBarHeight: 20,
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    );
};
