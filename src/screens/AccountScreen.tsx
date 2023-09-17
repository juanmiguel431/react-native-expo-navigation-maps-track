import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@rneui/themed';
import Spacer from '../components/Spacer';
import { AccountScreenProps } from '../models/screen';

export const AccountScreen: React.FC<AccountScreenProps> = () => {
  const { state, signOut } = useContext(AuthContext);
  return (
    <View>
      <Text style={styles.user} >{state.user?.email}</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signOut} />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    fontSize: 20
  }
});

export default AccountScreen;
