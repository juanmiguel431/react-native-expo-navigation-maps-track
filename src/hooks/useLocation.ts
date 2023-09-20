import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { IPoint } from '../models/track';

export const useLocation = (callback: (location: IPoint) => void) => {
  const [errorMsg, setErrorMsg] = useState('');

  const startWatching = useCallback(async (callback: (location: IPoint) => void) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Please enable location services.');
      return;
    }

    await Location.watchPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 10
    }, callback);
  }, []);

  useEffect(() => {
    startWatching(callback);
  }, [callback, startWatching]);

  return [errorMsg];
};

export default useLocation;
