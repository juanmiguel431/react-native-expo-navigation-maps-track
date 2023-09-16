import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import Spacer from '../components/Spacer';

export const SignupScreen: React.FC = () => {
  return (
    <>
      <Spacer>
        <Text h3 >Sign Up for Tracker</Text>
      </Spacer>
      <Input label="Email" />
      <Spacer />
      <Input label="Password" />
      <Spacer>
        <Button title="Sign Up" />
      </Spacer>
    </>
  );
}

const styles = StyleSheet.create({});

export default SignupScreen;
