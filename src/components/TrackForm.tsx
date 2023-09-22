import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Input, Text } from '@rneui/themed';
import Spacer from './Spacer';
import { LocationContext } from '../context';
import { useSaveTrack } from '../hooks';

export const TrackForm: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { state: { recording, name, locations }, toggleRecording, changeName, deleteLocations } = useContext(LocationContext);

  const [saveTrack, isLoading] = useSaveTrack();

  const configButton = recording ? {
    title: 'Stop Recording',
    color: 'secondary'
  } : {
    title: 'Start Recording',
    color: 'primary'
  };

  const toggleDialog = useCallback(() => {
    setShowDialog((value) => !value);
  }, []);

  const onDeleteLocations = useCallback(() => {
    deleteLocations();
    toggleDialog();
  }, [deleteLocations, toggleDialog]);

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
      {!recording && locations.length > 0 &&
        <Spacer>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button title="Delete" color="secondary" onPress={toggleDialog}/>
            </View>
            <View style={styles.button}>
              <Button title="Save" onPress={saveTrack} disabled={isLoading || !name}/>
            </View>
          </View>
        </Spacer>
      }

      <Dialog
        isVisible={showDialog}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title="Are you sure?"/>
        <Text>You are about to delete all locations stored during the last recording.</Text>
        <Dialog.Actions>
          <Dialog.Button title="Confirm" onPress={onDeleteLocations}/>
          <Dialog.Button title="Cancel" onPress={toggleDialog}/>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 0.4
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default TrackForm;
