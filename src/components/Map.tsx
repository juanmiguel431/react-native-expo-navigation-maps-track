import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { ICoordinate } from '../models/track';

type MapProps = {
  coords: ICoordinate;
}

export const Map: React.FC<MapProps> = ({ coords}) => {

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      // region={{
      //   ...coords,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // }}
    >
      <Circle
        center={coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
