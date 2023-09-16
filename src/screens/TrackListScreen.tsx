import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SCREEN, TrackListScreenProps } from '../models/screen';

export const TrackListScreen: React.FC<TrackListScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
      <Button title="Go to Track Details" onPress={() => navigation.navigate(SCREEN.TrackDetail)}/>
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrackListScreen;
