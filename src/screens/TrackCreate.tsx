// import '../_mockLocation';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { LocationObject } from 'expo-location/build/Location.types';
import { TrackCreateScreenProps } from '../models/screen';
import { Map } from '../components';

export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

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
        console.log(location);
      });

      // setLocation(location);
    })();
  }, []);


  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      <Map />

      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;
