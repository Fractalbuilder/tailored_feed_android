import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import AuthContext from './src/context/AuthContext';
import { AuthProvider } from './src/context/AuthContext'; 
import AppNavigator from './src/utils/AppNavigator'; 
import Header from './src/components/Header'; 
import ProductsScreen from './src/screens/ProductsScreen';

const AppContent = () => {
    const { user } = useContext(AuthContext); // Access the user from context

    return (
        <>
            {user && <Header />}
            <AppNavigator />
        </>
    );
};

const App = () => {
    return (    
        <NavigationContainer>
            <AuthProvider>
            <AppContent />
            </AuthProvider>    
        </NavigationContainer>
    );
};

export default App;
