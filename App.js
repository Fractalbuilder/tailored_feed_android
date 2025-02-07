import React, { useEffect, useState, useContext } from 'react';
import { View, PermissionsAndroid, Text, Button, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import AuthContext from './src/context/AuthContext';
import { AuthProvider } from './src/context/AuthContext'; 
import AppNavigator from './src/utils/AppNavigator'; 
import Header from './src/components/Header';

const AppPermissionWrapper = ({ children }) => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [hasAsked, setHasAsked] = useState(false);
  
    useEffect(() => {
      const requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Acceso Nivel Ruido',
              message: 'Se requiere de este componente para conocer los niveles de ruido.  Permisos adicionales son requeridos', //Inform about all the permissions needed
              buttonNeutral: 'Preguntar luego',
              buttonNegative: 'Negar',
              buttonPositive: 'Aceptar',
            }
          );
  
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionGranted(true);
          } else {
            console.log('Microphone permission denied');
            setHasAsked(true);
          }
        } catch (err) {
          console.warn(err);
          setHasAsked(true);
        }
      };
  
      if (!permissionGranted && !hasAsked) {
        requestPermission();
      }
    }, [permissionGranted, hasAsked]);
  
    if (permissionGranted) {
      return children;
    } else if (hasAsked) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 10 }}>Los permisos son requeridos para el uso de la app. Por favor, conceda los permisos en la configuración de la aplicación.</Text>
        <Button 
            title="Abrir Configuración" 
            onPress={() => {
                Linking.openSettings();
                }
            }
        />
      </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Solicitando permisos...</Text>
        </View>
      );
    }
};

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
        <AppPermissionWrapper>
            <NavigationContainer>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>    
            </NavigationContainer>
        </AppPermissionWrapper>
    );
};

export default App;
