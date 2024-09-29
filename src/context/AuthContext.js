import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const loadTokens = async () => {
            const tokens = await AsyncStorage.getItem('authTokens');
            if (tokens) {
                const parsedTokens = JSON.parse(tokens);
                setAuthTokens(parsedTokens);
                setUser(jwtDecode(parsedTokens.access));
            }
            setLoading(false);
        };

        loadTokens();
    }, []);

    const loginUser = async () => {
        try {
            const response = await fetch('http://192.168.1.124:8082/external-login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                await AsyncStorage.setItem('authTokens', JSON.stringify(data));
                navigation.navigate('ProductsScreen');
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const registerUser = async () => {
        try {
            const response = await fetch('http://192.168.1.124:8082/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email: '',
                    password,
                }),
            });
            const data = await response.json();

            if (response.status === 201) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                await AsyncStorage.setItem('authTokens', JSON.stringify(data));
                navigation.navigate('ProductsScreen');
            } else {
                alert('User registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        await AsyncStorage.removeItem('authTokens');
        navigation.navigate('LoginScreen');
    };

    const contextData = {
        user,
        authTokens,
        setAuthTokens,
        setUser,
        loginUser,
        registerUser,
        logoutUser,
        setUsername,
        setPassword,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
