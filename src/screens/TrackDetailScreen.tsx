import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackDetailScreenProps } from '../models/screen';
import { TrackContext } from '../context';
import { useFocusEffect } from '@react-navigation/native';
import Map from '../components/Map';
import { ActivityIndicator } from 'react-native-paper';

export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ navigation, route }) => {
  const id = route.params.id;

  const { state: { tracks, loading }, fetchTrackById } = useContext(TrackContext);

  useFocusEffect(
    useCallback(() => {
      fetchTrackById(id);
    }, [id, fetchTrackById]));

  const track = tracks.find(t => t._id === id);

  const region = track?.locations[0].coords;

  return (
    <View>
      <Text style={styles.title}>{track?.name}</Text>
      {loading ? (
        <ActivityIndicator size="large" style={styles.activityIndicator}/>
      ) : region && (
        <Map
          height={400}
          initialRegion={track?.locations[0].coords}
          locations={track?.locations.map(p => p.coords)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 100
  },
  title: {
    fontSize: 40
  }
});

export default TrackDetailScreen;
