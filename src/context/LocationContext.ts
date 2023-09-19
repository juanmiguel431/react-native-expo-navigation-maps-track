import { Dispatch, Reducer } from 'react';
import createDataContext from './createDataContext';
import { LOCATION_ACTION_TYPE } from '../models/actions';
import { IPoint } from '../models/track';

type ReducerState = {
  recording: boolean;
  locations: Array<IPoint>;
  currentLocation: IPoint | null;
};

type ReducerAction = StartRecordingAction | StopRecordingAction | AddLocationAction;

type StartRecordingAction = { type: LOCATION_ACTION_TYPE.StartRecording };
type StopRecordingAction = { type: LOCATION_ACTION_TYPE.StopRecording };
type AddLocationAction = { type: LOCATION_ACTION_TYPE.SetCurrentLocation, payload: IPoint };

const locationReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case LOCATION_ACTION_TYPE.StartRecording:
      return state;
    case LOCATION_ACTION_TYPE.StopRecording:
      return state;
    case LOCATION_ACTION_TYPE.SetCurrentLocation:
      return { ...state, currentLocation: action.payload };
      // return { ...state, locations: [...state.locations, action.payload], currentLocation: action.payload };
    default:
      return state;
  }
};

const startRecording = (dispatch: Dispatch<ReducerAction>) => async () => {
  dispatch({ type: LOCATION_ACTION_TYPE.StartRecording });
};

const stopRecording = (dispatch: Dispatch<ReducerAction>) => async () => {
  dispatch({ type: LOCATION_ACTION_TYPE.StopRecording });
};

const setCurrentLocation = (dispatch: Dispatch<ReducerAction>) => async (point: IPoint) => {
  dispatch({ type: LOCATION_ACTION_TYPE.SetCurrentLocation, payload: point });
};

const actions = {
  startRecording, stopRecording, setCurrentLocation
};

const initialState: ReducerState = {
  recording: false,
  locations: [],
  currentLocation: null,
};

export const {
  Context: LocationContext,
  Provider: LocationProvider
} = createDataContext(locationReducer, actions, initialState);
