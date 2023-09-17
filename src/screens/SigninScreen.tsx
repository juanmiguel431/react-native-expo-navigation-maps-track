import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SCREEN, SigninScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';
import { AuthForm } from '../components';

export const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const { signIn, state } = useContext(AuthContext);

  return (
    <AuthForm
      header="Sign In for Tracker"
      submit={{ title: 'Sign In', callback: signIn }}
      errorMessage={state.errorMessage}
      link={{
        title: 'Dont have an account? Go back to sign up.',
        callback: () => {
          navigation.navigate(SCREEN.Signup);
        }
      }}
    />
  );
}

const styles = StyleSheet.create({});

export default SigninScreen;
