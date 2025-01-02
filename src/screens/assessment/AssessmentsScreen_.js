import React from 'react';
import { View, Text } from 'react-native';
import { GeneralStyles } from '../../styles/GeneralStyles';

const AssessmentsScreen = () => {
  return (
    <View style={GeneralStyles.container}>
      <Text style={GeneralStyles.title}>Evaluaciones</Text>
      <Text style={GeneralStyles.text}>No hay evaluaciones registradas al momento</Text>
    </View>
  );
};

export default AssessmentsScreen_;
