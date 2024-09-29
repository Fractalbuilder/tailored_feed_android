import { StyleSheet } from 'react-native';

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#800000ff',
  },
  logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
      resizeMode: 'contain',
  },
  input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
  },
  buttonContainer: {
      marginTop: 12,
      width: '100%',
  },
  button: {
      backgroundColor: '#44aa00ff',
  }
});
