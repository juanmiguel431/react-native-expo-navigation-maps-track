import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import { Text } from '@rneui/themed';
import { Screen } from '../models/screen';

type NavLinkProps = {
  text: string;
  routeName: Screen;
  params?: object;
}

export const NavLink: React.FC<NavLinkProps> = ({ text, routeName, params }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate(routeName, params);
    }}>
      <Spacer>
        <Text style={styles.link}>
          {text}
        </Text>
      </Spacer>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: 'blue'
  }
});

export default NavLink;
