import { StyleSheet } from 'react-native';

export const QuestionComponentStyles = StyleSheet.create({
  optionButton: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#cccccc',
      backgroundColor: 'white',
      borderRadius: 5,
    },
    selectedOptionButton: {
      backgroundColor: '#44aa00ff',
      borderColor: '#44aa00ff',
    },
  optionText: {
      color: 'black',
      fontSize: 16,
  },
  selectedOptionText: {
      color: 'white'
  }
});
