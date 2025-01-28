import React, { useEffect, useState } from 'react';
import { View, Text, Button,  StyleSheet } from 'react-native';
import config from '../../config';
import { GeneralStyles } from '../../styles/GeneralStyles';
import { SessionScreenStyles as Styles } from '../../styles/SessionScreenStyles';
import QuestionComponent from './QuestionComponent';
import FeedbackComponent from './FeedbackComponent';

const backendIp = `${config.backendIp}`;
const channelsPort = `${config.channelsPort}`;

const SessionScreen = ({ route }) => {
    const { sessionId, sessionName, totalQuestions, userId } = route.params;
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [ws, setWs] = useState(null);
    const [currentMessage, setCurrentMessage] = useState<string>('Cargando...');
    const [currentComponent, setCurrentComponent] = useState<'waiting' | 'question' | 'feedback' | 'completed'>('waiting');
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [currentFeedback, setCurrentFeedback] = useState<any>(null);
    
    useEffect(() => {
        const ws = new WebSocket(`ws://${backendIp}:${channelsPort}/ws/session/${sessionId}/${userId}/${totalQuestions}/`, {
            headers: {
                Origin: `http://${backendIp}:${channelsPort}`,
            }
        });
        setWs(ws);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            console.log(`Session ID: ${sessionId}`);
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            
            if (data.type === 'feedback_and_question') {
              setCurrentFeedback(data.feedback);
              setCurrentQuestion(data.question);
            } else if (data.type === 'question') {
              let quest = data.question;
              let questFeedback = quest.feedback
              
              if(questFeedback) {
                setCurrentFeedback(questFeedback);
              } else {
                setCurrentFeedback(null);
              }
              
              setCurrentQuestion(quest);
            } else if (data.type === 'notification') {
              setCurrentMessage(data.message);
              setCurrentQuestion(null);
              setCurrentFeedback(null);
              
              if (data.code > 0) {
                ws.close();
              }
            }
        };

        ws.onerror = (e) => {
            console.error('WebSocket error: ', e.message);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => ws.close();
    }, []);


    const handleFeedbackSubmit = (rating: number) => {
      // Send the feedback rating to the server
      //const socket = new WebSocket('ws://your-django-server/ws/sessions/');
      //socket.send(JSON.stringify({ type: 'feedback_rating', payload: { rating } }));
  
      // Remove feedback and reveal the question
      setCurrentFeedback(null);
    };

    return (
        <View style={GeneralStyles.container}>
          <Text style={GeneralStyles.title}>{sessionName}</Text>

          {currentQuestion && <QuestionComponent ws={ws} question={currentQuestion} sessionId={sessionId} totalQuestions={totalQuestions} userId={userId} />}
          
          {currentFeedback && (
            <View style={Styles.overlay}>
              <FeedbackComponent feedback={currentFeedback} setFeedback={setCurrentFeedback}  onFeedbackSubmit={handleFeedbackSubmit} />
            </View>
          )}

          {!currentQuestion && !currentFeedback && (
            <Text style={Styles.message}>{currentMessage}</Text>
          )}
        </View>
    );
};

export default SessionScreen;
