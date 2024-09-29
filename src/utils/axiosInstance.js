import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const baseURL = 'http://192.168.1.124:8082';

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
  const navigation = useNavigation();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      await AsyncStorage.setItem('authTokens', JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));

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
        await AsyncStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigation.navigate('LoginScreen');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
