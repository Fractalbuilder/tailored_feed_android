import { StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800000ff',
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  centeredImage: {
    width: 150,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainer: {
    backgroundColor: '#44aa00ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#800000ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
