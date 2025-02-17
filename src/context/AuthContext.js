import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from '../../src/config';

const backendIp = `${config.backendIp}`;
const apiPort = `${config.apiPort}`;
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [externalId, setExternalId] = useState('');
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
            const response = await fetch(`http://${backendIp}:${apiPort}/external-login/`, {
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
                navigation.navigate('SessionsScreen');
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const registerUser = async () => {
        try {
            const response = await fetch(`http://${backendIp}:${apiPort}/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    externalId: parseInt(externalId, 10),
                    username,
                    email: '',
                    password,
                    role: 'student'
                }),
            });
            const data = await response.json();
            
            if (response.status === 201) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                await AsyncStorage.setItem('authTokens', JSON.stringify(data));
                navigation.navigate('SessionsScreen');
            } else if (response.status === 400) {
                console.error(data);
                
                if(data['externalId']) {
                    alert("Registro invalido. Ya existe un usuario con el Código SIMCA '" + externalId + "'");
                } else {
                    alert("Registro invalido. Ya existe un usuario llamado '" + username + "'");
                }
            } else {
                console.error(response.status);
                console.error(data);
                alert('El registro falló. Asegúrese de proporcionar un código, nombre y clave válidos');
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
        setExternalId,
        setUsername,
        setPassword,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
