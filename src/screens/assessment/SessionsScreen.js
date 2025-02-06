import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; //
import EventSource from 'react-native-event-source';
import config from '../../config';
import AuthContext from '../../context/AuthContext';
import { GeneralStyles } from '../../styles/GeneralStyles';

const backendIp = `${config.backendIp}`;
const apiPort = `${config.apiPort}`;

const SessionsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const eventSourceRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const eventSource = new EventSource(`http://${backendIp}:${apiPort}/sse/sessions/`);
      eventSourceRef.current = eventSource;

      eventSource.addEventListener('message', (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setSessions(parsedData);
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

      // Cleanup: Close the SSE connection when leaving the screen
      return () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          console.log("SSE connection closed on screen blur");
        }
      };
    }, []) // No dependencies to ensure a fresh start on each focus
  );

  const accessSession = (id, name, totalQuestions) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      console.log("SSE connection manually closed");
    }

    navigation.navigate('SessionScreen', {
      sessionId: id,
      sessionName: name,
      totalQuestions: totalQuestions,
      userId: user['user_id'],
    });
  };

  return (
    <ScrollView style={GeneralStyles.container}>
      <Text style={GeneralStyles.title}>Evaluaciones</Text>
      {sessions.length === 0 ? (
        <Text style={GeneralStyles.text}>No hay evaluaciones disponibles</Text>
      ) : (
        sessions.map((session) => (
          <View key={session.id} style={GeneralStyles.item}>
            <Text style={[GeneralStyles.text,GeneralStyles.buttonLabel]}>{session.name}</Text>
            <Button
              title="Ingresar"
              color={GeneralStyles.button.backgroundColor}
              onPress={() => accessSession(session.id, session.name, session.totalQuestions)}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default SessionsScreen;
