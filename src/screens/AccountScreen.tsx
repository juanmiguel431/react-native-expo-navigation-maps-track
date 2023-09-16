import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TrackContext } from '../context/TrackContext';

export const AccountScreen: React.FC = () => {
  const { signOut } = useContext(TrackContext);
  return (
    <View>
      <Text style={{ fontSize: 48 }} >AccountScreen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default AccountScreen;
