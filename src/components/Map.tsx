import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { ICoordinate } from '../models/track';

type MapProps = {
  coords: ICoordinate;
}

export const Map: React.FC<MapProps> = ({ coords}) => {

  // let points = [];
  // for (let i = 0; i < 20; i++) {
  //   points.push({
  //     latitude: 37.33233 + i * 0.001,
  //     longitude: -122.03121 + i * 0.001
  //   });
  // }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...coords,
        // latitude: 37.33233,
        // longitude: -122.03121,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        ...coords,
        // latitude: 37.33233,
        // longitude: -122.03121,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/*<Polyline*/}
      {/*  coordinates={points}*/}
      {/*/>*/}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
