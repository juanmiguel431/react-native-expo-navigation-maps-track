import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { IPoint } from '../models/track';

export const useLocation = (callback: (location: IPoint) => void, isFocused: boolean) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [subscription, setSubscription] = useState<Location.LocationSubscription | undefined>(undefined);

  const startWatching = useCallback(async (callback: (location: IPoint) => void) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Please enable location services.');
      return;
    }

    return Location.watchPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 10
    }, callback);
  }, []);

  useEffect(() => {
    if (isFocused && !subscription) {
      startWatching(callback).then((subscription) => {
        setSubscription(subscription);
      });
    } else if (!isFocused && subscription) {
      subscription.remove();
      setSubscription(undefined);
    }
  }, [callback, startWatching, isFocused, subscription]);

  return [errorMsg];
};

export default useLocation;
