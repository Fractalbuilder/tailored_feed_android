import React, { useContext } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import AuthContext from '../context/AuthContext';
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
                onChangeText={setUsername}
                style={LoginScreenStyles.input}
            />
            <TextInput
                placeholder="Clave"
                secureTextEntry
                onChangeText={setPassword}
                style={LoginScreenStyles.input}
            />
            <View style={LoginScreenStyles.buttonContainer}>
                <Button title="Ingresar" onPress={loginUser} color={LoginScreenStyles.button.backgroundColor} />
            </View>
        </View>
    );
};

export default LoginScreen;
