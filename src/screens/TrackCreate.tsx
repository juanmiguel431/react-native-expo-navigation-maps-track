import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackCreateScreenProps } from '../models/screen';

export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {
  return (
    <View>
      <Text style={{ fontSize: 48 }} >TrackCreateScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;
