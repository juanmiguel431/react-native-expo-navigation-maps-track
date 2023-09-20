import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { IPoint } from '../models/track';

export const useLocation = (shouldTrack: boolean, callback: (location: IPoint) => void) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [subscription, setSubscription] = useState<Location.LocationSubscription | undefined>(undefined);

  const startWatching = useCallback(async (callback: (location: IPoint) => void) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Please enable location services.');
      return;
    }

    const subscription = await Location.watchPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 10
    }, callback);

    setSubscription(subscription);
  }, []);

  useEffect(() => {
    if (shouldTrack && !subscription) {
      startWatching(callback);
    } else if (!shouldTrack && subscription) {
      subscription.remove();
      setSubscription(undefined);
    }
  }, [callback, startWatching, shouldTrack, subscription]);

  return [errorMsg];
};

export default useLocation;
