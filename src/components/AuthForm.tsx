import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { Button, Input, Text } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from '../models/login';

type AuthFormProps = {
  header: string;
  submit: { title: string; callback: (user: User) => void };
  errorMessage?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ header, submit, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text h3>{header}</Text>
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
      {errorMessage &&
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
      }
      <Spacer>
        <Button
          // type="clear"
          title={submit.title}
          onPress={() => {
            submit.callback({ email: email, password: password })
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
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


export default AuthForm;
