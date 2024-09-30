import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GeneralStyles } from '../styles/GeneralStyles';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AssessmentsScreen from '../screens/assessment/AssessmentsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <View style={GeneralStyles.mainContainer}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#800000ff' }
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="AssessmentsScreen" component={AssessmentsScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;
