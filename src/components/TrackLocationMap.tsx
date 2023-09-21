// import '../_mockLocation';
import React, { useCallback, useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import Map from './Map';
import { IPoint } from '../models/track';
import useLocation from '../hooks/useLocation';
import { Text } from '@rneui/themed';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type TrackLocationMapProps = {
  isFocused: boolean;
}

export const TrackLocationMap: React.FC<TrackLocationMapProps> = ({ isFocused }) => {
  const { state: { currentLocation, recording }, addLocation } = useContext(LocationContext);

  const callBack = useCallback((location: IPoint) => {
    // console.log(`${recording ? 'Recording' : 'Current'} Location ${location.timestamp}`);
    addLocation(location, recording);
  }, [addLocation, recording]);

  const shouldTrack = isFocused || recording;
  const [errorMsg] = useLocation(shouldTrack, callBack);

  return (
    <>
      {currentLocation ? (
        <Map coords={currentLocation.coords}/>
      ) : (
        <ActivityIndicator size="large" style={styles.activityIndicator}/>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 100
  }
});

export default TrackLocationMap;