import createDataContext from './createDataContext';
import React, { Reducer, Dispatch } from 'react';
import { TRACK_ACTION_TYPE } from '../models/actions';

type ReducerState = { isLoggedIn: boolean; };
type ReducerAction = SignInAction | SignOutAction;

type SignInAction = { type: TRACK_ACTION_TYPE.SingIn };
type SignOutAction = { type: TRACK_ACTION_TYPE.SingOut };

const trackReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case TRACK_ACTION_TYPE.SingIn:
      return { ...state, isLoggedIn: true };
    case TRACK_ACTION_TYPE.SingOut:
      return { ...state, isLoggedIn: false };
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
  Context: TrackContext ,
  Provider: TrackProvider
} = createDataContext(trackReducer, actions, { isLoggedIn: false });
