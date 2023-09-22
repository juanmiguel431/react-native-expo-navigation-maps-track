import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackDetailScreenProps } from '../models/screen';
import { TrackContext } from '../context';
import { useFocusEffect } from '@react-navigation/native';

export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ navigation, route }) => {
  const id = route.params.id;

  const { state: { tracks }, fetchTrackById } = useContext(TrackContext);

  useFocusEffect(
    useCallback(() => {
      fetchTrackById(id);
    }, [id, fetchTrackById]));

  const track = tracks.find(t => t._id === id);

  return (
    <View>
      <Text style={{ fontSize: 48 }}>{track?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrackDetailScreen;
