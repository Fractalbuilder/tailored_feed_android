import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { GeneralStyles } from '../../styles/GeneralStyles';
import { QuestionComponentStyles as Styles } from '../../styles/QuestionComponentStyles';

const QuestionComponent = (
  { ws, question, sessionId, totalQuestions, userId, bandwidth, luminosity, noiseLevel }: 
  { 
    ws: any, question: any, sessionId: any, totalQuestions: any, userId: any 
    bandwidth: any, luminosity: any, noiseLevel: any
  }
) => {
  const [selectedOptionsIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    setSelectedIndices([]);
  }, [question]);
  
  const handleOptionSelect = useCallback((index) => {
    setSelectedIndices((prevSelectedIndices) => {
      const isSelectedIndex = prevSelectedIndices.includes(index);
      const newIndices = isSelectedIndex
        ? prevSelectedIndices.filter((selectedIndex) => selectedIndex !== index)
        : [...prevSelectedIndices, index];

      return newIndices.sort((a, b) => a - b);
    });
  }, []);
  
  const handleSendAnswer = () => {
    if (selectedOptionsIndices.length === 0) {
      alert('Por favor seleccione al menos una opción');
      return;
    }
    
    let questionId = question['id'];
    let questionIndex = question['index'];
    let userContext = { bandwidth, luminosity, noiseLevel }

    ws.send(JSON.stringify(
      { 
        type: 'answer', payload: 
        { 
          sessionId, userId, questionId, selectedOptionsIndices, questionIndex, totalQuestions, userContext
        }
      }
    ));
  };

  const renderOption = useCallback(({ item: option, index }) => {
    const isSelected = selectedOptionsIndices.includes(index);
    return (
      <TouchableOpacity
        key={index.toString()}
        style={[
          Styles.optionButton,
          isSelected && Styles.selectedOptionButton,
        ]}
        onPress={() => handleOptionSelect(index)}
        activeOpacity={0.7}
      >
        <Text style={[Styles.optionText, isSelected && Styles.selectedOptionText]}>{option}</Text>
      </TouchableOpacity>
    );
  }, [selectedOptionsIndices, handleOptionSelect]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={GeneralStyles.text}>{question.statement}</Text>
      <FlatList style={{marginTop: 10, marginBottom: 10}}
        data={question.options}
        renderItem={renderOption}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Enviar" onPress={handleSendAnswer} disabled={selectedOptionsIndices.length === 0} />
    </View>
  );
};

export default QuestionComponent;