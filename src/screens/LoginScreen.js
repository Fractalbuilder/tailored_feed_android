import React, { useContext } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import AuthContext from '../context/AuthContext';
import { GeneralStyles } from '../styles/GeneralStyles';
import { LoginScreenStyles } from '../styles/LoginScreenStyles';

const LoginScreen = () => {
    const { loginUser, setUsername, setPassword } = useContext(AuthContext);

    return (
        <View style={LoginScreenStyles.container}>
            <Image
                source={require('../images/icons/Tailored_feed.png')}
                style={LoginScreenStyles.logo}
            />
            <TextInput
                placeholder="Usuario"
                placeholderTextColor="#C0C0C0"
                onChangeText={setUsername}
                style={GeneralStyles.input}
            />
            <TextInput
                placeholder="Clave"
                placeholderTextColor="#C0C0C0"
                secureTextEntry
                onChangeText={setPassword}
                style={GeneralStyles.input}
            />
            <View style={LoginScreenStyles.buttonContainer}>
                <Button title="Ingresar" onPress={loginUser} color={LoginScreenStyles.button.backgroundColor} />
            </View>
        </View>
    );
};

export default LoginScreen;
