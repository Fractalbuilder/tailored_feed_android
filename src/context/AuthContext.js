import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Adjusted import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Use React Navigation's hook

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');  // State for username
    const [password, setPassword] = useState('');  // State for password

    const navigation = useNavigation(); // Use React Navigation

    useEffect(() => {
        const loadTokens = async () => {
            const tokens = await AsyncStorage.getItem('authTokens');
            if (tokens) {
                setAuthTokens(JSON.parse(tokens));
                //setUser(jwtDecode(JSON.parse(tokens).access));
                setUser(JSON.parse(tokens).access);
            }
            setLoading(false);
        };

        loadTokens();
    }, []);

    const loginUser = async () => {
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
            setUser(data.access);
            await AsyncStorage.setItem('authTokens', JSON.stringify(data));
            navigation.navigate('ProductsScreen'); // Navigate to the desired screen
        } else {
            alert('Wrong credentials');
        }
    };

    const registerUser = async () => {
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
            navigation.navigate('Products'); // Navigate to the desired screen
        } else {
            alert('The user wasn’t created');
        }
    };

    const logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        await AsyncStorage.removeItem('authTokens');
        navigation.navigate('LoginScreen'); // Adjust according to your navigation stack
    };

    const contextData = {
        user,
        authTokens,
        setAuthTokens,
        setUser,
        loginUser,
        registerUser,
        logoutUser,
        setUsername,  // Add the setter to the context
        setPassword,  // Add the setter to the context
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
