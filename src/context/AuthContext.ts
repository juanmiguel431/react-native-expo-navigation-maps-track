import React, { Reducer, Dispatch } from 'react';
import createDataContext from './createDataContext';
import { TRACK_ACTION_TYPE } from '../models/actions';
import { SignInResponse, SignUpResponse, User } from '../models/login';
import trackerApi from '../apis/trackerApi';
import { AxiosError } from 'axios';

type ReducerState = {
  isSignedIn: boolean;
  isLoading: boolean;
  token: string;
  errorMessage: string;
  user: User | null;
};
type ReducerAction = SignInAction | SignOutAction | SignUpAction | SetLoadingAction | SetErrorAction;

type Action = { type: TRACK_ACTION_TYPE; payload?: any; };
type SignUpAction = { type: TRACK_ACTION_TYPE.SingUp; payload: { user: User, token: string }; };
type SignInAction = { type: TRACK_ACTION_TYPE.SingIn; payload: { user: User, token: string }; };
type SignOutAction = { type: TRACK_ACTION_TYPE.SingOut };
type SetLoadingAction = { type: TRACK_ACTION_TYPE.SetLoading; payload: boolean; };
type SetErrorAction = { type: TRACK_ACTION_TYPE.SetError; payload: string; };

const authReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case TRACK_ACTION_TYPE.SingIn:
      return {
        ...state,
        isSignedIn: true,
        errorMessage: '',
        isLoading: false,
        user: { email: action.payload.user.email, password: '' },
        token: action.payload.token
      };
    case TRACK_ACTION_TYPE.SingUp:
      return {
        ...state,
        isSignedIn: true,
        errorMessage: '',
        isLoading: false,
        user: { email: action.payload.user.email, password: '' },
        token: action.payload.token
      };
    case TRACK_ACTION_TYPE.SingOut:
      return { ...state, isSignedIn: false, errorMessage: '', isLoading: false, user: null, token: '' };
    case TRACK_ACTION_TYPE.SetLoading:
      return { ...state, isLoading: action.payload };
    case TRACK_ACTION_TYPE.SetError:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

const signIn = (dispatch: Dispatch<ReducerAction>) => {
  return async (user: User) => {
    try {
      dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: true });
      const response = await trackerApi.post<SignInResponse>('/signin', user);
      dispatch({ type: TRACK_ACTION_TYPE.SingIn, payload: { user: user, token: response.data.token } });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: TRACK_ACTION_TYPE.SetError, payload: err.message });
      }
    } finally {
      dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: false });
    }
  }
};

const signUp = (dispatch: Dispatch<ReducerAction>) => {
  return async (user: User) => {
    try {
      dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: true });
      const response = await trackerApi.post<SignUpResponse>('/signup', user);
      dispatch({ type: TRACK_ACTION_TYPE.SingUp, payload: { user: user, token: response.data.token } });
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage: string = err.response?.data;
        dispatch({ type: TRACK_ACTION_TYPE.SetError, payload: errorMessage });
      } else if (err instanceof Error) {
        dispatch({ type: TRACK_ACTION_TYPE.SetError, payload: err.message });
      }
    } finally {
      dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: false });
    }
  }
};

const signOut = (dispatch: Dispatch<ReducerAction>) => {
  return async () => {
    dispatch({ type: TRACK_ACTION_TYPE.SingOut });
  }
};

const actions = {
  signIn, signOut, signUp
};

const initialState: ReducerState = {
  isSignedIn: false,
  isLoading: false,
  token: '',
  errorMessage: '',
  user: null
};

export const {
  Context: AuthContext,
  Provider: AuthProvider
} = createDataContext(authReducer, actions, initialState);