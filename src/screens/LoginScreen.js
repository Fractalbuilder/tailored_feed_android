import React, { useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import AuthContext from '../context/AuthContext';

const LoginScreen = () => {
    const { loginUser, setUsername, setPassword } = useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
                onChangeText={setUsername} // Update username state
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword} // Update password state
            />
            <Button title="Login" onPress={loginUser} />
        </View>
    );
};

export default LoginScreen;
