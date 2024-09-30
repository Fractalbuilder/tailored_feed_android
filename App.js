import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import AuthContext from './src/context/AuthContext';
import { AuthProvider } from './src/context/AuthContext'; 
import AppNavigator from './src/utils/AppNavigator'; 
import Header from './src/components/Header';

const AppContent = () => {
    const { user } = useContext(AuthContext);

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
