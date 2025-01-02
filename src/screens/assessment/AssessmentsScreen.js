import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import EventSource from 'react-native-event-source';
import config from '../../../src/config';
import { GeneralStyles } from '../../styles/GeneralStyles';

const AssessmentsScreen = ({ navigation }) => {
  const [assessments, setAssessments] = useState([]);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    const eventSource = new EventSource(`${config.backendUrl}/sse/assessments/`);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('message', (event) => {
      console.log("Message received:", event.data);
      console.log(new Date().toLocaleTimeString());

      try {
        const parsedData = JSON.parse(event.data);
        setAssessments(parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
    
    eventSource.addEventListener('open', () => {
      console.log("SSE connection opened");
    });
    
    eventSource.addEventListener('error', (error) => {
      console.error("SSE connection error:", error);
    });

    return () => {
      console.error("SSE connection closed");
      eventSource.close();
    };
  }, []);

  const startAssessment = (id) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      console.log("SSE connection manually closed");
    }
    navigation.navigate('AssessmentScreen');
  };

  return (
    <ScrollView style={GeneralStyles.container}>
      <Text style={GeneralStyles.title}>Evaluaciones</Text>
      {assessments.length === 0 ? (
        <Text style={GeneralStyles.text}>No hay evaluaciones disponibles</Text>
      ) : (
        assessments.map((assessment) => (
          <View key={assessment.id} style={GeneralStyles.item}>
            <Text style={[GeneralStyles.text,GeneralStyles.buttonLabel]}>{assessment.name}</Text>
            <Button
              title="Iniciar"
              color={GeneralStyles.button.backgroundColor}
              onPress={() => startAssessment(assessment.id)}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default AssessmentsScreen;
