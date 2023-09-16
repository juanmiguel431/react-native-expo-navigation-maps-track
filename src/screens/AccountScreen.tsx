import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const AccountScreen: React.FC = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View>
      <Text style={{ fontSize: 48 }} >AccountScreen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default AccountScreen;
