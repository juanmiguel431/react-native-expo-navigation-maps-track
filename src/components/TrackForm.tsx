import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/themed';
import Spacer from './Spacer';
import { LocationContext } from '../context/LocationContext';

export const TrackForm: React.FC = () => {
  const { state: { recording, name }, toggleRecording, changeName } = useContext(LocationContext);

  return (
    <>
      <Spacer>
        <Input
          placeholder="Enter name"
          value={name}
          onChangeText={changeName}
        />
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={toggleRecording}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
