import createDataContext from './createDataContext';
import { Dispatch, Reducer } from 'react';
import { TRACKER_ACTION_TYPE } from '../models/actions';
import { ITrack } from '../models/track';
import { trackerApi } from '../apis';
import { AxiosError } from 'axios';

type ReducerState = {
  errorMessage: string;
  loading: boolean;
  tracks: ITrack[];
};

type ReducerAction = FetchTracksAction | CreateTracksAction | SetLoadingAction | SetErrorMessageAction | FetchTrackByIdAction;

type FetchTracksAction = { type: TRACKER_ACTION_TYPE.FetchTracks; payload: ITrack[] };
type CreateTracksAction = { type: TRACKER_ACTION_TYPE.CreateTrack; payload: ITrack };
type SetLoadingAction = { type: TRACKER_ACTION_TYPE.SetLoading; payload: boolean };
type SetErrorMessageAction = { type: TRACKER_ACTION_TYPE.SetError; payload: string };
type FetchTrackByIdAction = { type: TRACKER_ACTION_TYPE.FetchTrackById; payload: ITrack };

const trackReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case TRACKER_ACTION_TYPE.SetLoading:
      return { ...state, loading: action.payload };
    case TRACKER_ACTION_TYPE.SetError:
      return { ...state, errorMessage: action.payload };
    case TRACKER_ACTION_TYPE.FetchTracks:
      return { ...state, tracks: action.payload };
    case TRACKER_ACTION_TYPE.FetchTrackById: {
      const tracks = state.tracks.map(t => t._id === action.payload._id ? action.payload : t);
      return { ...state, tracks: tracks };
    }
    case TRACKER_ACTION_TYPE.CreateTrack:
      return { ...state, tracks: [...state.tracks, action.payload] };
    default:
      return state;
  }
};

const fetchTracks = (dispatch: Dispatch<ReducerAction>) => async () => {
  try {
    dispatch({ type: TRACKER_ACTION_TYPE.SetLoading, payload: true });

    const response = await trackerApi.get<ITrack[]>('/tracks');

    dispatch({ type: TRACKER_ACTION_TYPE.FetchTracks, payload: response.data });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage: string = err.response?.data?.error;
      console.log(errorMessage );
      dispatch({ type: TRACKER_ACTION_TYPE.SetError, payload: errorMessage });
    } else if (err instanceof Error) {
      dispatch({ type: TRACKER_ACTION_TYPE.SetError, payload: err.message });
    }
  } finally {
    dispatch({ type: TRACKER_ACTION_TYPE.SetLoading, payload: false });
  }
};

const fetchTrackById = (dispatch: Dispatch<ReducerAction>) => async (id: string) => {
  try {
    dispatch({ type: TRACKER_ACTION_TYPE.SetLoading, payload: true });

    const response = await trackerApi.get<ITrack>(`/track/${id}`);

    dispatch({ type: TRACKER_ACTION_TYPE.FetchTrackById, payload: response.data });

  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage: string = err.response?.data?.error;
      console.log(errorMessage );
      dispatch({ type: TRACKER_ACTION_TYPE.SetError, payload: errorMessage });
    } else if (err instanceof Error) {
      dispatch({ type: TRACKER_ACTION_TYPE.SetError, payload: err.message });
    }
  } finally {
    dispatch({ type: TRACKER_ACTION_TYPE.SetLoading, payload: false });
  }
};

const createTrack = (dispatch: Dispatch<ReducerAction>) => async (track: ITrack) => {
  try {
    dispatch({ type: TRACKER_ACTION_TYPE.SetLoading, payload: true });

    await trackerApi.post('/tracks', track);

    dispatch({ type: TRACKER_ACTION_TYPE.CreateTrack, payload: track });
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage: string = err.response?.data?.error;
      console.log(errorMessage );
      dispatch({ type: TRACKER_ACTION_TYPE.SetError, payload: errorMessage });
    } else if (err instanceof Error) {
      dispatch({ type: TRACKER_ACTION_TYPE.SetError, payload: err.message });
    }
  } finally {
    dispatch({ type: TRACKER_ACTION_TYPE.SetLoading, payload: false });
  }
};

const actions = {
  fetchTracks, createTrack, fetchTrackById
};


const initialState: ReducerState = {
  errorMessage: '',
  loading: false,
  tracks: [],
};

export const {
  Context: TrackContext,
  Provider: TrackProvider
} = createDataContext(trackReducer, actions, initialState);
