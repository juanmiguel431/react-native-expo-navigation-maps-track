// import '../_mockLocation';
import React, { useCallback, useContext } from 'react';
import { LocationContext } from '../context';
import Map from './Map';
import { IPoint } from '../models/track';
import { useLocation } from '../hooks';
import { Text } from '@rneui/themed';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type TrackLocationMapProps = {
  isFocused: boolean;
}

export const TrackLocationMap: React.FC<TrackLocationMapProps> = ({ isFocused }) => {
  const { state: { currentLocation, recording,locations }, addLocation } = useContext(LocationContext);

  const callBack = useCallback((location: IPoint) => {
    addLocation(location, recording);
  }, [addLocation, recording]);

  const shouldTrack = isFocused || recording;
  const [errorMsg] = useLocation(shouldTrack, callBack);

  return (
    <>
      {currentLocation ? (
        <Map
          initialRegion={currentLocation.coords}
          currentLocation={currentLocation.coords}
          locations={locations.map(p => p.coords)}
        />
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
