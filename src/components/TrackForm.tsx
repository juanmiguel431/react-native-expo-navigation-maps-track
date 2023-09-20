import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/themed';
import Spacer from './Spacer';

export const TrackForm: React.FC = () => {
  return (
    <>
      <Spacer>
        <Input placeholder="Enter name" />
        <Button title="Start Recording" />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
