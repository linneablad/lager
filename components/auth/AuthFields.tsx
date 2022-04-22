import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <View style={Base.paddingHorizontal}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
            />
            <View style={Base.marginBottom}><Button
                title={title}
                color='#1c5304'
                onPress={() => {
                    submit();
                }}
            /></View>
            {title === "Logga in" &&
                <View style={Base.marginBottom}><Button
                    title="Registrera istället"
                    color='#6d6c6c'
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                /></View>
            }
        </View>
    );
};
