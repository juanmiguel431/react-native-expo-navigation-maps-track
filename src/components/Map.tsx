import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { ICoordinate } from '../models/track';

type MapProps = {
  initialRegion: ICoordinate;
  currentLocation?: ICoordinate;
  locations?: ICoordinate[];
  height?: number;
}

export const Map: React.FC<MapProps> = ({ currentLocation, locations, initialRegion, height }) => {

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.flatten([styles.map, { height: height || 250 }])}
      initialRegion={{
        ...initialRegion,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {currentLocation &&
        <Circle
          center={currentLocation}
          radius={10}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />
      }
      {locations && <Polyline coordinates={locations}/>}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {}
});

export default Map;
