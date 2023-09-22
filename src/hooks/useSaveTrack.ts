import { useCallback, useContext } from 'react';
import { TrackContext, LocationContext } from '../context';

export const useSaveTrack = (): [() => Promise<void>, boolean] => {
  const { createTrack, state: {loading} } = useContext(TrackContext);
  const { state: { name, locations } } = useContext(LocationContext);

  const saveTrack = useCallback(() => {
    return createTrack({ name: name, locations: locations });
  }, [name, locations, createTrack])

  return [saveTrack, loading];
}

export default useSaveTrack;

