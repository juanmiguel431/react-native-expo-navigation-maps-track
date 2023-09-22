import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SCREEN, SigninScreenProps } from '../models/screen';
import { AuthContext } from '../context';
import { AuthForm, NavLink } from '../components';
import { useClearErrorMessage } from '../hooks';

export const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const { state, signIn } = useContext(AuthContext);

  useClearErrorMessage();

  return (
    <View style={styles.container}>
      <AuthForm
        header="Sign In to Your Account"
        submit={{ title: 'Sign In', callback: signIn }}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Dont have an account? Sign up instead."
        routeName={SCREEN.Signup}
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

export default SigninScreen;
