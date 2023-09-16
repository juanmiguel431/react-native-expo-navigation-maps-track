import React, { Reducer, Dispatch } from 'react';
import createDataContext from './createDataContext';
import { TRACK_ACTION_TYPE } from '../models/actions';

type ReducerState = { isSignedIn: boolean; };
type ReducerAction = SignInAction | SignOutAction;

type SignInAction = { type: TRACK_ACTION_TYPE.SingIn };
type SignOutAction = { type: TRACK_ACTION_TYPE.SingOut };

const authReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case TRACK_ACTION_TYPE.SingIn:
      return { ...state, isSignedIn: true };
    case TRACK_ACTION_TYPE.SingOut:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
}

const signIn = (dispatch: Dispatch<ReducerAction>) => {
  return () => {
    dispatch({ type: TRACK_ACTION_TYPE.SingIn })
  }
};

const signOut = (dispatch: Dispatch<ReducerAction>) => {
  return async () => {
    dispatch({ type: TRACK_ACTION_TYPE.SingOut })
  }
};

const actions = {
  signIn, signOut
};

export const {
  Context: AuthContext ,
  Provider: AuthProvider
} = createDataContext(authReducer, actions, { isSignedIn: false });
