import React from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import config from '../../config';
import { GeneralStyles } from '../../styles/GeneralStyles';

const backendIp = `${config.backendIp}`;
const apiPort = `${config.apiPort}`;
const backendUrl = `http://${backendIp}:${apiPort}`;

const FeedbackComponent = ({
  feedback,
  setFeedback,
}: {
  feedback: any;
  setFeedback: (feedback: any) => void;
}) => {
  if (!feedback) return null;

  const { width, height } = Dimensions.get('window'); // Get screen dimensions

  return (
    <View style={[styles.container, { width: width - 40, height: height - 100 }]}>
      {feedback.type === 'image' ? (
        <Image
          source={{ uri: backendUrl + feedback.data }}
          style={styles.image} // Image fills available space
        />
      ) : (
        <Text style={styles.text}>{feedback.data}</Text>
      )}

      {/* Button is always visible */}
      <Button
        title="Cerrar"
        color={GeneralStyles.button.backgroundColor}
        onPress={() => setFeedback(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20, // 10px margin from the screen edges
  },
  image: {
    flex: 1, // Take all available space within the container
    width: '100%', // Fit the container's width
    resizeMode: 'contain', // Maintain aspect ratio
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#800000ff',
  },
});

export default FeedbackComponent;
