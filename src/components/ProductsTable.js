import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const ProductsTable = ({ products, onDelete, onEdit }) => {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSaveEdit = (id) => {
    const updatedProduct = {
      name: editingProduct.name,
      category: editingProduct.category,
      price: editingProduct.price,
      description: editingProduct.description,
    };
    onEdit(id, updatedProduct);
    setEditingProduct(null);
  };

  return (
    <View>
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.id}</Text>
              {editingProduct && editingProduct.id === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editingProduct.name}
                    onChangeText={(text) => setEditingProduct({ ...editingProduct, name: text })}
                  />
                  <TextInput
                    style={styles.input}
                    value={editingProduct.category}
                    onChangeText={(text) => setEditingProduct({ ...editingProduct, category: text })}
                  />
                  <TextInput
                    style={styles.input}
                    value={editingProduct.price}
                    onChangeText={(text) => setEditingProduct({ ...editingProduct, price: text })}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={editingProduct.description}
                    onChangeText={(text) => setEditingProduct({ ...editingProduct, description: text })}
                  />
                  <Button title="Save" onPress={() => handleSaveEdit(item.id)} />
                  <Button title="Cancel" onPress={() => setEditingProduct(null)} />
                </>
              ) : (
                <>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.category}</Text>
                  <Text style={styles.cell}>{item.price}</Text>
                  <Text style={styles.cell}>{item.description}</Text>
                  <Button title="Edit" onPress={() => setEditingProduct(item)} />
                  <Button title="Delete" onPress={() => onDelete(item.id)} />
                </>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noProductsText}>No products yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  noProductsText: {
    textAlign: 'center',
    margin: 20,
    color: '#999',
  },
});

export default ProductsTable;
