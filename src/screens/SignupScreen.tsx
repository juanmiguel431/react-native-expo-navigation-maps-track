import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import { SCREEN, SignupScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, signUp } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>
      <Input
        label="Email"
        placeholder="myemail@domain.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoFocus
        // errorMessage='Enter a valid email'
        leftIcon={
          <MaterialCommunityIcons
            style={styles.icon}
            name="email-outline"
          />
        }
      />
      <Spacer/>
      <Input
        secureTextEntry
        label="Password"
        placeholder="******"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        // errorMessage='Enter a password'
        leftIcon={
          <MaterialCommunityIcons
            style={styles.icon}
            name="lock-outline"
          />
        }
      />
      {state.errorMessage &&
        <Text style={styles.errorMessage}>
          {state.errorMessage}
        </Text>
      }
      <Spacer>
        <Button
          type="clear"
          title="Sign Up"
          onPress={() => {
            signUp({ email: email, password: password });
          }}
        />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 10,
    marginTop: 150,

    // flex: 0.7, //This cause an issue in Android which makes the keyboard move to the top the whole content.
    // justifyContent: 'center',
    // marginBottom: 250
  },
  icon: {
    fontSize: 20
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
});

export default SignupScreen;
