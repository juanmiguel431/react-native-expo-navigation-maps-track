// import '../_mockLocation';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { TrackCreateScreenProps } from '../models/screen';
import { Map } from '../components';
import { IPoint } from '../models/track';
import { LocationContext } from '../context/LocationContext';
import { ActivityIndicator } from 'react-native-paper';

export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {

  const [location, setLocation] = useState<IPoint | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { state: { currentLocation }, setCurrentLocation } = useContext(LocationContext);

  useEffect(() => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Please enable location services.');
        return;
      }

      await Location.watchPositionAsync({
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, (location) => {
        setCurrentLocation(location);
      });

      // setLocation(location);
    })();
  }, [setCurrentLocation]);

  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      {currentLocation ? (
        <Map coords={currentLocation.coords}/>
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 200 }}/>
      )}

      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;
