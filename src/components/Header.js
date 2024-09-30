import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';
import { HeaderStyles } from '../styles/HeaderStyles';

const Header = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <View style={HeaderStyles.header}>
      <Text style={HeaderStyles.title}>Tailored Feed</Text>
      <View style={HeaderStyles.navItems}>
        <TouchableOpacity onPress={logoutUser}>
          <Text style={HeaderStyles.link}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
