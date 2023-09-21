import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/themed';
import Spacer from './Spacer';
import { LocationContext } from '../context/LocationContext';

export const TrackForm: React.FC = () => {
  const { state: { recording, name }, toggleRecording, changeName } = useContext(LocationContext);

  const configButton = recording ? {
    title: 'Stop Recording',
    color: 'secondary'
  } : {
    title: 'Start Recording',
    color: 'primary'
  };

  return (
    <>
      <Spacer>
        <Input
          placeholder="Enter name"
          value={name}
          onChangeText={changeName}
          disabled={recording}
        />
        <Button
          {...configButton}
          onPress={toggleRecording}
          disabled={!name}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
