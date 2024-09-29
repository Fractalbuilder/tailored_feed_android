import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import ProductsTable from '../components/ProductsTable';  // Refactor for React Native
import ProductForm from '../components/ProductForm';      // Refactor for React Native

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 30,
    color: '#333',
  },
});

export default ProductsScreen;
