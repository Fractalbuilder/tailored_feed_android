import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductsScreen from '../screens/ProductsScreen';
import PrivateRoutes from './PrivateRoutes';
import { View, Text } from 'react-native';
import { generalStyles } from '../styles/generalStyles';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <View style={generalStyles.container}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' }
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;
