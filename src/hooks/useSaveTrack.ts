import { useCallback, useContext } from 'react';
import { TrackContext, LocationContext } from '../context';

export const useSaveTrack = (): [() => Promise<void>, boolean] => {
  const { createTrack, state: {loading} } = useContext(TrackContext);
  const { state: { name, locations }, clearForm } = useContext(LocationContext);

  const saveTrack = useCallback(async () => {
    await createTrack({ name: name, locations: locations });
    clearForm();
  }, [name, locations, createTrack, clearForm])

  return [saveTrack, loading];
}

export default useSaveTrack;
