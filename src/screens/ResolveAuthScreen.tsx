import React, { useContext, useEffect } from 'react';
import { ResolveAuthScreenProps } from '../models/screen';
import { AuthContext } from '../context/AuthContext';

export const ResolveAuthScreen: React.FC<ResolveAuthScreenProps> = () => {
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, [tryLocalSignIn]);

  return null;
};

export default ResolveAuthScreen;
