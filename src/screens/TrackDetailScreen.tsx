import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackDetailScreenProps } from '../models/screen';

export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = () => {
  return (
    <View>
      <Text style={{ fontSize: 48 }} >TrackDetailScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrackDetailScreen;
