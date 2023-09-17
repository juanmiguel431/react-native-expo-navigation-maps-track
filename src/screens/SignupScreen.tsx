import React, { useContext, useState } from 'react';
import { SCREEN, SignupScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {

  const { state, signUp } = useContext(AuthContext);

  return (
    <AuthForm
      header="Sign Up for Tracker"
      submit={{ title: 'Sign Up', callback: signUp }}
      errorMessage={state.errorMessage}
      link={{
        title: 'Already have an account? Sign in instead',
        callback: () => {
          navigation.navigate(SCREEN.Signin);
        }
      }}
    />
  );
}

export default SignupScreen;
