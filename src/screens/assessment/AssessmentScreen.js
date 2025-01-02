import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const AssessmentScreen = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [ws, setWs] = useState(null);
    /*
    useEffect(() => {
        const ws = new WebSocket('ws://192.168.1.100:8083/ws/session/1/', {
            headers: {
              Origin: 'http://192.168.1.100:8083',  // Make sure this matches your server's expected origin
            }
        });
        setWs(ws);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('Received: ', data);
            
            if (data.question) {
                setQuestion(data.question);
            }
        };

        ws.onerror = (e) => {
            console.error('WebSocket error: ', e.message);
        };

        ws.onclose = (e) => {
            console.log('WebSocket connection closed');
        };

        return () => ws.close();
    }, []);

    const sendResponse = () => {
        if (ws) {
            console.log('Sending...');
            ws.send(JSON.stringify({ response: "Hello" }));
        }
    };
    */
    return (
        <View>
            <Text>{question}</Text>
            {/* Add input for response */}
            {/*<Button title="Send Response" onPress={sendResponse} />*/}
            <Button title="Send Response" />
        </View>
    );
};

export default AssessmentScreen;
