import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Spacer from './Spacer';
import { Button, Input, Text } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from '../models/login';

type AuthFormProps = {
  header: string;
  submit: { title: string; callback: (user: User) => void };
  link?: { title: string; callback: () => void };
  errorMessage?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ header, submit, link, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
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
      {link &&
        <TouchableOpacity onPress={link.callback}>
          <Spacer>
            <Text style={styles.link}>
              {link.title}
            </Text>
          </Spacer>
        </TouchableOpacity>
      }
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
  icon: {
    fontSize: 20
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  link: {
    fontSize: 16,
    color: 'blue'
  }
});


export default AuthForm;
