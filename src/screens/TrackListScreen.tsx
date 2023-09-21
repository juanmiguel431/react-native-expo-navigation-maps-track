import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SCREEN, TrackListScreenProps } from '../models/screen';
import { LocationContext } from '../context/LocationContext';

export const TrackListScreen: React.FC<TrackListScreenProps> = ({ navigation }) => {
  const { state } = useContext(LocationContext);

  return (
    <View>
      <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
      <Text style={{ fontSize: 20 }}>Locations: {state.locations.length}</Text>

      <Button title="Go to Track Details" onPress={() => navigation.navigate(SCREEN.TrackDetail)}/>
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrackListScreen;
