import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@rneui/themed';
import Spacer from '../components/Spacer';
import { AccountScreenProps } from '../models/screen';

export const AccountScreen: React.FC<AccountScreenProps> = () => {
  const { state, signOut } = useContext(AuthContext);
  return (
    <SafeAreaView >
      <Text style={styles.user} >{state.user?.email}</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signOut} />
      </Spacer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  user: {
    fontSize: 20
  }
});

export default AccountScreen;
