import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProductForm = ({ initialProduct, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialProduct ? initialProduct.name : "");
  const [category, setCategory] = useState(initialProduct ? initialProduct.category : "");
  const [price, setPrice] = useState(initialProduct ? initialProduct.price : "");
  const [description, setDescription] = useState(initialProduct ? initialProduct.description : "");

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setDescription(initialProduct.description);
    }
  }, [initialProduct]);

  const handleSubmit = () => {
    const newProduct = { name, category, price, description };
    onSubmit(newProduct);
  };

  return (
    <View style={styles.formContainer}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        required
      />
      <Text>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        required
      />
      <Text>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        required
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: 'white', // Background color for the form
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android shadow
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
  },
});

export default ProductForm;
