import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { SCREEN, TrackListScreenProps } from '../models/screen';
import { TrackContext } from '../context';

export const TrackListScreen: React.FC<TrackListScreenProps> = ({ navigation }) => {
  const { state: { tracks }, fetchTracks } = useContext(TrackContext);

  useFocusEffect(
    useCallback(() => {
      fetchTracks();
    }, [fetchTracks]))

  return (
    <View>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN.TrackDetail)}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrackListScreen;
