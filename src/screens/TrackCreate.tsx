import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import { TrackCreateScreenProps } from '../models/screen';
import { TrackForm } from '../components';
import { useIsFocused } from '@react-navigation/native';
import TrackLocationMap from '../components/TrackLocationMap';

export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {
  const isFocused = useIsFocused();

  console.log('Re-rendering trackCreate Form');
  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      <TrackLocationMap isFocused={isFocused} />
      <TrackForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;
