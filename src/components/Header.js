import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Products Management</Text>
      <View style={styles.navItems}>
        {user ? (
          <>
            <Text style={styles.userText}>{user.username}</Text>
            <TouchableOpacity onPress={logoutUser}>
              <Text style={styles.link}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff5722', // Custom orange color
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    color: 'white',
    marginRight: 10,
  },
  link: {
    color: '#008bfc', // Link color
    fontWeight: 'bold',
  },
});

export default Header;
