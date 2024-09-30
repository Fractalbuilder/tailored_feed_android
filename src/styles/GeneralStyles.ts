import { StyleSheet } from 'react-native';

export const GeneralStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#800000ff',
  },
  container: {
    flex: 1,
    backgroundColor: '#800000ff',
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontSize: 30,
    color: '#44aa00ff',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  centeredImage: {
    width: 150,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    color: '#000',
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
