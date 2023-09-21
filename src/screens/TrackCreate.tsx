// import '../_mockLocation';
import React, { useCallback, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
import { TrackCreateScreenProps } from '../models/screen';
import { Map, TrackForm } from '../components';
import { LocationContext } from '../context/LocationContext';
import { ActivityIndicator } from 'react-native-paper';
import useLocation from '../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import { IPoint } from '../models/track';

export const TrackCreateScreen: React.FC<TrackCreateScreenProps> = () => {
  const { state: { currentLocation, recording }, addLocation } = useContext(LocationContext);
  const isFocused = useIsFocused();

  const callBack = useCallback((location: IPoint) => {
    addLocation(location, recording);
  }, [addLocation, recording]);

  const [errorMsg] = useLocation(isFocused, callBack);

  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      {currentLocation ? (
        <Map coords={currentLocation.coords}/>
      ) : (
        <ActivityIndicator size="large" style={styles.activityIndicator}/>
      )}

      {errorMsg && <Text>{errorMsg}</Text>}
      <TrackForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 200
  }
});

export default TrackCreateScreen;
