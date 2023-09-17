import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SCREEN, SignupScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';
import { AuthForm, NavLink } from '../components';

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { state, signUp } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        header="Sign Up for Tracker"
        submit={{ title: 'Sign Up', callback: signUp }}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Already have an account? Sign in instead."
        routeName={SCREEN.Signin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 10,
    marginTop: 150,

    // flex: 0.7, //This cause an issue in Android which makes the keyboard move to the top the whole content.
    // justifyContent: 'center',
    // marginBottom: 250
  },
});

export default SignupScreen;
