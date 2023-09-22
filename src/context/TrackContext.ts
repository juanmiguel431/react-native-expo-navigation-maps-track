import createDataContext from './createDataContext';
import { Dispatch, Reducer } from 'react';
import { TRACK_ACTION_TYPE } from '../models/actions';
import { ITrack } from '../models/track';
import { trackerApi } from '../apis';

type ReducerState = {
  loading: boolean;
  tracks: ITrack[];
};

type ReducerAction = FetchTracksAction | CreateTracksAction;

type FetchTracksAction = { type: TRACK_ACTION_TYPE.FetchTracks; };
type CreateTracksAction = { type: TRACK_ACTION_TYPE.CreateTrack; payload: ITrack };

const trackReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case TRACK_ACTION_TYPE.FetchTracks:
      return { ...state };
    case TRACK_ACTION_TYPE.CreateTrack:
      return { ...state };
    default:
      return state;
  }
};

const fetchTracks = (dispatch: Dispatch<ReducerAction>) => () => {
  dispatch({ type: TRACK_ACTION_TYPE.FetchTracks });
};

const createTrack = (dispatch: Dispatch<ReducerAction>) => async (track: ITrack) => {
  dispatch({ type: TRACK_ACTION_TYPE.CreateTrack, payload: track });
};

const actions = {
  fetchTracks, createTrack
};


const initialState: ReducerState = {
  loading: false,
  tracks: [],
};

export const {
  Context: TrackContext,
  Provider: TrackProvider
} = createDataContext(trackReducer, actions, initialState);
