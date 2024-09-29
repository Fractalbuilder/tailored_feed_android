import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { AuthProvider } from './src/context/AuthContext'; // Adjust the path as necessary
import AppNavigator from './src/utils/AppNavigator'; // Import your navigator
import Header from './src/components/Header'; // Import your navigator

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Header/>
                    <AppNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
};

export default App;
