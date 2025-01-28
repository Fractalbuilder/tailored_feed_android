import { StyleSheet } from 'react-native';

export const SessionScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes the overlay fill the screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: '50%',
    fontWeight: 'bold',
    color: 'white'
  }
});
