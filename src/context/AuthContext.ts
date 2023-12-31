import { Dispatch, Reducer } from 'react';
import createDataContext from './createDataContext';
import { TRACK_ACTION_TYPE } from '../models/actions';
import { SignInResponse, SignUpResponse, User } from '../models/login';
import trackerApi from '../apis/trackerApi';
import { AxiosError } from 'axios';
import { deleteItemAsync, getItemAsync, setItemAsync } from '../apis/secureStorage';
import * as RootNavigation from '../RootNavigation';
import { SCREEN } from '../models/screen';
import { deviceStorage } from '../models/device-storage';

type ReducerState = {
  isSignedIn: boolean | null;
  isLoading: boolean;
  token: string;
  errorMessage: string;
  user: User | null;
};
type ReducerAction =
  SignInAction
  | SignOutAction
  | SignUpAction
  | SetLoadingAction
  | SetErrorAction
  | ResolveAuthAction;

type Action = { type: TRACK_ACTION_TYPE; payload?: any; };
type SignUpAction = { type: TRACK_ACTION_TYPE.SingUp; payload: { user: User, token: string }; };
type SignInAction = { type: TRACK_ACTION_TYPE.SingIn; payload: { user: User, token: string }; };
type SignOutAction = { type: TRACK_ACTION_TYPE.SingOut };
type SetLoadingAction = { type: TRACK_ACTION_TYPE.SetLoading; payload: boolean; };
type SetErrorAction = { type: TRACK_ACTION_TYPE.SetError; payload: string; };
type ResolveAuthAction = { type: TRACK_ACTION_TYPE.ResolveAuth; payload: boolean; };

const authReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case TRACK_ACTION_TYPE.SingIn:
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
    case TRACK_ACTION_TYPE.ResolveAuth:
      return { ...state, isSignedIn: action.payload };
    default:
      return state;
  }
}

const signIn = (dispatch: Dispatch<ReducerAction>) => async (user: User) => {
  try {
    dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: true });
    const response = await trackerApi.post<SignInResponse>('/signin', user);

    const token = response.data.token;
    await setItemAsync(deviceStorage.Token, token);

    dispatch({ type: TRACK_ACTION_TYPE.SingIn, payload: { user: user, token: token } });
  } catch (err) {
    if (err instanceof Error) {
      dispatch({ type: TRACK_ACTION_TYPE.SetError, payload: err.message });
    }
  } finally {
    dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: false });
  }
};

const signUp = (dispatch: Dispatch<ReducerAction>) => async (user: User) => {
  try {
    dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: true });
    const response = await trackerApi.post<SignUpResponse>('/signup', user);

    const token = response.data.token;
    await setItemAsync(deviceStorage.Token, token);

    dispatch({ type: TRACK_ACTION_TYPE.SingUp, payload: { user: user, token: token } });

    // RootNavigation.navigate(SCREEN.Account); //It is not necessary. However, this is working as expected

    return true;

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
  return false;
};

const signOut = (dispatch: Dispatch<ReducerAction>) => async () => {
  await deleteItemAsync(deviceStorage.Token);
  dispatch({ type: TRACK_ACTION_TYPE.SingOut });
};

const clearErrorMessage = (dispatch: Dispatch<ReducerAction>) => () => {
  dispatch({ type: TRACK_ACTION_TYPE.SetError, payload: '' });
};

const tryLocalSignIn = (dispatch: Dispatch<ReducerAction>) => async () => {
  try {
    const token = await getItemAsync(deviceStorage.Token);

    if (!token) {
      return dispatch({ type: TRACK_ACTION_TYPE.ResolveAuth, payload: false });
    }

    dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: true });

    const response = await trackerApi.get<User>('/getUser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const user = response.data;

    dispatch({ type: TRACK_ACTION_TYPE.SingIn, payload: { user: { email: user.email, password: '' }, token: token } });

  } catch (err) {
    dispatch({ type: TRACK_ACTION_TYPE.ResolveAuth, payload: false });
    RootNavigation.navigate(SCREEN.Signin);
  } finally {
    dispatch({ type: TRACK_ACTION_TYPE.SetLoading, payload: false });
  }
};

const actions = {
  signIn, signOut, signUp, clearErrorMessage, tryLocalSignIn
};

const initialState: ReducerState = {
  isSignedIn: null,
  isLoading: false,
  token: '',
  errorMessage: '',
  user: null
};

export const {
  Context: AuthContext,
  Provider: AuthProvider
} = createDataContext(authReducer, actions, initialState);
