import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';

const Stack = createStackNavigator();

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Products" component={ProductsScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
  );
};

export default PrivateRoutes;
