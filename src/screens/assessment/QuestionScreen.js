import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import ProductsTable from '../components/ProductsTable';  // Refactor for React Native
import ProductForm from '../components/ProductForm';      // Refactor for React Native

const QuestionScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { authTokens } = useContext(AuthContext);
  let api = useAxios();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let response = await api.get('/products/');
    if (response && response.status === 200) {
      setProducts(response.data);
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    let response = await api.post('/products/', newProduct);
    if (response && response.status === 201) {
      setProducts([...products, response.data]);
      setIsCreating(false);
    }
  };

  const handleCreateProduct = (newProduct) => {
    addProduct(newProduct);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Button title="Create Product" onPress={() => setIsCreating(true)} />
      {isCreating && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setIsCreating(false)}
        />
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductsTable product={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#007bff' },
  title: { fontSize: 24, marginBottom: 20, color: '#ff5722' },
});

export default QuestionScreen;
