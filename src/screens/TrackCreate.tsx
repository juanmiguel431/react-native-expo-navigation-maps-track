import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import { TrackCreateScreenProps } from '../models/screen';
import { Map } from '../components';


export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {
  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      <Map />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;
