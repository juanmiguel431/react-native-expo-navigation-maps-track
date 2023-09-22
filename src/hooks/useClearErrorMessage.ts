import React, { useContext } from 'react';
import { AuthContext } from '../context';
import { useFocusEffect } from '@react-navigation/native';

export const useClearErrorMessage = () => {
  const { clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        clearErrorMessage();
      };
    }, [])
  );
}

export default useClearErrorMessage;
