import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { ICoordinate } from '../models/track';

type MapProps = {
  coords: ICoordinate;
  locations?: ICoordinate[];
}

export const Map: React.FC<MapProps> = ({ coords, locations}) => {

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
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
        radius={10}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      {locations && <Polyline coordinates={locations}/>}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 250
  }
});

export default Map;
