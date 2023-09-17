import React, { useContext } from 'react';
import { SCREEN, SigninScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';
import { AuthForm, NavLink } from '../components';

export const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const { state, signIn } = useContext(AuthContext);

  return (
    <>
      <AuthForm
        header="Sign In for Tracker"
        submit={{ title: 'Sign In', callback: signIn }}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Dont have an account? Go back to sign up."
        routeName={SCREEN.Signup}
      />
    </>
  );
}

export default SigninScreen;
