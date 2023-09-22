import { Dispatch, Reducer } from 'react';
import createDataContext from './createDataContext';
import { LOCATION_ACTION_TYPE } from '../models/actions';
import { IPoint, ITrack } from '../models/track';

type ReducerState = ITrack & {
  recording: boolean;
  currentLocation: IPoint | null;
};

type ReducerAction = AddLocationAction | ChangeNameAction | ToggleRecordingAction | DeleteLocationsAction | ClearFormAction;

type AddLocationAction = { type: LOCATION_ACTION_TYPE.AddLocation; payload: { location: IPoint; isRecording: boolean; } };
type ChangeNameAction = { type: LOCATION_ACTION_TYPE.ChangeName; payload: string; };
type ToggleRecordingAction = { type: LOCATION_ACTION_TYPE.ToggleRecording; };
type DeleteLocationsAction = { type: LOCATION_ACTION_TYPE.DeleteLocations; };
type ClearFormAction = { type: LOCATION_ACTION_TYPE.ClearForm; };

const locationReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case LOCATION_ACTION_TYPE.ClearForm:
      return { ...state, name: '', locations: [] };
    case LOCATION_ACTION_TYPE.ChangeName:
      return { ...state, name: action.payload };
    case LOCATION_ACTION_TYPE.DeleteLocations:
      return { ...state, locations: [] };
    case LOCATION_ACTION_TYPE.ToggleRecording:
      return { ...state, recording: !state.recording };
    case LOCATION_ACTION_TYPE.AddLocation: {
      if (action.payload.isRecording) {
        return { ...state, locations: [...state.locations, action.payload.location], currentLocation: action.payload.location };
      } else {
        return { ...state, currentLocation: action.payload.location };
      }
    }
    default:
      return state;
  }
};

const toggleRecording = (dispatch: Dispatch<ReducerAction>) => () => {
  dispatch({ type: LOCATION_ACTION_TYPE.ToggleRecording });
};

const addLocation = (dispatch: Dispatch<ReducerAction>) => (location: IPoint, isRecording: boolean) => {
  dispatch({ type: LOCATION_ACTION_TYPE.AddLocation, payload: { location: location, isRecording: isRecording } });
};

const deleteLocations = (dispatch: Dispatch<ReducerAction>) => () => {
  dispatch({ type: LOCATION_ACTION_TYPE.DeleteLocations });
};

const changeName = (dispatch: Dispatch<ReducerAction>) => (name: string) => {
  dispatch({ type: LOCATION_ACTION_TYPE.ChangeName, payload: name });
};

const clearForm = (dispatch: Dispatch<ReducerAction>) => () => {
  dispatch({ type: LOCATION_ACTION_TYPE.ClearForm });
};

const actions = {
  addLocation, changeName, toggleRecording, deleteLocations, clearForm
};

const initialState: ReducerState = {
  recording: false,
  name: '',
  locations: [],
  currentLocation: null,
};

export const {
  Context: LocationContext,
  Provider: LocationProvider
} = createDataContext(locationReducer, actions, initialState);
