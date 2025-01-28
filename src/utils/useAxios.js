// src/utils/useAxios.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native'; // Use this for navigation
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage
import config from '../../src/config';

const backendIp = `${config.backendIp}`;
const apiPort = `${config.apiPort}`;
const backendUrl = `http://${backendIp}:${apiPort}`;

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
    const navigation = useNavigation();

    const axiosInstance = axios.create({
        backendUrl,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        try {
            const response = await axios.post(`http://${backendIp}:${apiPort}/token/refresh/`, {
                refresh: authTokens.refresh
            });

            await AsyncStorage.setItem('authTokens', JSON.stringify(response.data));
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));

            req.headers.Authorization = `Bearer ${response.data.access}`;
            return req;
        } catch (error) {
            if (error.response && (error.response.status === 400 || error.response.status === 500)) {
                await AsyncStorage.removeItem('authTokens');
                setAuthTokens(null);
                setUser(null);
                navigation.navigate('LoginScreen');
            }

            return Promise.reject(error);
        }
    });

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await AsyncStorage.removeItem('authTokens'); // Use AsyncStorage
                setAuthTokens(null);
                setUser(null);
                navigation.navigate('LoginScreen'); // Use navigate instead of redirect
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default useAxios;
