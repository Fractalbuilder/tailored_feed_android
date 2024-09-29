import React, { useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

const RegisterScreen = () => {
  const { registerUser } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Register" onPress={registerUser} />
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#007bff' 
  },
  title: { 
    textAlign: 'center', 
    fontSize: 24, 
    marginBottom: 20, 
    color: '#ff5722' 
  },
  form: { 
    marginBottom: 20 
  },
  input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 10, 
    padding: 10 
  },
  link: { 
    textAlign: 'center', 
    color: 'blue', 
    marginTop: 10 
  },
});

export default RegisterScreen;
