import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { IPoint } from '../models/track';

export const useLocation = (shouldTrack: boolean, callback: (location: IPoint) => void) => {
  const [errorMsg, setErrorMsg] = useState('');

  const startWatching = useCallback(async (callback: (location: IPoint) => void) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Please enable location services.');
        return;
      }

      return await Location.watchPositionAsync({
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, callback);

    } catch (e) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      }
    }
  }, []);

  useEffect(() => {
    let promise: Promise<Location.LocationSubscription | undefined>;

    if (shouldTrack) {
      promise = startWatching(callback);
    }

    return () => {
      if (promise) {
        promise.then((subscription) => {
          if (subscription) {
            subscription.remove();
          }
        });
      }
    };

  }, [callback, shouldTrack, startWatching]);

  return [errorMsg];
};

export default useLocation;
