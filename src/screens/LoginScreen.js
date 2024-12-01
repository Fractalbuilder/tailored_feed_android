import React, { useContext } from 'react';
import { View, TextInput, Button, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import { GeneralStyles } from '../styles/GeneralStyles';
import { AuthenticationScreen } from '../styles/AuthenticationScreenStyles';

const LoginScreen = () => {
    const { loginUser, setUsername, setPassword } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View style={AuthenticationScreen.container}>
            <Image
                source={require('../images/icons/Tailored_feed.png')}
                style={AuthenticationScreen.logo}
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
            <View style={AuthenticationScreen.buttonContainer}>
                <Button title="Ingresar" onPress={loginUser} color={AuthenticationScreen.button.backgroundColor} />
            </View>
            
            <View style={AuthenticationScreen.redirectionLink}>
                <Text style={AuthenticationScreen.redirectionText}>
                    ¿No tiene cuenta?{' '}
                    <Text
                        style={AuthenticationScreen.link}
                        onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        Regístrese aquí
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;
