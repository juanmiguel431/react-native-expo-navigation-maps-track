import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SCREEN, SigninScreenProps } from '../models/screen';
import { TrackContext } from '../context/TrackContext';

export const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const { signIn } = useContext(TrackContext);
  return (
    <View>
      <Text style={{ fontSize: 48 }}>SigninScreen</Text>
      <Button title="Go to Sign Up" onPress={() => navigation.navigate(SCREEN.Signup)}/>
      <Button title="Sign In" onPress={signIn}/>
    </View>
  );
}

const styles = StyleSheet.create({});

export default SigninScreen;
