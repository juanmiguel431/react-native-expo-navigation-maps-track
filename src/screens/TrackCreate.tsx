// import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import { TrackCreateScreenProps } from '../models/screen';
import { Map } from '../components';
import { LocationContext } from '../context/LocationContext';
import { ActivityIndicator } from 'react-native-paper';
import useLocation from '../hooks/useLocation';

export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {
  const { state: { currentLocation }, setCurrentLocation } = useContext(LocationContext);
  const [errorMsg] = useLocation(setCurrentLocation);

  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      {currentLocation ? (
        <Map coords={currentLocation.coords}/>
      ) : (
        <ActivityIndicator size="large" style={styles.activityIndicator}/>
      )}

      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 200
  }
});

export default TrackCreateScreen;
