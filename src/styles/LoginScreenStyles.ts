import { StyleSheet } from 'react-native';

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
      resizeMode: 'contain',
  },
  buttonContainer: {
      marginTop: 12,
      width: '100%',
  },
  button: {
      backgroundColor: '#44aa00ff',
  }
});
