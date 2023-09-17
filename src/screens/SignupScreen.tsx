import React, { useContext } from 'react';
import { SCREEN, SignupScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';
import { AuthForm, NavLink } from '../components';

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { state, signUp } = useContext(AuthContext);

  return (
    <>
      <AuthForm
        header="Sign Up for Tracker"
        submit={{ title: 'Sign Up', callback: signUp }}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Already have an account? Sign in instead"
        routeName={SCREEN.Signin}
      />
    </>
  );
}

export default SignupScreen;
